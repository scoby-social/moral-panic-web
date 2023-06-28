import { WoodenNickelLineage } from "components/Forge/Items/types";
import client from "lib/axios/axiosClient";

export async function getWoodenNickelLineage(
  fakeID: string
): Promise<WoodenNickelLineage> {
  return (await client.get(`/woodenNickel/lineage?fakeID=${fakeID}`)).data;
}
