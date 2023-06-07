import client from "lib/axios/axiosClient";

export async function getWoodenNickelFakeIDInfo(tokenAddress: string) {
  return (await client.get(`woodenNickel/fake-id?tokenAddress=${tokenAddress}`))
    .data;
}
