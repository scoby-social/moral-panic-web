import client from "lib/axios/axiosClient";

export async function getWoodenNickelAddress(wallet: string): Promise<string> {
  return (await client.get(`/woodenNickel?wallet=${wallet}`)).data;
}
