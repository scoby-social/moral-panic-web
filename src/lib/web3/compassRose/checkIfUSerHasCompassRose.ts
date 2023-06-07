
import { getNFTByWallet } from "../common/getNFTByWallet";

export async function checkIfUserHasCompassRose(wallet: any): Promise<boolean> {
    const Symbol = "ROSE";
    const rpcCluster = process.env.NEXT_PUBLIC_HELIUS_SOLANA_CLUSTER!;

    const rose = await getNFTByWallet(
        Symbol,
        rpcCluster,
        wallet.publicKey,
    );

    if (!rose) {
        return false
    }

    return true

}
