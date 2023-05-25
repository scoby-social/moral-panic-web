import { Box, Button, CircularProgress, Typography } from "@mui/material";
import * as React from "react";
import Image from "next/image";
import { useAtom } from "jotai";

import {
  allStepLayers,
  combinedLayers,
  currentWallet,
  finalCroppedImage,
  mergeInProcess,
  photoBoothStep,
  renderedSteps,
  selectedLayerIndexPerStep,
  selectedLayerPerStep,
  userSelectedLayerOnStep,
} from "lib/store";

import {
  actionButtonsWrapper,
  buttonStyles,
  circularProgress,
  imageContainer,
  imageStyle,
  imageWrapper,
  layerBuilderWrapper,
  layerCropSquare,
  layerExceptionCaption,
  layersContainer,
  layerWrapper,
  revertButton,
} from "./styles";
import { getIterableSteps, getStepsLength } from "../utils/getSteps";
import LayerStep from "./LayerStep/LayerStep";
import { cropImage } from "./utils/cropImage";

const LayerBuilder = () => {
  const maxStepNumber = getStepsLength();
  const [currentStep, setCurrentStep] = useAtom(photoBoothStep);
  const [processingMerge, setProcessingMerge] = useAtom(mergeInProcess);
  const [hasSelectedLayer, setHasSelectedLayer] = useAtom(
    userSelectedLayerOnStep
  );

  const [selectedLayerIdxPerStep, setSelectedLayerIdxPerStep] = useAtom(
    selectedLayerIndexPerStep
  );
  const [wallet] = useAtom(currentWallet);
  const [_, setStepsRendered] = useAtom(renderedSteps);
  const [allCombinedLayers, setAllCombinedLayers] = useAtom(combinedLayers);
  const [selectedLayerOnStep, setSelectedLayerOnStep] =
    useAtom(selectedLayerPerStep);
  const [croppedImage, setCroppedImage] = useAtom(finalCroppedImage);

  const changeStep = React.useCallback(
    (step: number) => {
      if (step < 0) return;

      setCurrentStep(step);
    },
    [setCurrentStep]
  );

  const returnOneStep = React.useCallback(() => {
    setStepsRendered(prev => {
      const newSteps = [...prev];
      newSteps[currentStep] = false;
      return newSteps;
    });

    setSelectedLayerOnStep(prevLayers => {
      return [...prevLayers].slice(0, -1);
    });

    setAllCombinedLayers(prevLayers => {
      return [...prevLayers].slice(0, -1);
    });

    setSelectedLayerIdxPerStep(prev => {
      const newValues = [...prev];
      newValues[currentStep] = 0;
      return newValues;
    });
    setCroppedImage(null);

    changeStep(currentStep - 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep, changeStep, allStepLayers, selectedLayerOnStep]);

  const goToNextStep = React.useCallback(() => {
    changeStep(currentStep + 1);
    setHasSelectedLayer(false);
    // eslint-disable-next-line
  }, [changeStep, currentStep]);

  const revertLayer = React.useCallback(() => {
    setSelectedLayerOnStep(prevLayers => {
      const newLayers = [...prevLayers];
      newLayers.pop();

      return newLayers;
    });

    setAllCombinedLayers(prevLayers => {
      const newLayers = [...prevLayers];
      newLayers[newLayers.length - 1] = newLayers[newLayers.length - 2];

      return newLayers;
    });

    setHasSelectedLayer(false);
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    if (currentStep > maxStepNumber) {
      (async () => {
        const image = await cropImage(allCombinedLayers[maxStepNumber].image);
        setCroppedImage(image);
      })();
    }
    // eslint-disable-next-line
  }, [currentStep]);

  React.useEffect(() => {
    setAllCombinedLayers([]);
    setSelectedLayerIdxPerStep([...getIterableSteps().map(() => 0)]);
    setSelectedLayerOnStep([]);
    setStepsRendered([...getIterableSteps().map(() => false)]);
    setProcessingMerge(false);
    setCurrentStep(0);
    setCroppedImage(null);
    // eslint-disable-next-line
  }, [wallet]);

  return (
    <Box sx={layerBuilderWrapper}>
      {currentStep > maxStepNumber && croppedImage && (
        <Box sx={layerWrapper}>
          <Box sx={imageWrapper}>
            <Image
              alt={allCombinedLayers[maxStepNumber].name}
              src={croppedImage}
              fill
              style={imageStyle}
            />
          </Box>
        </Box>
      )}
      <Box sx={imageContainer}>
        <Box sx={imageWrapper}>
          {currentStep <= maxStepNumber && allCombinedLayers[currentStep] && (
            <>
              {currentStep > 0 && (hasSelectedLayer || currentStep > 1) && (
                <Box sx={layerCropSquare} />
              )}
              <Image
                alt={allCombinedLayers[currentStep].name}
                src={allCombinedLayers[currentStep].image}
                fill
                style={imageStyle}
              />
            </>
          )}
        </Box>
        {allCombinedLayers[currentStep]?.exception && (
          <Typography variant="caption" sx={layerExceptionCaption}>
            {allCombinedLayers[currentStep].exception}
          </Typography>
        )}
      </Box>
      <Box sx={actionButtonsWrapper}>
        <Button
          onClick={returnOneStep}
          disabled={currentStep === 0 || processingMerge}
          variant="contained"
          color="secondary"
          sx={buttonStyles}
        >
          <Typography variant="caption">{"Go Back"}</Typography>
        </Button>

        {currentStep > 1 && currentStep <= maxStepNumber && (
          <Button
            onClick={revertLayer}
            disabled={currentStep === 0 || processingMerge || !hasSelectedLayer}
            variant="outlined"
            color="secondary"
            sx={revertButton}
          >
            <Typography variant="caption" sx={{ color: "#BEEF00" }}>
              {"Revert"}
            </Typography>
          </Button>
        )}

        <Button
          disabled={
            processingMerge ||
            currentStep > maxStepNumber ||
            (currentStep === 1 && !hasSelectedLayer)
          }
          onClick={goToNextStep}
          variant="contained"
          color="secondary"
          sx={buttonStyles}
        >
          {processingMerge ? (
            <CircularProgress sx={circularProgress} />
          ) : (
            <Typography variant="caption">{"Next Trait"}</Typography>
          )}
        </Button>
      </Box>

      <Box sx={layersContainer}>
        {getIterableSteps().map(val => (
          <LayerStep key={val} step={val} />
        ))}
      </Box>
    </Box>
  );
};

export default LayerBuilder;
