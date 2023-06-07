import { getLayersByType } from "lib/axios/requests/layers/getLayers";
import { nanoid } from "nanoid";
import { GetLayersForCurrentStepParams } from "../LayerStep/types";
import { GetAllLayersForCurrentStepReturnValues } from "../types";

export async function getLayersForCurrentStep({
  currentStep,
  bodyType,
}: GetLayersForCurrentStepParams): Promise<GetAllLayersForCurrentStepReturnValues> {
  const layers = await getLayersByType(currentStep, bodyType);

  const completeLayers = layers.map((val, index) => ({
    ...val,
    selected: false,
    index,
    key: nanoid(),
    exception: "",
    reverse: false,
    skipped: false,
    standard: false,
  }));

  const layersWithBlobImages = await Promise.all(
    completeLayers.map(async val => ({
      ...val,
      image: URL.createObjectURL(await (await fetch(val.image)).blob()),
    }))
  );

  return {
    completeLayers: layersWithBlobImages,
  };
}
