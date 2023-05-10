import { Connection } from "@solana/web3.js";
import { getSftsForOwnerWalletByMintAddress } from "../common/getSftsByWalletOwnerByMintAddress";
import { PublicKey } from "@metaplex-foundation/js";

export async function checkIfUserHasWoodenNickle(wallet: any): Promise<boolean> {
  const conn = new Connection("https://rpc-devnet.helius.xyz/?api-key=fefa4889-258a-42b3-91e6-2d9dff8b3b3a", "confirmed");
  const Symbol = "NICKEL";
  const mintAddress = new PublicKey(process.env.NEXT_PUBLIC_WOODEN_NICKEL_MINT_ADDRESS!)

  const nickle = await getSftsForOwnerWalletByMintAddress(
    mintAddress,
    wallet.publicKey,
    conn
  );

  if (nickle === null) {
    return false
  }

  if (nickle.balance < 1) {
    return false
  }

  return true

}
