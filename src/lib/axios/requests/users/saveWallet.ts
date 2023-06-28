import { PublicKey } from '@metaplex-foundation/js';
import client from 'lib/axios/axiosClient';

export const saveWallet = async (wallet: PublicKey) => {

    const address = wallet.toString();

    const result = await client.post("/user/wallet", { wallet: address });

    return result
}
