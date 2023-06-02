
import { getNFTByWallet } from "../common/getNFTByWallet";
import { getNFTByWalletByName } from "../common/getNFTByWalletOnChain";
import { NftJsonMetadata } from "../types/nftJsonMetadata";

export async function checkIfUserHasCompassRose(wallet: any): Promise<boolean> {
    const Symbol = "compass rose";
    const rpcCluster = process.env.NEXT_PUBLIC_HELIUS_SOLANA_CLUSTER!;

    const rose = await getNFTByWalletByName(
        Symbol,
        rpcCluster,
        wallet.publicKey,
    );

    if (!rose) {
        return false
    }
    return true

}
