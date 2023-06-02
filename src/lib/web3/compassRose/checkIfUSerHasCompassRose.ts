
import { getNFTByWallet } from "../common/getNFTByWallet";
import { getNFTByWalletByGrouValue } from "../common/getNFTByWalletByGroupValue";
import { getNFTByWalletByName } from "../common/getNFTByWalletOnChain";
import { NftJsonMetadata } from "../types/nftJsonMetadata";

export async function checkIfUserHasCompassRose(wallet: any): Promise<boolean> {
    const groupValue = process.env.NEXT_PUBLIC_COMPASS_ROSE_GROUP_VALUE!;
    const rpcCluster = process.env.NEXT_PUBLIC_HELIUS_SOLANA_CLUSTER!;

    const rose = await getNFTByWalletByGrouValue(
        groupValue,
        rpcCluster,
        wallet.publicKey,
    );

    if (!rose) {
        return false
    }
    return true

}
