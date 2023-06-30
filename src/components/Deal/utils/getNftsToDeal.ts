import { PublicKey } from "@metaplex-foundation/js";
import { getTheDealForgeQuota } from "lib/axios/requests/theDeal/getTheDealForgeQuota";
import { getVolumeNftTheDeal } from "lib/axios/requests/theDeal/getVolumeNftTheDeal";
import { getWoodenNickelsToList } from "lib/web3/woodenNickel/getWoodenNickelsToList";
import { SellNftListDealStatement } from "../types/sellNftListDealStatement";

export const getNftsToDeal = async (wallet: any) => {
  const userPubkey = wallet.publicKey as PublicKey;
  const nftList = await getWoodenNickelsToList(wallet.publicKey as PublicKey);
  const userWalletString = wallet.publicKey!.toString();

  if (nftList.length === 0) {
    return [];
  }

  const nftFiltered = nftList.filter(
    i => i.data.creators[2].address === userPubkey.toBase58()
  );

  const nftPropsFormated = nftFiltered.map(async nft => {
    const minterString = nft.name.split(" ")[0];
    const minter = minterString.substring(0, minterString.length - 2);

    const image = await (await fetch(nft.image)).blob();
    const imageUrl = URL.createObjectURL(image);

    const volume = await getVolumeNftTheDeal(new Date(), nft.symbol);
    const quota = await getTheDealForgeQuota(userWalletString);
    return {
      external_url: nft.external_link,
      description: nft.description,
      image: imageUrl,
      seniority: "2",
      name: nft.name,
      symbol: nft.symbol,
      price: 0.01,
      amount: 0,
      minter,
      type: "sell",
      volume,
      quota: quota.maxList || 0,
      statement: nftFiltered,
    } as SellNftListDealStatement;
  });

  return await Promise.all(nftPropsFormated);
};
