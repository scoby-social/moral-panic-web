import { PublicKey } from "@solana/web3.js";

import WrapperConnection from "../wrappedConnection";

export async function getNFTByWalletByGroupValue(
    groupKey: string,
    rpcUrl: string,
    owner: PublicKey,
) {
    const conn = new WrapperConnection(rpcUrl)
    const rpcAssets = await conn.getAssetsByOwner({ ownerAddress: owner.toBase58() }).then(res => {
        return res
    });

    const nfts = rpcAssets.items.find(val => val.grouping.find(i => i.group_value === groupKey));

    return nfts || null;
}
