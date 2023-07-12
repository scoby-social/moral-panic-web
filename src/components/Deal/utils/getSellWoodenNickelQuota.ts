import { PublicKey } from "@metaplex-foundation/js";
import { getTheDealForgeQuota } from "lib/axios/requests/theDeal/getTheDealForgeQuota";
import { getTheDealWoodenNickelAmountListed } from "lib/axios/requests/theDeal/getTheDealWoodenNickelAmountListed";
import { getWoodenNickelAddress } from "lib/axios/requests/woodenNickel/getWoodenNickelAddress";

export const getSellWoodenNickelQuota = async (
  symbol: string,
  walletPubKey: PublicKey,
  tokenAddress: string
) => {
  if (symbol !== "NICKEL") return 0;

  const wnAddress = await getWoodenNickelAddress(walletPubKey.toString());

  if (!wnAddress || tokenAddress !== wnAddress) return 0;
  const amountListed = await getTheDealWoodenNickelAmountListed(wnAddress);
  const wnQuota = await getTheDealForgeQuota(wnAddress);
  const amountQuota = wnQuota.maxList - amountListed;

  return amountQuota <= 0 ? 0 : amountQuota;
};
