import { doesStepHasSpecialException } from "../../utils/getSteps";
import { ScrollPhotoBoothLayersParams } from "../LayerStep/types";
import { LayerInBuilder, ScrollPhotoBoothReturnValues } from "../types";
import { checkLayerExceptions } from "./checkLayerExceptions";
import { getFilteredLayers } from "./filterLayersForCombine";
import { getLayerExceptionText } from "./getLayerExceptionText";
import { mergeImages } from "./mergeImages";
import { mergeImageWithException } from "./mergeImagesWithException";

export async function selectAndMergeLayer({
  layerIndex,
  allStepLayers,
  layersToCombine,
  step,
  selectedLayersOnStep,
}: ScrollPhotoBoothLayersParams): Promise<ScrollPhotoBoothReturnValues> {
  const currentLayer = { ...allStepLayers[layerIndex] };
  currentLayer.selected = true;

  /* Checks for exception and build the final selected image */

  let reversedKey: string | null = null;

  const filteredLayers = getFilteredLayers(step, selectedLayersOnStep);

  const exceptions = checkLayerExceptions(filteredLayers, currentLayer);

  if (exceptions.length > 0 || doesStepHasSpecialException(step)) {
    const mergedImage = await mergeImageWithException(
      exceptions,
      currentLayer,
      filteredLayers
    );
    currentLayer.image = mergedImage.resultingImage;
    currentLayer.exception = getLayerExceptionText(
      exceptions,
      currentLayer.name
    );
    reversedKey = mergedImage.reversedLayerKey;
  } else {
    const mergedImage = await mergeImages(
      getLayerToCombine(layersToCombine, step - 1),
      currentLayer
    );
    currentLayer.image = mergedImage;
  }

  return {
    combinedLayer: currentLayer,
    stepLayer: allStepLayers[layerIndex],
    reversedKey,
  };
}

function getLayerToCombine(
  layers: LayerInBuilder[],
  index: number
): LayerInBuilder | null {
  if (index === -1) return null;
  if (layers[index].skipped) return getLayerToCombine(layers, index - 1);
  return layers[index];
}
