import { Connection } from "@solana/web3.js";
import { getNftListMarket } from "../common/getNftListMarket"

import WoodenNickelIDL from "./wooden-nickel.json";
import { NftInMarketplace } from "../types/NftInMarketplace";

export const getWoodenNickelsListMarket = async (userWallet: any,) => {

    const conn = new Connection(process.env.NEXT_PUBLIC_SOLANA_CLUSTER!);
    const WOODEN_NICKEL_PROGRAM_ID = '5jKk2meTu2FJeXAQHec6eZumRpjuuqr4pM9AVDayf2q3';

    const nftsInMarketplace = await getNftListMarket(userWallet, conn, WoodenNickelIDL, WOODEN_NICKEL_PROGRAM_ID);

    return nftsInMarketplace as NftInMarketplace[];
}
