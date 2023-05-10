import { Connection, PublicKey } from "@solana/web3.js";
import { JsonMetadata, Metadata, Metaplex, Nft, NftWithToken, Sft, SftWithToken } from "@metaplex-foundation/js";

import { TOKEN_PROGRAM_ID, getAccount } from '@solana/spl-token'
import { getAssociatedTokenAddress } from "./getAssociatedTokenAddress";

interface response {
  balance: number,
  metadata: Sft | SftWithToken | Nft | NftWithToken
}

export async function getSftsForOwnerWalletByMintAddress(
  mintAddress: PublicKey,
  owner: PublicKey,
  conn: Connection
): Promise<response | null> {
  const metaplex = new Metaplex(conn);

  const associatedTokens = await conn.getTokenAccountsByOwner(owner, { programId: TOKEN_PROGRAM_ID });




  const associatedToken = await getAssociatedTokenAddress(mintAddress, owner);

  const hasAssociatedAccount = associatedTokens.value.find(val => val.pubkey.toString() === associatedToken.toString());

  if (!hasAssociatedAccount) {
    return null;
  }

  const nftMetadata = await metaplex.nfts().findByMint({ mintAddress })
  const balance = await conn.getTokenAccountBalance(associatedToken)

  return { metadata: nftMetadata, balance: balance.value.uiAmount as number };
}
