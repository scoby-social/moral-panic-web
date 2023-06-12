import { TypeDef } from "@project-serum/anchor/dist/cjs/program/namespace/types";
import * as fakeIDNFTIdl from "../fakeID/usdc-fake-id.json";
import * as anchor from "@project-serum/anchor";
import { AccountLayout } from "@solana/spl-token";
import { Connection, PublicKey, Transaction } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount } from "./getOrCreateAssociatedTokenAccount";

const usdcToken = new PublicKey(process.env.NEXT_PUBLIC_USDC_TOKEN_ADDRESS!);

export async function getWholeLineageFromFakeID(
  conn: Connection,
  wallet: any,
  createTokenAccountTransaction: Transaction,
  poolData: TypeDef<any, anchor.IdlTypes<any>>,
  fakeIDAddress: PublicKey,
  provider: anchor.AnchorProvider,
  fakeIDPoolData: TypeDef<any, anchor.IdlTypes<any>>
) {
  /* Configuration Variables  */
  const FakeIDNFTProgramId = new PublicKey(
    process.env.NEXT_PUBLIC_FAKE_ID_PROGRAM_ID!
  );

  const FakeIDNFTPOOL = new PublicKey(
    process.env.NEXT_PUBLIC_FAKE_ID_NFT_POOL!
  );

  const fakeIDProgram = new anchor.Program(
    fakeIDNFTIdl as any,
    FakeIDNFTProgramId,
    provider
  );
  const royaltyList: string[] = [];

  const creatorMint = fakeIDPoolData.rootNft as PublicKey;
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
  const creatorInfo = await conn.getAccountInfo(creatorNftAccount, "finalized");

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

  const parentNFT = fakeIDAddress;

  /* Metadata extended saved in a PDA related with the Fake ID, which contains information about lineage */
  const [parentNftMetadataExtended] = await PublicKey.findProgramAddress(
    [parentNFT.toBuffer(), FakeIDNFTPOOL.toBuffer()],
    FakeIDNFTProgramId
  );

  const parentNftExtendedData =
    await fakeIDProgram.account.metadataExtended.fetch(
      parentNftMetadataExtended
    );

  const parentMembership = {
    metadataExtended: parentNftMetadataExtended,
    extendedData: parentNftExtendedData,
  };

  /* Source Token Account */
  const sourceTokenAccount = (await getOrCreateAssociatedTokenAccount(
    conn,
    wallet.publicKey,
    usdcToken,
    wallet.publicKey,
    wallet.signTransaction
  )) as any;

  if (sourceTokenAccount[1]) {
    royaltyList.push(wallet.publicKey.toString());
    createTokenAccountTransaction.add(sourceTokenAccount[1]);
  }

  /* Scoby USDC Token Account */
  const scobyUsdcTokenAccount = (await getOrCreateAssociatedTokenAccount(
    conn,
    wallet.publicKey,
    usdcToken,
    poolData.scobyWallet,
    wallet.signTransaction
  )) as any;

  if (scobyUsdcTokenAccount[1]) {
    if (
      royaltyList.findIndex(item => item == poolData.scobyWallet.toString()) ==
      -1
    ) {
      royaltyList.push(poolData.scobyWallet.toString());
      createTokenAccountTransaction.add(scobyUsdcTokenAccount[1]);
    }
  }

  const parentMembershipUsdcTokenAccount =
    await getParentMembershipUsdcTokenAccount(
      conn,
      parentMembership,
      wallet,
      royaltyList,
      createTokenAccountTransaction
    );

  const grandParentMembershipUsdcTokenAccount =
    await getGrandParentMembershipUsdcTokenAccount(
      conn,
      parentMembership,
      wallet,
      royaltyList,
      createTokenAccountTransaction
    );

  const grandGrandParentMembershipUsdcTokenAccount =
    await getGrandGrandParentMembershipUsdcTokenAccount(
      conn,
      parentMembership,
      wallet,
      royaltyList,
      createTokenAccountTransaction
    );

  const grandGrandGrandParentMembershipUsdcTokenAccount =
    await getGrandGrandGrandParentMembershipUsdcTokenAccount(
      conn,
      parentMembership,
      wallet,
      royaltyList,
      createTokenAccountTransaction
    );

  return {
    creatorNftAccount,
    sourceTokenAccount,
    scobyUsdcTokenAccount,
    parentMembershipUsdcTokenAccount:
      parentMembershipUsdcTokenAccount || creatorUsdcTokenAccount,
    grandParentMembershipUsdcTokenAccount:
      grandParentMembershipUsdcTokenAccount || creatorUsdcTokenAccount,
    grandGrandParentMembershipUsdcTokenAccount:
      grandGrandParentMembershipUsdcTokenAccount || creatorUsdcTokenAccount,
    grandGrandGrandParentMembershipUsdcTokenAccount:
      grandGrandGrandParentMembershipUsdcTokenAccount ||
      creatorUsdcTokenAccount,
  };
}

async function getParentMembershipUsdcTokenAccount(
  conn: Connection,
  parentMembership: any,
  wallet: any,
  royaltyList: string[],
  createTokenAccountTransaction: Transaction
) {
  /* Parent Membership (Fake ID parent) accounts */
  const parentMembershipResp = await conn.getTokenLargestAccounts(
    parentMembership.extendedData.mint,
    "finalized"
  );
  if (
    parentMembershipResp == null ||
    parentMembershipResp.value == null ||
    parentMembershipResp.value.length == 0
  )
    return null;

  const parentMembershipAccount = parentMembershipResp.value[0].address;
  const info = await conn.getAccountInfo(parentMembershipAccount, "finalized");
  if (info == null) return null;
  const accountInfo = AccountLayout.decode(info.data);
  if (Number(accountInfo.amount) == 0) return null;
  const parentMembershipOwner = new PublicKey(accountInfo.owner);

  const parentMembershipUsdcTokenAccount =
    (await getOrCreateAssociatedTokenAccount(
      conn,
      wallet.publicKey,
      usdcToken,
      parentMembershipOwner,
      wallet.signTransaction
    )) as any;

  if (parentMembershipUsdcTokenAccount[1]) {
    if (
      royaltyList.findIndex(item => item == accountInfo.owner.toString()) == -1
    ) {
      royaltyList.push(accountInfo.owner.toString());
      createTokenAccountTransaction.add(parentMembershipUsdcTokenAccount[1]);
    }
  }

  return parentMembershipUsdcTokenAccount;
}

async function getGrandParentMembershipUsdcTokenAccount(
  conn: Connection,
  parentMembership: any,
  wallet: any,
  royaltyList: string[],
  createTokenAccountTransaction: Transaction
) {
  /* Grand Parent Membership (Fake ID Grand Parent) accounts */
  const grandParentMembershipResp = await conn.getTokenLargestAccounts(
    parentMembership.extendedData.parentNfp,
    "finalized"
  );

  if (
    grandParentMembershipResp == null ||
    grandParentMembershipResp.value == null ||
    grandParentMembershipResp.value.length == 0
  )
    return null;

  const grandParentMembershipAccount =
    grandParentMembershipResp.value[0].address;
  const info = await conn.getAccountInfo(
    grandParentMembershipAccount,
    "finalized"
  );

  if (info == null) return null;

  const accountInfo = AccountLayout.decode(info.data);

  if (Number(accountInfo.amount) == 0) return null;
  const grandParentMembershipOwner = new PublicKey(accountInfo.owner);

  const grandParentMembershipUsdcTokenAccount =
    (await getOrCreateAssociatedTokenAccount(
      conn,
      wallet.publicKey,
      usdcToken,
      grandParentMembershipOwner,
      wallet.signTransaction
    )) as any;

  if (grandParentMembershipUsdcTokenAccount[1]) {
    if (
      royaltyList.findIndex(item => item == accountInfo.owner.toString()) == -1
    ) {
      royaltyList.push(accountInfo.owner.toString());
      createTokenAccountTransaction.add(
        grandParentMembershipUsdcTokenAccount[1]
      );
    }
  }

  return grandParentMembershipUsdcTokenAccount;
}

async function getGrandGrandParentMembershipUsdcTokenAccount(
  conn: Connection,
  parentMembership: any,
  wallet: any,
  royaltyList: string[],
  createTokenAccountTransaction: Transaction
) {
  /* Grand Grand Parent Membership (Fake ID Grand Grand Parent) accounts */
  const grandGrandParentMembershipResp = await conn.getTokenLargestAccounts(
    parentMembership.extendedData.grandParentNfp,
    "finalized"
  );
  if (
    grandGrandParentMembershipResp == null ||
    grandGrandParentMembershipResp.value == null ||
    grandGrandParentMembershipResp.value.length == 0
  )
    return null;

  const grandGrandParentMembershipAccount =
    grandGrandParentMembershipResp.value[0].address;
  const info = await conn.getAccountInfo(
    grandGrandParentMembershipAccount,
    "finalized"
  );
  if (info == null) return null;
  const accountInfo = AccountLayout.decode(info.data);
  if (Number(accountInfo.amount) == 0) return null;
  const grandGrandParentMembershipOwner = new PublicKey(accountInfo.owner);

  const grandGrandParentMembershipUsdcTokenAccount =
    (await getOrCreateAssociatedTokenAccount(
      conn,
      wallet.publicKey,
      usdcToken,
      grandGrandParentMembershipOwner,
      wallet.signTransaction
    )) as any;

  if (grandGrandParentMembershipUsdcTokenAccount[1]) {
    if (
      royaltyList.findIndex(item => item == accountInfo.owner.toString()) == -1
    ) {
      royaltyList.push(accountInfo.owner.toString());
      createTokenAccountTransaction.add(
        grandGrandParentMembershipUsdcTokenAccount[1]
      );
    }
  }

  return grandGrandParentMembershipUsdcTokenAccount;
}

async function getGrandGrandGrandParentMembershipUsdcTokenAccount(
  conn: Connection,
  parentMembership: any,
  wallet: any,
  royaltyList: string[],
  createTokenAccountTransaction: Transaction
) {
  /* Grand Grand Grand Parent Membership (Fake ID Grand Grand Grand Parent) accounts */
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
    return null;

  const grandGrandGrandParentMembershipAccount =
    grandGrandGrandParentMembershipResp.value[0].address;
  const info = await conn.getAccountInfo(
    grandGrandGrandParentMembershipAccount,
    "finalized"
  );
  if (info == null) return null;
  const accountInfo = AccountLayout.decode(info.data);
  if (Number(accountInfo.amount) == 0) return null;
  const grandGrandGrandParentMembershipOwner = new PublicKey(accountInfo.owner);

  const grandGrandGrandParentMembershipUsdcTokenAccount =
    (await getOrCreateAssociatedTokenAccount(
      conn,
      wallet.publicKey,
      usdcToken,
      grandGrandGrandParentMembershipOwner,
      wallet.signTransaction
    )) as any;

  if (grandGrandGrandParentMembershipUsdcTokenAccount[1]) {
    if (
      royaltyList.findIndex(item => item == accountInfo.owner.toString()) == -1
    ) {
      royaltyList.push(accountInfo.owner.toString());
      createTokenAccountTransaction.add(
        grandGrandGrandParentMembershipUsdcTokenAccount[1]
      );
    }
  }

  return grandGrandGrandParentMembershipUsdcTokenAccount;
}
