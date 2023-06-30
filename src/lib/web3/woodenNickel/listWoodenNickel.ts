import { Connection } from "@solana/web3.js";
import { listNftToSell } from "../common/listNftToSell";
import { NftToList } from "../types/nftToList";

import WoodenNickelIDL from "./wooden-nickel.json";

export const listWoodenNickel = async (
  nft: NftToList,
  userWallet: any,
  amount: number
) => {
  const WOODEN_NICKEL_PROGRAM_ID =
    process.env.NEXT_PUBLIC_WOODEN_NICKEL_PROGRAMID_THE_DEAL!;
  const REWARD_TOKEN_DECIMAL = 1000000;

  const conn = new Connection(process.env.NEXT_PUBLIC_SOLANA_CLUSTER!);

  const response = await listNftToSell(
    nft,
    userWallet,
    conn,
    WoodenNickelIDL,
    WOODEN_NICKEL_PROGRAM_ID,
    REWARD_TOKEN_DECIMAL,
    amount
  );

  return response;
};
