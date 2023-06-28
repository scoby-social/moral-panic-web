
import { getNFTByWallet } from "../common/getNFTByWallet";

export async function checkIfUserHasWoodenNickel(wallet: any): Promise<boolean> {
    const Symbol = "NICKEL";
    const rpcCluster = process.env.NEXT_PUBLIC_HELIUS_SOLANA_CLUSTER!;

    const nickel = await getNFTByWallet(
        Symbol,
        rpcCluster,
        wallet.publicKey,
    );

    if (!nickel) {
        return false
    }

    return true

}
