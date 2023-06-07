import { getNFTByWallet } from "../common/getNFTByWallet";

export const getCompassRoseMetaData = async (wallet: any) => {
    const Symbol = "ROSE";
    const rpcCluster = process.env.NEXT_PUBLIC_HELIUS_SOLANA_CLUSTER!;

    const rose = await getNFTByWallet(
        Symbol,
        rpcCluster,
        wallet.publicKey,
    );

    if (!rose) {
        return null
    }

    return rose;
}


