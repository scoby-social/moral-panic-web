import { Connection, PublicKey, SystemProgram } from "@solana/web3.js";

import * as anchor from "@project-serum/anchor";

import { NftToList } from "../types/nftToList";
import { getProvider } from "lib/helpers/getProvider";
import { TOKEN_PROGRAM_ID, getAssociatedTokenAddress } from "@solana/spl-token";
import { makeATokenAccountTransaction } from "lib/helpers/makeATokenAccountTransaction";
import { SequenceType, sendTransactions } from "lib/helpers/sol/connection";
import { getWoodenNickelAddress } from "lib/axios/requests/woodenNickel/getWoodenNickelAddress";

export const listNftToSell = async (
  nft: NftToList,
  userWallet: any,
  connection: Connection,
  IDL: any,
  PROGRAM_ID: string,
  REWARD_TOKEN_DECIMAL: number,
  amount: number
) => {
  try {
    const userWalletString = userWallet?.publicKey.toString() as string;

    const getWNAddress = await getWoodenNickelAddress(userWalletString);

    if (nft.mint !== getWNAddress) {
      //!Error message
      return false;
    }
    const instructionSet: any[] = [],
      signerSet: any[] = [];
    let instructions: any[] = [],
      signers: any[] = [];

    const provider = getProvider(connection, userWallet!);
    const program = new anchor.Program(
      IDL,
      new PublicKey(PROGRAM_ID),
      provider
    );

    let priceHigh = 0;
    let priceLow = 0.001 * REWARD_TOKEN_DECIMAL;

    let [vaultPDA] = await anchor.web3.PublicKey.findProgramAddress(
      [Buffer.from("rewards vault")],
      program.programId
    );

    let [listNftPDA, bump] = await anchor.web3.PublicKey.findProgramAddress(
      [Buffer.from("list nft"), new PublicKey(nft.mint).toBuffer()],
      program.programId
    );
    const holderPdaInfo = await connection.getAccountInfo(listNftPDA);
    const nftFrom = await getAssociatedTokenAddress(
      new PublicKey(nft.mint),
      userWallet!.publicKey!
    );
    const nftToAtaTx = await makeATokenAccountTransaction(
      connection,
      userWallet!.publicKey,
      new PublicKey(vaultPDA),
      new PublicKey(nft.mint)
    );

    if (nftToAtaTx.instructions.length > 0) {
      instructions = nftToAtaTx.instructions;
      signers = nftToAtaTx.signers;
    }
    if (!holderPdaInfo) {
      instructions.push(
        program.instruction.createList(priceHigh, priceLow, amount, bump, {
          accounts: {
            listNft: listNftPDA,
            admin: new PublicKey(userWallet!.publicKey),
            vault: vaultPDA,
            mint: new PublicKey(nft.mint),
            nftFrom: nftFrom,
            nftTo: nftToAtaTx.tokenTo,
            tokenProgram: TOKEN_PROGRAM_ID,
            systemProgram: SystemProgram.programId,
          },
        })
      );
    } else {
      instructions.push(
        program.instruction.list(priceHigh, priceLow, amount, bump, {
          accounts: {
            listNft: listNftPDA,
            admin: new PublicKey(userWallet!.publicKey),
            vault: vaultPDA,
            mint: new PublicKey(nft.mint),
            nftFrom: nftFrom,
            nftTo: nftToAtaTx.tokenTo,
            tokenProgram: TOKEN_PROGRAM_ID,
            systemProgram: SystemProgram.programId,
          },
        })
      );
    }
    instructionSet.push(instructions);
    signerSet.push(signers);
    await sendTransactions(
      connection,
      userWallet,
      instructionSet,
      signerSet,
      SequenceType.StopOnFailure
    );

    //* success
    return true;
  } catch (error) {
    console.error("error", error);
  }
};
