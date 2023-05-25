import client from "lib/axios/axiosClient";

export async function createWoodenNickel(
  walletAddress: string,
  tokenAddress: string
): Promise<void> {
  return client.post("/woodenNickel", { tokenAddress, walletAddress });
}
