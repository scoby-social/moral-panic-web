import { Connection } from "@solana/web3.js";
import { getProvider } from "lib/helpers/getProvider";

import * as anchor from "@project-serum/anchor";

import { PublicKey } from "@metaplex-foundation/js";
import { getParsedNftAccountsByOwner } from "@nfteyez/sol-rayz";
import { NftInMarketplace } from "../types/NftInMarketplace";

export const getNftListToSell = async (
  userWallet: any,
  connection: Connection,
  IDL: any,
  PROGRAM_ID: string
) => {
  const provider = getProvider(connection, userWallet!);
  const program = new anchor.Program(IDL, new PublicKey(PROGRAM_ID), provider);

  let [vaultPDA] = await anchor.web3.PublicKey.findProgramAddress(
    [Buffer.from("rewards vault")],
    program.programId
  );

  let nftArray = await getParsedNftAccountsByOwner({
    publicAddress: vaultPDA.toString(),
    connection: connection,
  });

  const nftInMarketplacePromiseArr = nftArray.map(async nft => {
    let [listNftPDA] = await anchor.web3.PublicKey.findProgramAddress(
      [Buffer.from("list nft"), new PublicKey(nft.mint).toBuffer()],
      program.programId
    );

    const listNftInfo = await connection.getAccountInfo(listNftPDA);
    if (!listNftInfo) {
      return [];
    }
    let listNFtData: any = null;
    listNFtData = await program.account.listNft.fetch(listNftPDA);

    const metadata = await (await fetch(nft.data.uri)).json();

    return [
      {
        ...metadata,
        ...nft,
        owner: listNFtData.owner,
        price: listNFtData?.price.toNumber() / 10 ** 6,
        amount: listNFtData?.amount.toNumber(),
      },
    ];
  });

  const nftInMarketPlace = await Promise.all(nftInMarketplacePromiseArr);

  return nftInMarketPlace.flat() as NftInMarketplace[];
};
