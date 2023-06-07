import { PublicKey } from '@metaplex-foundation/js';
import client from 'lib/axios/axiosClient';

export const checkIfWalletExists = async (wallet: PublicKey) => {

    const address = wallet.toString();

    const result = await client.get<boolean>(`/user/wallet?wallet=${address}`);

    return result.data
}
