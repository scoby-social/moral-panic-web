import { getNFTByWallet } from "../common/getNFTByWallet";
import { getNFTByWalletByGroupValue } from "../common/getNFTByWalletByGroupValue";
import { getNFTByWalletByName } from "../common/getNFTByWalletOnChain";
import { NftJsonMetadata } from "../types/nftJsonMetadata";
import { CompressNFTData } from "../types/nftMetadata";

export const getCompassRoseMetaData = async (wallet: any) => {
    const groupValue = process.env.NEXT_PUBLIC_COMPASS_ROSE_GROUP_VALUE!;
    const rpcCluster = process.env.NEXT_PUBLIC_HELIUS_SOLANA_CLUSTER!;

    const rose = await getNFTByWalletByGroupValue(
        groupValue,
        rpcCluster,
        wallet.publicKey,
    ) as unknown as CompressNFTData | null;

    if (!rose) {
        return null
    }

    const metadataJson = await (await fetch(rose.content.json_uri)).json() as NftJsonMetadata;

    return metadataJson;
}


