import * as anchor from "@project-serum/anchor";

import { NftInMarketplace } from "../types/NftInMarketplace";
import { getProvider } from "lib/helpers/getProvider";
import { Connection } from "@solana/web3.js";
import { PublicKey } from "@metaplex-foundation/js";
import { makeATokenAccountTransaction } from "lib/helpers/makeATokenAccountTransaction";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { SequenceType, sendTransactions } from "lib/helpers/sol/connection";

export const buyNftInMarket = async (
  wallet: any,
  nft: NftInMarketplace,
  connection: Connection,
  IDL: any,
  PROGRAM_ID: String,
  amount: number,
  REWARD_TOKEN: string
) => {
  try {
    const instructionSet: any[] = [],
      signerSet: any[] = [];
    let instructions: any[] = [],
      signers: any[] = [];

    const provider = getProvider(connection, wallet!);
    const program = new anchor.Program(
      IDL,
      new PublicKey(PROGRAM_ID),
      provider
    );

    let [vaultPDA] = await anchor.web3.PublicKey.findProgramAddress(
      [Buffer.from("rewards vault")],
      program.programId
    );

    let [listNftPDA] = await anchor.web3.PublicKey.findProgramAddress(
      [Buffer.from("list nft"), new PublicKey(nft.mint).toBuffer()],
      program.programId
    );

    const nftFromTx = await makeATokenAccountTransaction(
      connection,
      wallet!.publicKey,
      vaultPDA,
      new PublicKey(nft.mint)
    );
    if (nftFromTx.instructions.length > 0) {
      return;
    }

    const nftToAtaTx = await makeATokenAccountTransaction(
      connection,
      wallet!.publicKey,
      wallet!.publicKey,
      new PublicKey(nft.mint)
    );

    const tokenFromTx = await makeATokenAccountTransaction(
      connection,
      wallet!.publicKey,
      wallet!.publicKey,
      new PublicKey(REWARD_TOKEN)
    );
    if (tokenFromTx.instructions.length > 0) {
      return;
    }
    const tokenToAtaTx = await makeATokenAccountTransaction(
      connection,
      wallet!.publicKey,
      nft.owner,
      new PublicKey(REWARD_TOKEN)
    );
    instructions = [
      ...instructions,
      ...nftToAtaTx.instructions,
      ...tokenToAtaTx.instructions,
    ];
    signers = [...signers, ...nftToAtaTx.signers, ...tokenToAtaTx.signers];

    instructions.push(
      program.instruction.buy(amount, {
        accounts: {
          vault: vaultPDA,
          listNft: listNftPDA,
          buyer: wallet!.publicKey,
          mint: new PublicKey(nft.mint),
          nftFrom: nftFromTx.tokenTo,
          nftTo: nftToAtaTx.tokenTo,
          tokenFrom: tokenFromTx.tokenTo,
          tokenTo: tokenToAtaTx.tokenTo,
          tokenMint: new PublicKey(REWARD_TOKEN),
          tokenProgram: TOKEN_PROGRAM_ID,
        },
      })
    );

    instructionSet.push(instructions);
    signerSet.push(signers);
    const response = await sendTransactions(
      connection,
      wallet,
      instructionSet,
      signerSet,
      SequenceType.StopOnFailure
    );

    return response.success;
  } catch (error) {
    console.error(error);
  }
};
