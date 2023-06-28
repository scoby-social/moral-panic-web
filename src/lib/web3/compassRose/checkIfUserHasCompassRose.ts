import { getNFTByWalletByGroupValue } from "../common/getNFTByWalletByGroupValue";


export async function checkIfUserHasCompassRose(wallet: any): Promise<boolean> {
    const groupValue = process.env.NEXT_PUBLIC_COMPASS_ROSE_GROUP_VALUE!;
    const rpcCluster = process.env.NEXT_PUBLIC_HELIUS_SOLANA_CLUSTER!;

    const rose = await getNFTByWalletByGroupValue(
        groupValue,
        rpcCluster,
        wallet.publicKey,
    );

    if (!rose) {
        return false
    }
    return true

}
