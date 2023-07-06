import { PublicKey } from "@metaplex-foundation/js";
import { getTheDealForgeQuota } from "lib/axios/requests/theDeal/getTheDealForgeQuota";
import { getWoodenNickelAddress } from "lib/axios/requests/woodenNickel/getWoodenNickelAddress";

export const getSellWoodenNickelQuota = async (
  symbol: string,
  walletPubKey: PublicKey,
  tokenAddress: string
) => {
  if (symbol !== "NICKEL") return 0;

  const wnAddress = await getWoodenNickelAddress(walletPubKey.toString());

  if (!wnAddress || tokenAddress !== wnAddress) return 0;

  const wnQuota = await getTheDealForgeQuota(wnAddress);

  return wnQuota.maxList;
};
