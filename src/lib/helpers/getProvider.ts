import * as anchor from '@project-serum/anchor';
import { AnchorWallet } from '@solana/wallet-adapter-react';

export const getProvider = (connection: anchor.web3.Connection, wallet: AnchorWallet ) => {
  return new anchor.AnchorProvider(connection, wallet, 'confirmed' as anchor.web3.ConfirmOptions);
}