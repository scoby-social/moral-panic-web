import { User } from "lib/models/user";
import client from "lib/axios/axiosClient";
import { NftQuota } from "./types/nftQuota";
import { PublicKey } from "@metaplex-foundation/js";

export async function updateAmountListed(walletAddress: PublicKey, amount: number): Promise<boolean> {

    const pubKey = walletAddress.toString();

    try {
        const response = await client.patch<boolean>(`/woodenNickel/amountListed`, {
            wallet: pubKey,
            amountListed: amount
        });

        return response.data;
    } catch (error) {
        console.error(error);
        return false
    }
}
