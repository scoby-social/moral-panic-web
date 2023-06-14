import {
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import { AnchorProvider } from "@project-serum/anchor";
import * as anchor from "@project-serum/anchor";
import FakeIDNFTIdl from "./usdc-fake-id.json";
import {
  AccountLayout,
  MintLayout,
  TOKEN_PROGRAM_ID,
  createMintToCheckedInstruction,
  getOrCreateAssociatedTokenAccount as createAssociatedTokenAccount,
  createBurnInstruction,
  burn,
  burnChecked,
  createBurnCheckedInstruction,
} from "@solana/spl-token";
import { getOrCreateAssociatedTokenAccount } from "../common/getOrCreateAssociatedTokenAccount";
import { createAssociatedTokenAccountInstruction } from "../common/createAssociatedTokenAccountInstruction";
import { getTokenWallet } from "../common/getTokenWallet";
import { getMetadata } from "../common/getMetadata";
import { getEdition } from "../common/getEdition";
import { createMint } from "../common/createMint";
import { sendTransaction } from "../common/sendTransaction";
import { checkIfUserHasFakeID } from "./checkIfUserHasFakeID";

export const mintFakeID = async (
  wallet: any,
  metadataUrl: string,
  name: string,
  leaderNftAddress: string,
  woodenNickel: string
): Promise<string> => {
  const TOKEN_METADATA_PROGRAM_ID = new anchor.web3.PublicKey(
    process.env.NEXT_PUBLIC_TOKEN_METADATA_PROGRAM_ID!
  );

  const FakeIDNFTProgramId = new PublicKey(
    process.env.NEXT_PUBLIC_FAKE_ID_PROGRAM_ID!
  );

  const FakeIDNFTPOOL = new PublicKey(
    process.env.NEXT_PUBLIC_FAKE_ID_NFT_POOL!
  );

  const conn = new Connection(process.env.NEXT_PUBLIC_SOLANA_CLUSTER!);

  const parentNFT = new PublicKey(leaderNftAddress);
  const provider = new AnchorProvider(conn, wallet, {
    commitment: "processed",
  });

  // get fake id nft program
  const program = new anchor.Program(
    FakeIDNFTIdl as any,
    FakeIDNFTProgramId,
    provider
  );

  // get fake id nft pool
  const poolData = (await program.account.pool.fetch(FakeIDNFTPOOL)) as any;

  const transaction = new Transaction();
  const createTokenAccountTransaction = new Transaction();
  const instructions: TransactionInstruction[] = [];
  const signers: Keypair[] = [];

  const mintRent = await conn.getMinimumBalanceForRentExemption(
    MintLayout.span
  );

  const nftMintAddress = createMint(
    instructions,
    wallet.publicKey,
    mintRent,
    0,
    wallet.publicKey,
    wallet.publicKey,
    signers
  );

  const recipientKey = await getTokenWallet(wallet.publicKey, nftMintAddress);
  createAssociatedTokenAccountInstruction(
    instructions,
    recipientKey,
    wallet.publicKey,
    wallet.publicKey,
    nftMintAddress
  );

  instructions.push(
    createMintToCheckedInstruction(
      nftMintAddress,
      recipientKey,
      wallet.publicKey,
      1,
      0
    )
  );
  instructions.forEach(item => transaction.add(item));

  const metadata = await getMetadata(nftMintAddress, TOKEN_METADATA_PROGRAM_ID);
  const masterEdition = await getEdition(
    nftMintAddress,
    TOKEN_METADATA_PROGRAM_ID
  );

  const [metadataExtended, bump] = await PublicKey.findProgramAddress(
    [nftMintAddress.toBuffer(), FakeIDNFTPOOL.toBuffer()],
    FakeIDNFTProgramId
  );

  const royaltyList: String[] = [];

  const formData = {
    name,
    uri: metadataUrl,
  };

  const usdcToken = new PublicKey(process.env.NEXT_PUBLIC_USDC_TOKEN_ADDRESS!);

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
    poolData.scobyWallet as PublicKey,
    wallet.signTransaction
  );

  if (scobyUsdcTokenAccount[1]) {
    if (
      royaltyList.findIndex(
        item => item == (poolData.scobyWallet as PublicKey).toString()
      ) === -1
    ) {
      royaltyList.push((poolData.scobyWallet as PublicKey).toString());
      createTokenAccountTransaction.add(scobyUsdcTokenAccount[1]);
    }
  }

  const woodenNickelPublicKey = new PublicKey(woodenNickel);

  const tokenAccount = await createAssociatedTokenAccount(
    conn,
    wallet,
    woodenNickelPublicKey,
    wallet.publicKey
  );

  // check if this wallet is holding the fake id nft
  if (await checkIfUserHasFakeID(wallet))
    throw new Error("Creator Already Have and Fake ID NFT");

  if (poolData.countMinting == 0) {
    transaction.add(
      program.instruction.mintRoot(new anchor.BN(bump), formData, {
        accounts: {
          owner: wallet.publicKey,
          pool: FakeIDNFTPOOL,
          config: poolData.config,
          nftMint: nftMintAddress,
          nftAccount: recipientKey,
          metadata: metadata,
          masterEdition: masterEdition,
          metadataExtended: metadataExtended,
          sourceTokenAccount: sourceTokenAccount[0],
          scobyUsdcTokenAccount: scobyUsdcTokenAccount[0],

          scobyWallet: poolData.scobyWallet,
          tokenProgram: TOKEN_PROGRAM_ID,
          tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
          systemProgram: SystemProgram.programId,
          rent: SYSVAR_RENT_PUBKEY,
        },
      } as any)
    );
  } else {
    const [parentNftMetadataExtended] = await PublicKey.findProgramAddress(
      [parentNFT.toBuffer(), FakeIDNFTPOOL.toBuffer()],
      FakeIDNFTProgramId
    );

    const parentNftExtendedData = await program.account.metadataExtended.fetch(
      parentNftMetadataExtended
    );

    const parentMembership = {
      metadataExtended: parentNftMetadataExtended,
      extendedData: parentNftExtendedData,
    };

    const creatorMint = poolData.rootNft as PublicKey;

    const creatorResp = await conn.getTokenLargestAccounts(
      creatorMint,
      "finalized"
    );

    if (
      creatorResp == null ||
      creatorResp.value == null ||
      creatorResp.value.length == 0
    )
      throw new Error("Invalid creator");

    const creatorNftAccount = creatorResp.value[0].address;
    const creatorInfo = await conn.getAccountInfo(
      creatorNftAccount,
      "finalized"
    );

    if (creatorInfo == null) throw new Error("Creator NFT info failed");

    const accountCreatorInfo = AccountLayout.decode(creatorInfo.data);
    if (Number(accountCreatorInfo.amount) == 0)
      throw new Error("Invalid Creator Info");

    const creatorWallet = new PublicKey(accountCreatorInfo.owner);

    const creatorUsdcTokenAccount = await getOrCreateAssociatedTokenAccount(
      conn,
      wallet.publicKey,
      usdcToken,
      creatorWallet,
      wallet.signTransaction
    );

    if (creatorUsdcTokenAccount[1]) {
      createTokenAccountTransaction.add(creatorUsdcTokenAccount[1]);
    }

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

    let grandParentMembershipUsdcTokenAccount: any[];

    if (
      grandParentMembershipResp == null ||
      grandParentMembershipResp.value == null ||
      grandParentMembershipResp.value.length == 0
    ) {
      grandParentMembershipUsdcTokenAccount = [creatorUsdcTokenAccount[0]];
    } else {
      const grandParentMembershipAccount =
        grandParentMembershipResp.value[0].address;
      info = await conn.getAccountInfo(
        grandParentMembershipAccount,
        "finalized"
      );
      if (info == null) {
        grandParentMembershipUsdcTokenAccount = [creatorUsdcTokenAccount[0]];
      } else {
        accountInfo = AccountLayout.decode(info.data);
        if (Number(accountInfo.amount) == 0) {
          grandParentMembershipUsdcTokenAccount = [creatorUsdcTokenAccount[0]];
        } else {
          const grandParentMembershipOwner = new PublicKey(accountInfo.owner);

          grandParentMembershipUsdcTokenAccount =
            await getOrCreateAssociatedTokenAccount(
              conn,
              wallet.publicKey,
              usdcToken,
              grandParentMembershipOwner,
              wallet.signTransaction
            );

          if (grandParentMembershipUsdcTokenAccount[1]) {
            if (
              royaltyList.findIndex(
                item => item == accountInfo.owner.toString()
              ) == -1
            ) {
              royaltyList.push(accountInfo.owner.toString());
              createTokenAccountTransaction.add(
                grandParentMembershipUsdcTokenAccount[1]
              );
            }
          }
        }
      }
    }

    // grand grand parent
    const grandGrandParentMembershipResp = await conn.getTokenLargestAccounts(
      parentMembership.extendedData.grandParentNfp,
      "finalized"
    );

    let grandGrandParentMembershipUsdcTokenAccount: any[];
    if (
      grandGrandParentMembershipResp == null ||
      grandGrandParentMembershipResp.value == null ||
      grandGrandParentMembershipResp.value.length == 0
    ) {
      grandGrandParentMembershipUsdcTokenAccount = [creatorUsdcTokenAccount[0]];
    } else {
      const grandGrandParentMembershipAccount =
        grandGrandParentMembershipResp.value[0].address;
      info = await conn.getAccountInfo(
        grandGrandParentMembershipAccount,
        "finalized"
      );
      if (info == null) {
        grandGrandParentMembershipUsdcTokenAccount = [
          creatorUsdcTokenAccount[0],
        ];
      } else {
        accountInfo = AccountLayout.decode(info.data);
        if (Number(accountInfo.amount) == 0) {
          grandGrandParentMembershipUsdcTokenAccount = [
            creatorUsdcTokenAccount[0],
          ];
        } else {
          const grandGrandParentMembershipOwner = new PublicKey(
            accountInfo.owner
          );

          grandGrandParentMembershipUsdcTokenAccount =
            await getOrCreateAssociatedTokenAccount(
              conn,
              wallet.publicKey,
              usdcToken,
              grandGrandParentMembershipOwner,
              wallet.signTransaction
            );

          if (grandGrandParentMembershipUsdcTokenAccount[1]) {
            if (
              royaltyList.findIndex(
                item => item == accountInfo.owner.toString()
              ) == -1
            ) {
              royaltyList.push(accountInfo.owner.toString());
              createTokenAccountTransaction.add(
                grandGrandParentMembershipUsdcTokenAccount[1]
              );
            }
          }
        }
      }
    }

    const grandGrandGrandParentMembershipResp =
      await conn.getTokenLargestAccounts(
        parentMembership.extendedData.grandGrandParentNfp,
        "finalized"
      );

    let grandGrandGrandParentMembershipUsdcTokenAccount: any[];

    if (
      grandGrandGrandParentMembershipResp == null ||
      grandGrandGrandParentMembershipResp.value == null ||
      grandGrandGrandParentMembershipResp.value.length == 0
    ) {
      grandGrandGrandParentMembershipUsdcTokenAccount = [
        creatorUsdcTokenAccount[0],
      ];
    } else {
      const grandGrandGrandParentMembershipAccount =
        grandGrandGrandParentMembershipResp.value[0].address;
      info = await conn.getAccountInfo(
        grandGrandGrandParentMembershipAccount,
        "finalized"
      );
      if (info == null) {
        grandGrandGrandParentMembershipUsdcTokenAccount = [
          creatorUsdcTokenAccount[0],
        ];
      } else {
        accountInfo = AccountLayout.decode(info.data);
        if (Number(accountInfo.amount) == 0) {
          grandGrandGrandParentMembershipUsdcTokenAccount = [
            creatorUsdcTokenAccount[0],
          ];
        } else {
          const grandGrandGrandParentMembershipOwner = new PublicKey(
            accountInfo.owner
          );

          grandGrandGrandParentMembershipUsdcTokenAccount =
            await getOrCreateAssociatedTokenAccount(
              conn,
              wallet.publicKey,
              usdcToken,
              grandGrandGrandParentMembershipOwner,
              wallet.signTransaction
            );

          if (grandGrandGrandParentMembershipUsdcTokenAccount[1]) {
            if (
              royaltyList.findIndex(
                item => item == accountInfo.owner.toString()
              ) == -1
            ) {
              royaltyList.push(accountInfo.owner.toString());
              createTokenAccountTransaction.add(
                grandGrandGrandParentMembershipUsdcTokenAccount[1]
              );
            }
          }
        }
      }
    }

    transaction.add(
      program.instruction.mint(new anchor.BN(bump), formData, {
        accounts: {
          owner: wallet.publicKey,
          pool: FakeIDNFTPOOL,
          config: poolData.config,
          nftMint: nftMintAddress,
          nftAccount: recipientKey,
          metadata: metadata,
          masterEdition: masterEdition,
          metadataExtended: metadataExtended,
          parentNftMetadataExtended: parentMembership.metadataExtended,
          creatorNftAccount: creatorNftAccount,
          sourceTokenAccount: sourceTokenAccount[0],
          scobyUsdcTokenAccount: scobyUsdcTokenAccount[0],
          creatorUsdcTokenAccount: creatorUsdcTokenAccount[0],
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
      } as any)
    );
  }

  if (createTokenAccountTransaction.instructions.length > 0) {
    const blockHash = await conn.getRecentBlockhash();
    createTokenAccountTransaction.feePayer = await wallet.publicKey;
    createTokenAccountTransaction.recentBlockhash = blockHash.blockhash;
    const signed = await wallet.signTransaction(createTokenAccountTransaction);
    await conn.sendRawTransaction(await signed.serialize());
  }

  await sendTransaction(conn, wallet, transaction, signers);

  const burnTransaction = new Transaction().add(
    createBurnCheckedInstruction(
      tokenAccount.address,
      woodenNickelPublicKey,
      wallet.publicKey,
      1,
      0
    )
  );

  await sendTransaction(conn, wallet, burnTransaction, []);

  return nftMintAddress.toString();
};
