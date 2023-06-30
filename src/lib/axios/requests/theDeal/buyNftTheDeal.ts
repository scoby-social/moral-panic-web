import client from "lib/axios/axiosClient";
import { PublicKey } from "@metaplex-foundation/js";

export async function buyNftTheDeal(
  tokenAddress: PublicKey,
  tokenSymbol: string,
  walletOwner: PublicKey,
  walletBuyer: PublicKey,
  amount: number,
  nftMetadataUrl: string
): Promise<void> {
  const tokenAddressString = tokenAddress.toString();
  const walletOwnerString = walletOwner.toString();
  const walletBuyerString = walletBuyer.toString();
  await client.post<boolean>(`/thedeal`, {
    tokenAddress: tokenAddressString,
    tokenSymbol,
    walletOwner: walletOwnerString,
    walletBuyer: walletBuyerString,
    amount,
    nftMetadataUrl,
  });
}
