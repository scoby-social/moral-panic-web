import { WoodenNickelQuota } from "components/Forge/Items/types";
import client from "lib/axios/axiosClient";

export async function getWoodenNickelQuota(
  address: string
): Promise<WoodenNickelQuota> {
  return (await client.get(`/woodenNickel/quota?tokenAddress=${address}`)).data;
}
