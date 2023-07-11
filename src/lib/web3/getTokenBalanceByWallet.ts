import { Connection, PublicKey } from "@solana/web3.js";
import { getTokenAccountBalance } from "./common/getTokenAccountBalance";

export async function getTokenBalanceByWallet(
  owner: PublicKey,
  nftAddress: PublicKey
): Promise<number> {
  const rpcCluster = process.env.NEXT_PUBLIC_SOLANA_CLUSTER!;
  const connection = new Connection(rpcCluster);

  const amount = await getTokenAccountBalance(owner, nftAddress, connection);

  return parseFloat(amount.value.amount);
}
