import { Connection, PublicKey } from "@solana/web3.js";
import { Metaplex, JsonMetadata, Metadata, Nft, NftWithToken, Sft, SftWithToken, MetaplexError, ReadApiAssetList, ReadApiConnection, ReadApiAsset } from "@metaplex-foundation/js";

import { TOKEN_PROGRAM_ID, getAccount } from '@solana/spl-token'
import { getAssociatedTokenAddress } from "./getAssociatedTokenAddress";


export async function getNFTByWallet(
    symbol: string,
    rpcUrl: string,
    owner: PublicKey,
) {
    const rpcAssets = await new ReadApiConnection(rpcUrl).getAssetsByOwner({ ownerAddress: owner.toBase58() }).then(res => {
        if ((res as MetaplexError)?.cause) throw res;
        else return res as ReadApiAssetList;
    });

    const nfts = rpcAssets.items.find(val => val.content.metadata?.symbol === symbol);

    return nfts || null;
}
