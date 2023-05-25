import { Connection, PublicKey } from "@solana/web3.js";
import { getNftsForOwnerBySymbol } from "../common/getNftsForOwner";

export async function getWoodenNickelAddress(
  wallet: PublicKey
): Promise<string> {
  const conn = new Connection(process.env.NEXT_PUBLIC_SOLANA_CLUSTER!);

  const data = await getNftsForOwnerBySymbol("NICKEL", wallet, conn);

  console.log("Data: ", data);

  return "";
}
