import { LayerType } from "lib/models/layer";
import { LayerInBuilder, MergeImageWithExceptionReturnValues } from "../types";
import { checkAndFilterExceptionsInBuildedLayers } from "./checkAndFilterExceptionsInBuildedLayers";
import { convertToBlob } from "./convertToBlob";

export async function mergeImageWithException(
  exceptions: Array<LayerInBuilder | null>,
  selectedLayer: LayerInBuilder,
  buildedLayers: LayerInBuilder[]
): Promise<MergeImageWithExceptionReturnValues> {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  canvas.width = 512;
  canvas.height = 512;

  const { firstLayers, pendingLayers, filteredLayers, reversedLayerKey } =
    checkAndFilterExceptionsInBuildedLayers(buildedLayers, exceptions);

  if (
    [
      LayerType.MALE_SHIRT,
      LayerType.FEMALE_TOP,
      LayerType.MALE_JACKET,
      LayerType.FEMALE_JACKET,
      LayerType.ACCESORY,
    ].includes(selectedLayer.type)
  ) {
    firstLayers.push(selectedLayer);
  }

  for await (const layer of firstLayers) {
    if (layer.standard) continue;
    const layerToCombine = await (await fetch(layer.image)).blob();
    const layerBitmap = await createImageBitmap(layerToCombine);

    context?.drawImage(
      layerBitmap,
      0,
      0,
      layerBitmap.width,
      layerBitmap.height
    );
  }

  for await (const layer of filteredLayers) {
    if (layer.standard) continue;
    const layerToCombine = await (await fetch(layer.image)).blob();
    const layerBitmap = await createImageBitmap(layerToCombine);

    context?.drawImage(
      layerBitmap,
      0,
      0,
      layerBitmap.width,
      layerBitmap.height
    );
  }

  if (
    ![
      LayerType.MALE_SHIRT,
      LayerType.FEMALE_TOP,
      LayerType.MALE_JACKET,
      LayerType.FEMALE_JACKET,
      LayerType.ACCESORY,
    ].includes(selectedLayer.type)
  ) {
    const selectedLayerBlob = await (await fetch(selectedLayer.image)).blob();
    const selectedLayerBitmap = await createImageBitmap(selectedLayerBlob);

    context?.drawImage(
      selectedLayerBitmap,
      0,
      0,
      selectedLayerBitmap.width,
      selectedLayerBitmap.height
    );
  }

  for await (const pendingLayer of pendingLayers) {
    if (pendingLayer.standard) continue;
    const layerToCombine = await (await fetch(pendingLayer.image)).blob();
    const layerBitmap = await createImageBitmap(layerToCombine);

    context?.drawImage(
      layerBitmap,
      0,
      0,
      layerBitmap.width,
      layerBitmap.height
    );
  }

  const canvasBlob = await convertToBlob(canvas);

  return { resultingImage: URL.createObjectURL(canvasBlob), reversedLayerKey };
}
