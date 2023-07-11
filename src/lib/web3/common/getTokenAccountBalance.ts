import { Connection, PublicKey } from "@solana/web3.js";

import WrapperConnection from "../wrappedConnection";

export async function getTokenAccountBalance(
  owner: PublicKey,
  mint: PublicKey,
  conn: Connection
) {
  const tokenAccounts = await conn.getTokenAccountsByOwner(owner, { mint });

  const balance = await conn.getTokenAccountBalance(
    tokenAccounts.value[0].pubkey
  );

  return balance;
}
