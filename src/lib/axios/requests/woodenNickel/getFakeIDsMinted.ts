import client from "../../axiosClient";
import { getFakeIDsMinted } from "../theDeal/types/getFakeIDsMinted";

export async function getFakeIDsMinted(tokenAddress: string): Promise<number> {
  const response = await client.get<getFakeIDsMinted>(
    `/woodenNickel/fake-id-minted?tokenAddress=${tokenAddress}`
  );

  return response.data.fakeIdMinted;
}
