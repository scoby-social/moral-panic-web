import { PublicKey } from "@solana/web3.js";

import WrapperConnection from "../wrappedConnection";

export async function getNFTByWallet(
  symbol: string,
  rpcUrl: string,
  owner: PublicKey
) {
  const conn = new WrapperConnection(rpcUrl);
  const rpcAssets = await conn
    .getAssetsByOwner({ ownerAddress: owner.toBase58() })
    .then(res => {
      return res;
    });

  const nfts = rpcAssets?.items.find(
    val => val.content.metadata?.symbol === symbol
  );

  return nfts || null;
}
