import { User } from "lib/models/user";
import client from "lib/axios/axiosClient";
import { NftQuota } from "./types/nftQuota";

export async function getTheDealForgeQuota(tokenAddress: string): Promise<NftQuota> {
    const response = await client.get<NftQuota>(`/woodenNickel/quota?tokenAddress=${tokenAddress}`);

    return response.data;
}
