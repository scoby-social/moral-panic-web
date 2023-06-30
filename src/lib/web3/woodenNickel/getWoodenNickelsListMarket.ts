import { Connection } from "@solana/web3.js";
import { getNftListMarket } from "../common/getNftListMarket";

import WoodenNickelIDL from "./wooden-nickel.json";
import { NftInMarketplace } from "../types/NftInMarketplace";

export const getWoodenNickelsListMarket = async (userWallet: any) => {
  const conn = new Connection(process.env.NEXT_PUBLIC_SOLANA_CLUSTER!);
  const WOODEN_NICKEL_PROGRAM_ID =
    process.env.NEXT_PUBLIC_WOODEN_NICKEL_PROGRAMID_THE_DEAL!;

  const nftsInMarketplace = await getNftListMarket(
    userWallet,
    conn,
    WoodenNickelIDL,
    WOODEN_NICKEL_PROGRAM_ID
  );

  return nftsInMarketplace as NftInMarketplace[];
};
