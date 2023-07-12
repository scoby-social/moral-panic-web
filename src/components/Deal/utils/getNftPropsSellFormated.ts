import { PublicKey } from "@metaplex-foundation/js";
import { getVolumeNftTheDeal } from "lib/axios/requests/theDeal/getVolumeNftTheDeal";
import { NftInMarketplace } from "lib/web3/types/NftInMarketplace";
import { NftToList } from "lib/web3/types/nftToList";
import { getNftMarketAmount } from "./getNftMarketAmount";
import { getSellWoodenNickelQuota } from "./getSellWoodenNickelQuota";
import { checkIfUserIsWoodenNickelOwner } from "lib/helpers/woodenNickel";
import { SellNftListDealStatement } from "../types/sellNftListDealStatement";

export const getNftPropsSellFormated = async (
  nftList: NftToList[],
  listNftMarket: NftInMarketplace[],
  userPubkey: PublicKey
) => {
  const nftPropsFormated = nftList.map(async nft => {
    const tokenAddress = new PublicKey(nft.mint);
    const minterString = nft.name.split(" ")[0];
    const minter = minterString.substring(0, minterString.length - 2);

    const image = await (await fetch(nft.image)).blob();
    const imageUrl = URL.createObjectURL(image);

    const volume = await getVolumeNftTheDeal(new Date(), nft.symbol);

    const price = listNftMarket.find(i => i.symbol === nft.symbol)?.price || 0;
    const amount = getNftMarketAmount(listNftMarket, nft.symbol);
    const quota = await getSellWoodenNickelQuota(
      nft.symbol,
      userPubkey,
      nft.mint
    );
    const insOwner = await checkIfUserIsWoodenNickelOwner(
      userPubkey,
      tokenAddress
    );

    return {
      external_url: nft.external_url,
      description: nft.description,
      image: imageUrl,
      seniority: nft?.seniority?.toString() || "1",
      name: nft.name,
      symbol: nft.symbol,
      price,
      amount,
      minter,
      type: "sell",
      volume,
      quota: quota,
      statement: nftList,
      mint: nft.mint,
      isOwner: insOwner,
    } as SellNftListDealStatement;
  });

  return await Promise.all(nftPropsFormated);
};
