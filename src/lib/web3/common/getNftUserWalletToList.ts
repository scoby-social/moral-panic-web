import { getParsedNftAccountsByOwner } from "@nfteyez/sol-rayz";
import { Connection, PublicKey } from "@solana/web3.js";
import { NftToList } from "../types/nftToList";
export const getNftUserWalletToList = async (
  userWalletAddress: PublicKey,
  connection: Connection,
  symbol: string
) => {
  let walletNftArray = await getParsedNftAccountsByOwner({
    publicAddress: userWalletAddress.toString(),
    connection,
  });

  const nftListFiltered = walletNftArray.filter(
    item => item.data.symbol === symbol
  );

  const nftCustomObject = nftListFiltered.map(async item => {
    const res = await fetch(item.data.uri);
    const data = await res.json();

    return { ...data, ...item, listed: false };
  });

  const nft = await Promise.all(nftCustomObject);

  return nft as NftToList[];
};
