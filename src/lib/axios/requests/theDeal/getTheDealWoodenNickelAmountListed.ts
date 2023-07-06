import client from "lib/axios/axiosClient";
import { getTheDealAmountListed } from "./types/getTheDealAmountListed";

export async function getTheDealWoodenNickelAmountListed(
  tokenAddress: string
): Promise<number> {
  const response = await client.get<getTheDealAmountListed>(
    `/woodenNickel/amountListed?tokenAddress=${tokenAddress}`
  );

  return response.data.amount;
}
