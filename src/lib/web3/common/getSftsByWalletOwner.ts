import { Connection, PublicKey } from "@solana/web3.js";
import { Metaplex, Nft, NftWithToken, Sft, SftWithToken } from "@metaplex-foundation/js";

import { TOKEN_PROGRAM_ID, getAccount } from '@solana/spl-token'

export async function getSftsForOwnerWalletBySymbol(
  symbol: string,
  owner: PublicKey,
  conn: Connection
) {
  if (!owner) return [];
  const allTokens: (Sft | SftWithToken | Nft | NftWithToken)[] = [];
  const metaplex = new Metaplex(conn);

  const associatedTokens = await conn.getTokenAccountsByOwner(owner, { programId: TOKEN_PROGRAM_ID });

  const getAccountProises = associatedTokens.value.map(val => {
    return getAccount(conn, val.pubkey);
  })

  const getAccountResult = await Promise.all(getAccountProises)
  const mints = getAccountResult.map(val => val.mint);
  const getTokensMetadataPromises = mints.map(val => metaplex.nfts().findByMint({ mintAddress: val }))
  const getTokensMetadataResult = await Promise.all(getTokensMetadataPromises);

  getTokensMetadataResult.forEach((val) => {
    if (val.symbol === symbol) {
      allTokens.push(val);
    }
  });

  return allTokens;
}
