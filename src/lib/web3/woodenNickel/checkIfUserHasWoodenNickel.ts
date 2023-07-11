import { Connection } from "@solana/web3.js";
import { getNftsForOwnerBySymbol } from "../common/getNftsForOwner";
import { getNFTByWallet } from "../common/getNFTByWallet";

export async function checkIfUserHasWoodenNickel(
  wallet: any
): Promise<boolean> {
  const symbol = "NICKEL";
  const conn = new Connection(process.env.NEXT_PUBLIC_SOLANA_CLUSTER!);

  const nickel = await getNftsForOwnerBySymbol(symbol, wallet.publicKey, conn);

  return nickel.length > 0;
}
