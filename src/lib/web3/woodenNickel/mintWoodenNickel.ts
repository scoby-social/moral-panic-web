import * as anchor from "@project-serum/anchor";
import {
  MintLayout,
  TOKEN_PROGRAM_ID,
  createMintToCheckedInstruction,
  createMintToInstruction,
} from "@solana/spl-token";
import {
  ConfirmOptions,
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";

import { createAssociatedTokenAccountInstruction } from "../common/createAssociatedTokenAccountInstruction";
import FakeIDNFTIdl from "../fakeID/usdc-fake-id.json";
import { createMint } from "../common/createMint";
import { getEdition } from "../common/getEdition";
import { getMetadata } from "../common/getMetadata";
import { getNftsForOwnerBySymbol } from "../common/getNftsForOwner";
import { getOrCreateAssociatedTokenAccount } from "../common/getOrCreateAssociatedTokenAccount";
import { getTokenWallet } from "../common/getTokenWallet";
import { sendTransaction } from "../common/sendTransaction";
import * as woodenSFTIdl from "./wooden_idl.json";
import { saveWoodenNickelMetadata } from "./saveWoodenNickelMetadata";
import { MintWoodenNickelProps } from "./types";
import { createWoodenNickel } from "lib/axios/requests/woodenNickel/createWoodenNickel";
import { getWoodenNickelLineage } from "lib/axios/requests/woodenNickel/getWoodenNickelLineage";
import { updateWoodenNickel } from "lib/axios/requests/woodenNickel/updateWoodenNickel";
import { getWholeLineageFromFakeID } from "../common/getWholeLineageFromFakeID";

const WoodenNickelSFTPool = new PublicKey(
  process.env.NEXT_PUBLIC_WOODEN_NICKEL_SFT_POOL!
);

const WoodenSFTProgramID = new PublicKey(
  process.env.NEXT_PUBLIC_WOODEN_NICKEL_PROGRAM_ID!
);

const TOKEN_METADATA_PROGRAM_ID = new anchor.web3.PublicKey(
  process.env.NEXT_PUBLIC_TOKEN_METADATA_PROGRAM_ID!
);

const FakeIDNFTPOOL = new PublicKey(process.env.NEXT_PUBLIC_FAKE_ID_NFT_POOL!);

const FakeIDNFTSYMBOL = "HELLPASS";

const FakeIDNFTProgramId = new PublicKey(
  process.env.NEXT_PUBLIC_FAKE_ID_PROGRAM_ID!
);

export const mintWoodenNickel = async ({
  wallet,
  keep,
  username,
  woodenNickel,
  seniority,
  fullName,
  fakeID,
}: MintWoodenNickelProps): Promise<void> => {
  const conn = new Connection(process.env.NEXT_PUBLIC_SOLANA_CLUSTER!);
  const confirmOption: ConfirmOptions = {
    commitment: "finalized",
    preflightCommitment: "finalized",
    skipPreflight: false,
  };

  try {
    const provider = new anchor.AnchorProvider(conn, wallet, confirmOption);

    const program = new anchor.Program(
      woodenSFTIdl as any,
      WoodenSFTProgramID,
      provider
    );

    const fakeIDProgram = new anchor.Program(
      FakeIDNFTIdl as any,
      FakeIDNFTProgramId,
      provider
    );

    const poolData = await program.account.pool.fetch(WoodenNickelSFTPool);

    const transaction = new Transaction();
    const createTokenAccountTransaction = new Transaction();
    const instructions: TransactionInstruction[] = [];
    const signers: Keypair[] = [];

    const mintRent = await conn.getMinimumBalanceForRentExemption(
      MintLayout.span
    );
    const mintKey = createMint(
      instructions,
      wallet.publicKey,
      mintRent,
      0,
      wallet.publicKey,
      wallet.publicKey,
      signers
    );
    const recipientKey = await getTokenWallet(wallet.publicKey, mintKey);
    createAssociatedTokenAccountInstruction(
      instructions,
      recipientKey,
      wallet.publicKey,
      wallet.publicKey,
      mintKey
    );

    instructions.push(
      createMintToCheckedInstruction(
        mintKey,
        recipientKey,
        wallet.publicKey,
        keep,
        0
      )
    );

    instructions.forEach(item => transaction.add(item));

    const metadata = await getMetadata(mintKey, TOKEN_METADATA_PROGRAM_ID);
    const masterEdition = await getEdition(mintKey, TOKEN_METADATA_PROGRAM_ID);

    const [metadataExtended, bump] = await PublicKey.findProgramAddress(
      [mintKey.toBuffer(), WoodenNickelSFTPool.toBuffer()],
      WoodenSFTProgramID
    );

    const memberships = await getNftsForOwnerBySymbol(
      FakeIDNFTSYMBOL,
      wallet.publicKey,
      conn
    );

    const fakeIDPoolData = (await fakeIDProgram.account.pool.fetch(
      FakeIDNFTPOOL
    )) as any;

    const {
      creatorNftAccount,
      sourceTokenAccount,
      scobyUsdcTokenAccount,
      parentMembershipUsdcTokenAccount,
      grandParentMembershipUsdcTokenAccount,
      grandGrandParentMembershipUsdcTokenAccount,
      grandGrandGrandParentMembershipUsdcTokenAccount,
    } = await getWholeLineageFromFakeID(
      conn,
      wallet,
      createTokenAccountTransaction,
      memberships[0].mintAddress,
      provider,
      fakeIDPoolData
    );

    if (!woodenNickel) {
      const lineage = await getWoodenNickelLineage(fakeID);
      const uri = await saveWoodenNickelMetadata(username, seniority, {
        ...lineage,
        minter: fullName,
        creator: "Sally the Clubhouse Wallet",
      });

      const formData = {
        name: username,
        uri,
      };

      transaction.add(
        program.instruction.mint(new anchor.BN(bump), formData, {
          accounts: {
            owner: wallet.publicKey,
            pool: WoodenNickelSFTPool,
            config: poolData.config,
            nftMint: mintKey,
            nftAccount: recipientKey,
            metadata: metadata,
            masterEdition: masterEdition,
            metadataExtended: metadataExtended,
            sourceTokenAccount: sourceTokenAccount[0],
            scobyUsdcTokenAccount: scobyUsdcTokenAccount[0],
            creatorNftAccount: creatorNftAccount,
            parentNftUsdcTokenAccount: parentMembershipUsdcTokenAccount[0],
            grandParentNftUsdcTokenAccount:
              grandParentMembershipUsdcTokenAccount[0],
            grandGrandParentNftUsdcTokenAccount:
              grandGrandParentMembershipUsdcTokenAccount[0],
            grandGrandGrandParentNftUsdcTokenAccount:
              grandGrandGrandParentMembershipUsdcTokenAccount[0],
            tokenProgram: TOKEN_PROGRAM_ID,
            tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
            systemProgram: SystemProgram.programId,
            rent: SYSVAR_RENT_PUBKEY,
          },
        })
      );

      if (createTokenAccountTransaction.instructions.length > 0) {
        const blockHash = await conn.getRecentBlockhash();
        createTokenAccountTransaction.feePayer = await wallet.publicKey;
        createTokenAccountTransaction.recentBlockhash = blockHash.blockhash;
        const signed = await wallet.signTransaction(
          createTokenAccountTransaction
        );
        await conn.sendRawTransaction(await signed.serialize());
      }

      await sendTransaction(conn, wallet, transaction, signers);

      await createWoodenNickel(
        wallet.publicKey!.toString(),
        mintKey.toString(),
        keep,
        fakeID
      );
    } else {
      const SNFTAddress = woodenNickel;
      const myMint = new PublicKey(SNFTAddress);

      const tokenAccount = await getOrCreateAssociatedTokenAccount(
        conn,
        wallet.publicKey,
        myMint,
        wallet.publicKey,
        wallet.signTransaction
      );

      const addTokenTransaction = new Transaction();

      addTokenTransaction.add(
        program.instruction.addToken(new anchor.BN(bump), new anchor.BN(keep), {
          accounts: {
            owner: wallet.publicKey,
            pool: WoodenNickelSFTPool,
            sourceTokenAccount: sourceTokenAccount[0],
            scobyUsdcTokenAccount: scobyUsdcTokenAccount[0],
            creatorNftAccount: creatorNftAccount,
            parentNftUsdcTokenAccount: parentMembershipUsdcTokenAccount[0],
            grandParentNftUsdcTokenAccount:
              grandParentMembershipUsdcTokenAccount[0],
            grandGrandParentNftUsdcTokenAccount:
              grandGrandParentMembershipUsdcTokenAccount[0],
            grandGrandGrandParentNftUsdcTokenAccount:
              grandGrandGrandParentMembershipUsdcTokenAccount[0],
            tokenProgram: TOKEN_PROGRAM_ID,
          },
        })
      );

      addTokenTransaction.add(
        createMintToInstruction(
          myMint,
          tokenAccount[0],
          wallet.publicKey,
          keep,
          [wallet],
          TOKEN_PROGRAM_ID
        )
      );

      const blockHash = await conn.getRecentBlockhash();
      addTokenTransaction.feePayer = await wallet.publicKey;
      addTokenTransaction.recentBlockhash = blockHash.blockhash;
      const signed = await wallet.signTransaction(addTokenTransaction);
      await conn.sendRawTransaction(await signed.serialize());

      await updateWoodenNickel(wallet.publicKey.toString(), keep);
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};
