import { getNftUserWalletToList } from '../common/getNftUserWalletToList'
import { Connection } from '@solana/web3.js';
import { PublicKey } from '@metaplex-foundation/js';
import { NftToList } from '../types/nftToList';

export const getCompassRoseToList = async (userWalletAddress: PublicKey) => {

    const symbol = 'ROSE';
    const conn = new Connection(process.env.NEXT_PUBLIC_SOLANA_CLUSTER!);

    const wnList = await getNftUserWalletToList(userWalletAddress, conn, symbol);

    return wnList as NftToList[];
}
