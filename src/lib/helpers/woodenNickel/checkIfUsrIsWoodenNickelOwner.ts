import { PublicKey } from "@metaplex-foundation/js";
import { getWoodenNickelAddress } from "lib/axios/requests/woodenNickel/getWoodenNickelAddress";

export const checkIfUsrIsWoodenNickelOwner = async (
  walletAddress: PublicKey,
  tokenAddress: PublicKey
) => {
  const wnAddress = await getWoodenNickelAddress(walletAddress.toString());

  return wnAddress === tokenAddress.toString();
};
