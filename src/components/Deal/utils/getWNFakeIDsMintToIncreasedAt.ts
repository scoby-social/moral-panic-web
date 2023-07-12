import { PublicKey } from "@metaplex-foundation/js";
import { getTheDealForgeQuota } from "lib/axios/requests/theDeal/getTheDealForgeQuota";
import { getFakeIDsMinted } from "lib/axios/requests/woodenNickel/getFakeIDsMinted";
import { getWoodenNickelAddress } from "lib/axios/requests/woodenNickel/getWoodenNickelAddress";

export const getWNFakeIDsMintToIncreasedAt = async (
  symbol: string,
  walletPubKey: PublicKey
) => {
  if (symbol !== "NICKEL") return 0;

  const wnAddress = await getWoodenNickelAddress(walletPubKey.toString());

  const fakeIDsMinted = await getFakeIDsMinted(wnAddress);
  const wnQuota = await getTheDealForgeQuota(wnAddress);
  const fakeIdMintedToIncreasedAt = wnQuota.increasesAt - fakeIDsMinted;

  return fakeIdMintedToIncreasedAt <= 0 ? 0 : fakeIdMintedToIncreasedAt;
};
