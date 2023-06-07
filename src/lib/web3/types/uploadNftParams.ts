import { WalletContextState } from "@solana/wallet-adapter-react";
import { PhotoBoothFormInputs } from "components/Forge/Identity/Form/types";
import { LayerInBuilder } from "components/Forge/Identity/PhotoBooth/LayerBuilder/types";
import { Dispatch, SetStateAction } from "react";

export interface UploadNftParams {
  selectedLayers: LayerInBuilder[];
  resultingLayer: LayerInBuilder;
  formResult: PhotoBoothFormInputs;
  leaderWalletAddress: string;
  wallet: WalletContextState;
  parentNftAddress: string;
  seniority: number;
  updateMessage: Dispatch<SetStateAction<string>>;
}
