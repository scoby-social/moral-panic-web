import * as anchor from "@project-serum/anchor";
import {
  MintLayout,
  TOKEN_PROGRAM_ID,
  AccountLayout,
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
import { createMint } from "../common/createMint";

import { getEdition } from "../common/getEdition";
import { getMetadata } from "../common/getMetadata";
import { getNftsForOwnerBySymbol } from "../common/getNftsForOwner";
import { getOrCreateAssociatedTokenAccount } from "../common/getOrCreateAssociatedTokenAccount";
import { getTokenWallet } from "../common/getTokenWallet";
import { sendTransaction } from "../common/sendTransaction";

import * as woodenSFTIdl from "./wooden_idl.json";
import * as fakeIDNFTIdl from "../fakeID/usdc-fake-id.json";

const WoodenNickelSFTPool = new PublicKey(
  process.env.NEXT_PUBLIC_WOODEN_NICKEL_SFT_POOL!
);

const WoodenSFTProgramID = new PublicKey(
  process.env.NEXT_PUBLIC_WOODEN_NICKEL_PROGRAM_ID!
);

const TOKEN_METADATA_PROGRAM_ID = new anchor.web3.PublicKey(
  process.env.NEXT_PUBLIC_TOKEN_METADATA_PROGRAM_ID!
);

const FakeIDNFTSYMBOL = "HELLPASS";

export const mintWoodenNickel = async (
  wallet: any,
  tokensToBeMinted: number,
  fakeIDName: string
): Promise<string> => {
  const conn = new Connection(process.env.NEXT_PUBLIC_SOLANA_CLUSTER!);
  const confirmOption: ConfirmOptions = {
    commitment: "finalized",
    preflightCommitment: "finalized",
    skipPreflight: false,
  };

  const FakeIDNFTProgramId = new PublicKey(
    process.env.NEXT_PUBLIC_FAKE_ID_PROGRAM_ID!
  );

  const FakeIDNFTPOOL = new PublicKey(
    process.env.NEXT_PUBLIC_FAKE_ID_NFT_POOL!
  );

  const usdcToken = new PublicKey(process.env.NEXT_PUBLIC_USDC_TOKEN_ADDRESS!);

  try {
    // get provider from connection
    const provider = new anchor.AnchorProvider(
      conn,
      wallet as any,
      confirmOption
    );

    // get fake id nft program
    const program = new anchor.Program(
      woodenSFTIdl as any,
      WoodenSFTProgramID,
      provider
    );

    // get fake id nft pool
    const poolData = await program.account.pool.fetch(WoodenNickelSFTPool);

    // get config data of above pool

    // const track = await checkState(parentMembership);

    let transaction = new Transaction();
    let createTokenAccountTransaction = new Transaction();
    let instructions: TransactionInstruction[] = [];
    let signers: Keypair[] = [];
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
        tokensToBeMinted,
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

    const royaltyList: String[] = [];

    const sourceTokenAccount = await getOrCreateAssociatedTokenAccount(
      conn,
      wallet.publicKey,
      usdcToken,
      wallet.publicKey,
      wallet.signTransaction
    );

    if (sourceTokenAccount[1]) {
      royaltyList.push(wallet.publicKey.toString());
      createTokenAccountTransaction.add(sourceTokenAccount[1]);
    }

    const scobyUsdcTokenAccount = await getOrCreateAssociatedTokenAccount(
      conn,
      wallet.publicKey,
      usdcToken,
      poolData.scobyWallet,
      wallet.signTransaction
    );

    if (scobyUsdcTokenAccount[1]) {
      if (
        royaltyList.findIndex(
          item => item == poolData.scobyWallet.toString()
        ) == -1
      ) {
        royaltyList.push(poolData.scobyWallet.toString());
        createTokenAccountTransaction.add(scobyUsdcTokenAccount[1]);
      }
    }

    const memberships = await getNftsForOwnerBySymbol(
      FakeIDNFTSYMBOL,
      wallet.publicKey,
      conn
    );

    const parentNFT = memberships[0].mintAddress;

    const [parentNftMetadataExtended] = await PublicKey.findProgramAddress(
      [parentNFT.toBuffer(), FakeIDNFTPOOL.toBuffer()],
      FakeIDNFTProgramId
    );

    const fakeIDProgram = new anchor.Program(
      fakeIDNFTIdl as any,
      FakeIDNFTProgramId,
      provider
    );

    const parentNftExtendedData =
      await fakeIDProgram.account.metadataExtended.fetch(
        parentNftMetadataExtended
      );

    const parentMembership = {
      metadataExtended: parentNftMetadataExtended,
      extendedData: parentNftExtendedData,
    };

    const formData = {
      name: fakeIDName,
      uri: `https://gateway.pinata.cloud/ipfs/QmNcVgXXT6FgyQQLWimm2qkVJzzFV72ZJs2HxtrmFxxmH8`,
    };

    const parentMembershipResp = await conn.getTokenLargestAccounts(
      parentMembership.extendedData.mint,
      "finalized"
    );
    if (
      parentMembershipResp == null ||
      parentMembershipResp.value == null ||
      parentMembershipResp.value.length == 0
    )
      throw new Error("Invalid NFP");
    const parentMembershipAccount = parentMembershipResp.value[0].address;
    let info = await conn.getAccountInfo(parentMembershipAccount, "finalized");
    if (info == null) throw new Error("parent membership info failed");
    let accountInfo = AccountLayout.decode(info.data);
    if (Number(accountInfo.amount) == 0)
      throw new Error("Invalid Parent Membership Nft info");
    const parentMembershipOwner = new PublicKey(accountInfo.owner);

    const parentMembershipUsdcTokenAccount =
      await getOrCreateAssociatedTokenAccount(
        conn,
        wallet.publicKey,
        usdcToken,
        parentMembershipOwner,
        wallet.signTransaction
      );

    if (parentMembershipUsdcTokenAccount[1]) {
      if (
        royaltyList.findIndex(item => item == accountInfo.owner.toString()) ==
        -1
      ) {
        royaltyList.push(accountInfo.owner.toString());
        createTokenAccountTransaction.add(parentMembershipUsdcTokenAccount[1]);
      }
    }

    // grand parent
    const grandParentMembershipResp = await conn.getTokenLargestAccounts(
      parentMembership.extendedData.parentNfp,
      "finalized"
    );
    if (
      grandParentMembershipResp == null ||
      grandParentMembershipResp.value == null ||
      grandParentMembershipResp.value.length == 0
    )
      throw new Error("Invalid NFP");
    const grandParentMembershipAccount =
      grandParentMembershipResp.value[0].address;
    info = await conn.getAccountInfo(grandParentMembershipAccount, "finalized");
    if (info == null) throw new Error("grand parent membership info failed");
    accountInfo = AccountLayout.decode(info.data);
    if (Number(accountInfo.amount) == 0)
      throw new Error("Invalid Grand Parent Membership Nft info");
    const grandParentMembershipOwner = new PublicKey(accountInfo.owner);

    var grandParentMembershipUsdcTokenAccount =
      await getOrCreateAssociatedTokenAccount(
        conn,
        wallet.publicKey,
        usdcToken,
        grandParentMembershipOwner,
        wallet.signTransaction
      );

    if (grandParentMembershipUsdcTokenAccount[1]) {
      if (
        royaltyList.findIndex(item => item == accountInfo.owner.toString()) ==
        -1
      ) {
        royaltyList.push(accountInfo.owner.toString());
        createTokenAccountTransaction.add(
          grandParentMembershipUsdcTokenAccount[1]
        );
      }
    }

    // grand grand parent
    const grandGrandParentMembershipResp = await conn.getTokenLargestAccounts(
      parentMembership.extendedData.grandParentNfp,
      "finalized"
    );
    if (
      grandGrandParentMembershipResp == null ||
      grandGrandParentMembershipResp.value == null ||
      grandGrandParentMembershipResp.value.length == 0
    )
      throw new Error("Invalid NFP");
    const grandGrandParentMembershipAccount =
      grandGrandParentMembershipResp.value[0].address;
    info = await conn.getAccountInfo(
      grandGrandParentMembershipAccount,
      "finalized"
    );
    if (info == null) throw new Error("grand parent membership info failed");
    accountInfo = AccountLayout.decode(info.data);
    if (Number(accountInfo.amount) == 0)
      throw new Error("Invalid Grand Parent Membership Nft info");
    const grandGrandParentMembershipOwner = new PublicKey(accountInfo.owner);

    var grandGrandParentMembershipUsdcTokenAccount =
      await getOrCreateAssociatedTokenAccount(
        conn,
        wallet.publicKey,
        usdcToken,
        grandGrandParentMembershipOwner,
        wallet.signTransaction
      );

    if (grandGrandParentMembershipUsdcTokenAccount[1]) {
      if (
        royaltyList.findIndex(item => item == accountInfo.owner.toString()) ==
        -1
      ) {
        royaltyList.push(accountInfo.owner.toString());
        createTokenAccountTransaction.add(
          grandGrandParentMembershipUsdcTokenAccount[1]
        );
      }
    }

    const grandGrandGrandParentMembershipResp =
      await conn.getTokenLargestAccounts(
        parentMembership.extendedData.grandGrandParentNfp,
        "finalized"
      );
    if (
      grandGrandGrandParentMembershipResp == null ||
      grandGrandGrandParentMembershipResp.value == null ||
      grandGrandGrandParentMembershipResp.value.length == 0
    )
      throw new Error("Invalid NFP");

    const grandGrandGrandParentMembershipAccount =
      grandGrandGrandParentMembershipResp.value[0].address;
    info = await conn.getAccountInfo(
      grandGrandGrandParentMembershipAccount,
      "finalized"
    );
    if (info == null) throw new Error("grand parent membership info failed");
    accountInfo = AccountLayout.decode(info.data);
    if (Number(accountInfo.amount) == 0)
      throw new Error("Invalid Grand Parent Membership Nft info");
    const grandGrandGrandParentMembershipOwner = new PublicKey(
      accountInfo.owner
    );

    var grandGrandGrandParentMembershipUsdcTokenAccount =
      await getOrCreateAssociatedTokenAccount(
        conn,
        wallet.publicKey,
        usdcToken,
        grandGrandGrandParentMembershipOwner,
        wallet.signTransaction
      );

    if (grandGrandGrandParentMembershipUsdcTokenAccount[1]) {
      if (
        royaltyList.findIndex(item => item == accountInfo.owner.toString()) ==
        -1
      ) {
        royaltyList.push(accountInfo.owner.toString());
        createTokenAccountTransaction.add(
          grandGrandGrandParentMembershipUsdcTokenAccount[1]
        );
      }
    }

    if (true) {
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
    } else {
      const SNFTAddress = track.track.SNFTAddress;
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
        program.instruction.addToken(
          new anchor.BN(bump),
          new anchor.BN(tokensToBeMinted),
          {
            accounts: {
              owner: wallet.publicKey,
              pool: WoodenNickelSFTPool,
              sourceTokenAccount: sourceTokenAccount[0],
              scobyUsdcTokenAccount: scobyUsdcTokenAccount[0],
              parentNftUsdcTokenAccount: parentMembershipUsdcTokenAccount[0],
              grandParentNftUsdcTokenAccount:
                grandParentMembershipUsdcTokenAccount[0],
              grandGrandParentNftUsdcTokenAccount:
                grandGrandParentMembershipUsdcTokenAccount[0],
              grandGrandGrandParentNftUsdcTokenAccount:
                grandGrandGrandParentMembershipUsdcTokenAccount[0],
              tokenProgram: TOKEN_PROGRAM_ID,
            },
          }
        )
      );

      addTokenTransaction.add(
        createMintToInstruction(
          myMint,
          tokenAccount[0],
          wallet.publicKey,
          tokensToBeMinted,
          [wallet],
          TOKEN_PROGRAM_ID
        )
      );

      const blockHash = await conn.getRecentBlockhash();
      addTokenTransaction.feePayer = await wallet.publicKey;
      addTokenTransaction.recentBlockhash = blockHash.blockhash;
      const signed = await wallet.signTransaction(addTokenTransaction);
      await conn.sendRawTransaction(await signed.serialize());
    }

    return mintKey.toString();
  } catch (err) {
    console.trace(err);
  }
};
