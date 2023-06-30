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
    process.env.NEXT_PUBLIC_WOODEN_NICKEL_PROGRAMID_THE_DEAL!;
  const REWARD_TOKEN = process.env.NEXT_PUBLIC_REWARD_TOKEN!;

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
