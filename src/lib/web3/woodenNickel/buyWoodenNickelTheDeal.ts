import { Connection } from "@solana/web3.js";

import WoodenNickelIDL from "./wooden-nickel.json";
import { buyNftInMarket } from "../common/buyNftInMarket";
import { NftInMarketplace } from "../types/NftInMarketplace";

export const buyWoodenNickelTheDeal = async (
  nft: NftInMarketplace,
  userWallet: any,
  amount: number
) => {
  const WOODEN_NICKEL_PROGRAM_ID =
    "5jKk2meTu2FJeXAQHec6eZumRpjuuqr4pM9AVDayf2q3";
  const REWARD_TOKEN = "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU";

  const conn = new Connection(process.env.NEXT_PUBLIC_SOLANA_CLUSTER!);

  const response = await buyNftInMarket(
    userWallet,
    nft,
    conn,
    WoodenNickelIDL,
    WOODEN_NICKEL_PROGRAM_ID,
    amount,
    REWARD_TOKEN
  );

  return response;
};
