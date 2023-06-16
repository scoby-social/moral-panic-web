import client from "lib/axios/axiosClient";

export async function updateWoodenNickelByFakeIDMint(
  tokenAddress: string
): Promise<void> {
  return client.patch(`/woodenNickel/fake-id?tokenAddress=${tokenAddress}`);
}
