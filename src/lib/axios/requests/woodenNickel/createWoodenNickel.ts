import client from "lib/axios/axiosClient";

export async function createWoodenNickel(
  walletAddress: string,
  tokenAddress: string,
  amount: number,
  fakeID: string
): Promise<void> {
  return client.post("/woodenNickel", {
    tokenAddress,
    walletAddress,
    amount,
    fakeID,
  });
}
