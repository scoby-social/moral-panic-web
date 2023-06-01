import { getNFTByWallet } from "../common/getNFTByWallet";
import { NftJsonMetadata } from "../types/nftJsonMetadata";
import { CompressNFTData } from "../types/nftMetadata";

export const getCompassRoseMetaData = async (wallet: any) => {
    const Symbol = "ROSE";
    const rpcCluster = process.env.NEXT_PUBLIC_HELIUS_SOLANA_CLUSTER!;

    const rose = await getNFTByWallet(
        Symbol,
        rpcCluster,
        wallet.publicKey,
    ) as unknown as CompressNFTData | null;


    if (!rose) {
        return null
    }

    const metadataJson = await (await fetch(rose.content.json_uri)).json() as NftJsonMetadata;

    return metadataJson;
}


