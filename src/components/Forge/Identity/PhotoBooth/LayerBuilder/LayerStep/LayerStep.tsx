import { Box, Typography } from "@mui/material";
import * as React from "react";
import { useAtom } from "jotai";
import Image from "next/image";

import {
  allStepLayers,
  combinedLayers,
  mergeInProcess,
  photoBoothStep,
  renderedSteps,
  selectedBodyType,
  selectedLayerIndexPerStep,
  selectedLayerPerStep,
  userSelectedLayerOnStep,
} from "lib/store";
import useCheckMobileScreen from "lib/hooks/useCheckMobileScreen";

import { getLayersForCurrentStep } from "../utils/getLayersForCurrentStep";
import {
  captionTextColor,
  layerWrapper,
  imageWrapper,
  imageStyle,
  layersContainer,
} from "./styles";
import { LayerStepProps } from "./types";
import { LayerInBuilder } from "../types";
import { selectAndMergeLayer } from "../utils/selectAndMergeLayer";

const LayerStep = ({ step }: LayerStepProps) => {
  const isMobile = useCheckMobileScreen();
  const [currentStep] = useAtom(photoBoothStep);
  const [selectedLayersOnStep, setSelectedLayerOnStep] =
    useAtom(selectedLayerPerStep);
  const [allCombinedLayers, setAllCombinedLayers] = useAtom(combinedLayers);
  const [selectedLayerIdx] = useAtom(selectedLayerIndexPerStep);
  const [__, setAllStepLayers] = useAtom(allStepLayers);
  const [___, setProcessingMerge] = useAtom(mergeInProcess);
  const [bodyType, setBodyType] = useAtom(selectedBodyType);
  const [stepsRendered, setStepsRendered] = useAtom(renderedSteps);
  const [____, setHasSelectedLayer] = useAtom(userSelectedLayerOnStep);

  const [allLayers, setAllLayers] = React.useState<LayerInBuilder[]>([]);

  const addLayerToSelectedOne = React.useCallback(
    (combinedLayer: LayerInBuilder, stepLayer: LayerInBuilder) => {
      if (currentStep === step) {
        if (step === 1) {
          if (stepLayer.type.includes("FEMALE")) {
            setBodyType(1);
          } else if (stepLayer.type.includes("MALE")) {
            setBodyType(0);
          }
        }

        setSelectedLayerOnStep(prevLayers => {
          const newLayers = [...prevLayers];
          if (!newLayers[currentStep]) newLayers.push(stepLayer);
          else newLayers[currentStep] = stepLayer;

          return newLayers;
        });

        setAllCombinedLayers(prevLayers => {
          const newLayers = [...prevLayers];
          if (!newLayers[currentStep]) newLayers.push(combinedLayer);
          else newLayers[currentStep] = combinedLayer;

          return newLayers;
        });
      }
    },
    // eslint-disable-next-line
    [currentStep, step]
  );

  const reverseLayerInStepByKey = React.useCallback((key: string | null) => {
    if (key) {
      setSelectedLayerOnStep(prev => {
        return [...prev].map(val => {
          if (val.key === key) {
            return { ...val, reverse: true };
          }

          return val;
        });
      });
    }
    // eslint-disable-next-line
  }, []);

  const selectLayer = React.useCallback(
    async (layerIndex: number) => {
      const { combinedLayer, stepLayer, reversedKey } =
        await selectAndMergeLayer({
          layerIndex,
          allStepLayers: allLayers,
          layersToCombine: allCombinedLayers,
          step,
          selectedLayersOnStep,
        });

      setHasSelectedLayer(true);
      reverseLayerInStepByKey(reversedKey);
      addLayerToSelectedOne(combinedLayer, stepLayer);
      setProcessingMerge(false);
    },
    // eslint-disable-next-line
    [currentStep, allLayers]
  );

  const getLayers = React.useCallback(async () => {
    setProcessingMerge(true);
    const { completeLayers } = await getLayersForCurrentStep({
      currentStep,
      bodyType,
    });

    setProcessingMerge(false);
    setAllLayers(completeLayers);
    setAllStepLayers(completeLayers);
    if (step === 0) setAllCombinedLayers([completeLayers[0]]);
    else
      setAllCombinedLayers(prevLayers => {
        const newLayers = [...prevLayers];
        newLayers.push(newLayers[newLayers.length - 1]);

        return newLayers;
      });

    // eslint-disable-next-line
  }, [
    currentStep,
    isMobile,
    selectedLayersOnStep,
    allCombinedLayers,
    selectedLayerIdx,
    bodyType,
  ]);

  /*------------------------------*/

  // Checks if this layer step is the same as the current step
  // and also if this step has been rendered in order to fetch the layers and mark it as rendered
  React.useEffect(() => {
    if (currentStep === step && !stepsRendered[step]) {
      setStepsRendered(prev => {
        const newSteps = [...prev];
        newSteps[step] = true;
        return newSteps;
      });
      getLayers();
    }

    // eslint-disable-next-line
  }, [currentStep]);

  // Clear the state when this step is unmounted (User clicked the Go Back button)
  React.useEffect(() => {
    if (!stepsRendered[step]) {
      setAllLayers([]);
    }
    // eslint-disable-next-line
  }, [stepsRendered]);

  // Fills the store allStepLayers with all the layers of the current step
  // in order to be used in the parent component to scroll the carousel
  React.useEffect(() => {
    if (allLayers.length > 0 && step === currentStep) {
      setAllStepLayers(allLayers);

      if (allCombinedLayers.length > 0) {
        setAllCombinedLayers(prev => {
          const newLayers = [...prev];
          newLayers[newLayers.length - 1].skipped = false;

          return newLayers;
        });
      }
    }
    // eslint-disable-next-line
  }, [currentStep, allLayers]);

  /*------------------------------*/

  if (currentStep !== step) return <></>;

  return (
    <Box sx={layersContainer}>
      {allLayers.map((layer, index) => (
        <Box
          key={layer.key}
          sx={layerWrapper}
          onClick={() => selectLayer(index)}
        >
          <Box sx={imageWrapper(layer.selected)}>
            <Image
              key={`${layer.index}-${layer.name}`}
              alt={layer.name}
              src={layer.image}
              fill
              style={imageStyle}
            />
          </Box>
          <Typography sx={captionTextColor} variant="caption">
            {layer.name.split(".")[0]}
          </Typography>
          {/* <Typography sx={layerExceptionCaption} variant="caption"> */}
          {/* {layer.exception} */}
          {/* </Typography> */}
        </Box>
      ))}
    </Box>
  );
};

export default LayerStep;
