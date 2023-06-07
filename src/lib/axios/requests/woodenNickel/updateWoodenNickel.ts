import client from "lib/axios/axiosClient";

export async function updateWoodenNickel(
  wallet: string,
  amount: number
): Promise<void> {
  client.patch("/woodenNickel", { wallet, amount });
}
