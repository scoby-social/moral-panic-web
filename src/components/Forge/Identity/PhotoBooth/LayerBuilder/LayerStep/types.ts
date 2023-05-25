import { LayerInBuilder } from "../types";

export interface LayerStepProps {
  step: number;
}

export interface GetLayersForCurrentStepParams {
  currentStep: number;
  bodyType: number;
}

export interface ScrollPhotoBoothLayersParams {
  layerIndex: number;
  allStepLayers: LayerInBuilder[];
  layersToCombine: LayerInBuilder[];
  step: number;
  selectedLayersOnStep: LayerInBuilder[];
}
