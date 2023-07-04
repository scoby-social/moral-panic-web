import { PublicKey } from "@metaplex-foundation/js";
import { getTheDealForgeQuota } from "lib/axios/requests/theDeal/getTheDealForgeQuota";
import { getVolumeNftTheDeal } from "lib/axios/requests/theDeal/getVolumeNftTheDeal";
import { getWoodenNickelsToList } from "lib/web3/woodenNickel/getWoodenNickelsToList";
import { SellNftListDealStatement } from "../types/sellNftListDealStatement";
import { NftInMarketplace } from "lib/web3/types/NftInMarketplace";
import { getNftMarketAmount } from "./getNftMarketAmount";

export const getNftsToDeal = async (
  wallet: any,
  lisNftMarket: NftInMarketplace[]
) => {
  const userPubkey = wallet.publicKey as PublicKey;
  const userWalletString = userPubkey.toString();
  const nftList = await getWoodenNickelsToList(userPubkey);

  if (nftList.length === 0) {
    return [];
  }

  const nftPropsFormated = nftList.map(async nft => {
    const minterString = nft.name.split(" ")[0];
    const minter = minterString.substring(0, minterString.length - 2);

    const image = await (await fetch(nft.image)).blob();
    const imageUrl = URL.createObjectURL(image);

    const volume = await getVolumeNftTheDeal(new Date(), nft.symbol);
    const quota = await getTheDealForgeQuota(userWalletString);

    const price = lisNftMarket.find(i => i.symbol === nft.symbol)?.price || 0;

    const amount = getNftMarketAmount(lisNftMarket, nft.symbol);

    return {
      external_url: nft.external_link,
      description: nft.description,
      image: imageUrl,
      seniority: "2",
      name: nft.name,
      symbol: nft.symbol,
      price,
      amount,
      minter,
      type: "sell",
      volume,
      quota: quota.maxList || 0,
      statement: nftList,
    } as SellNftListDealStatement;
  });

  const res = await Promise.all(nftPropsFormated);

  let nftPropsFiltered: SellNftListDealStatement[] = [];

  res.forEach((val, index) => {
    const nftFound = nftPropsFiltered.find(i => i.symbol === val.symbol);

    console.log({ nftFound, index });

    if (!nftFound) {
      nftPropsFiltered = [...nftPropsFiltered, val];
    }
  });

  return nftPropsFiltered;
};
