import { PublicKey } from "@metaplex-foundation/js";
import { getWoodenNickelsToList } from "lib/web3/woodenNickel/getWoodenNickelsToList";
import { NftInMarketplace } from "lib/web3/types/NftInMarketplace";
import { SellNftListDealStatement } from "../types/sellNftListDealStatement";
import { getWNFakeIDsMintToIncreasedAt } from "./getWNFakeIDsMintToIncreasedAt";
import { getNftPropsSellFormated } from "./getNftPropsSellFormated";

export const getNftsToDeal = async (
  wallet: any,
  lisNftMarket: NftInMarketplace[]
) => {
  const userPubkey = wallet.publicKey as PublicKey;
  const nftList = await getWoodenNickelsToList(userPubkey);

  if (nftList.length === 0) {
    return [];
  }

  const nftProps = await getNftPropsSellFormated(
    nftList,
    lisNftMarket,
    userPubkey
  );

  let nftPropsFiltered: SellNftListDealStatement[] = [];

  nftProps.forEach(async val => {
    const nftFound = nftPropsFiltered.find(i => i.symbol === val.symbol);

    if (!nftFound && val.isOwner) {
      nftPropsFiltered = [...nftPropsFiltered, val];
    }
  });

  const nftPropsWithIncreasedAt = nftPropsFiltered.map(async val => {
    const fakeIdMintedToIncreasedAt = await getWNFakeIDsMintToIncreasedAt(
      val.symbol,
      userPubkey
    );

    return { ...val, fakeIdMintedToIncreasedAt };
  });

  const nftPropsWithIncreasedAtPromised = await Promise.all(
    nftPropsWithIncreasedAt
  );

  return nftPropsWithIncreasedAtPromised;
};
