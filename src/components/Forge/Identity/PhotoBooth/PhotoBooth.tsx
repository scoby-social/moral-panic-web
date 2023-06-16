import { Box, Typography, Button, CircularProgress } from "@mui/material";
import ArrowBackIos from "@mui/icons-material/ArrowBackIos";
import { useWallet } from "@solana/wallet-adapter-react";
import * as Sentry from "@sentry/nextjs";
import {
  resolveToWalletAddress,
  getParsedNftAccountsByOwner,
} from "@nfteyez/sol-rayz";
import { Connection } from "@solana/web3.js";
import * as React from "react";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";

import { getPoolMintedCount } from "lib/web3/fakeID/getPoolMintedCount";
import {
  combinedLayers,
  finalCroppedImage,
  formValues,
  photoBoothStep,
  selectedLayerPerStep,
} from "lib/store";
import { checkIfUserHasFakeID } from "lib/web3/fakeID/checkIfUserHasFakeID";
import { createUser } from "lib/axios/requests/users/saveUser";
import { woodenNickelAddress } from "lib/store/forge";
import { getWoodenNickelFakeIDInfo } from "lib/axios/requests/woodenNickel/getWoodenNickelFakeIDInfo";
import { updateWoodenNickelByFakeIDMint } from "lib/axios/requests/woodenNickel/updateWoodenNickelByFakeIDMint";

import {
  photoBoothContainer,
  photoBoothTitleWrapper,
  photoBoothFooterWrapper,
  mintButtonWrapper,
  mintButton,
  circularProgress,
  mintingMessageWrapper,
  mintingMessage,
  availabilityContainer,
  availabilityWrapper,
  availabilityDescription,
  container,
  headerWrapper,
  buttonStyles,
  forgeBackButtonWrapper,
  wrapper,
  photoBoothWrapper,
} from "./styles";
import { getStepsLength, getTotalStepsStartingFromOne } from "./utils/getSteps";
import { uploadNFT } from "lib/web3/fakeID/uploadNFT";
import LayerBuilder from "./LayerBuilder/LayerBuilder";

const PhotoBooth = ({
  setFormFilled,
}: {
  setFormFilled: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [currentStep] = useAtom(photoBoothStep);
  const [values] = useAtom(formValues);
  const [allCombinedLayers] = useAtom(combinedLayers);
  const [selectedLayers] = useAtom(selectedLayerPerStep);
  const [croppedImage] = useAtom(finalCroppedImage);
  const [woodenNickel, setWoodenNickel] = useAtom(woodenNickelAddress);

  const maxStepNumber = getStepsLength();
  const totalSteps = getTotalStepsStartingFromOne();
  const wallet = useWallet();
  const router = useRouter();

  const [message, setMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [mintedCount, setMintedCount] = React.useState(0);

  const getStepTitle = React.useCallback(() => {
    if (currentStep > maxStepNumber) return "Last Trait";

    return `Trait ${currentStep + 1} of ${totalSteps}`;
    // eslint-disable-next-line
  }, [currentStep]);

  React.useEffect(() => {
    (async () => {
      if (wallet.publicKey) {
        const count = await getPoolMintedCount(wallet);
        setMintedCount(count);
      }
    })();
    // eslint-disable-next-line
  }, [wallet]);

  const getWnAddressInWallet = React.useCallback(async () => {
    if (!wallet.publicKey) return;
    const connection = new Connection(
      process.env.NEXT_PUBLIC_HELIUS_SOLANA_CLUSTER!
    );

    const publicAddress = await resolveToWalletAddress({
      text: wallet.publicKey.toString(),
    });
    const nftArray = await getParsedNftAccountsByOwner({
      publicAddress,
      connection,
    });

    const wn = nftArray.find(val => val.data.symbol === "NICKEL");

    setWoodenNickel(wn?.mint || "");

    // eslint-disable-next-line
  }, [wallet.publicKey]);

  React.useEffect(() => {
    if (!woodenNickel) getWnAddressInWallet();

    // eslint-disable-next-line
  }, [wallet.publicKey]);

  const createIdentity = async () => {
    try {
      const parentData = await getWoodenNickelFakeIDInfo(woodenNickel!);

      setMessage("");
      setLoading(true);

      const bio = values.bio;
      bio.replace(/"/g, '\\"');
      bio.replace(/'/g, "\\'");

      const resultingLayer = {
        ...allCombinedLayers[allCombinedLayers.length - 1],
      };
      resultingLayer.image = croppedImage!;

      setMessage(
        "Please be patient while our machine elves forge your Fake ID."
      );

      const userHasFakeID = await checkIfUserHasFakeID(wallet);

      if (userHasFakeID) {
        setMessage("This wallet already has a FakeID");
        setLoading(false);
        return;
      }

      const res = await uploadNFT({
        selectedLayers,
        resultingLayer,
        formResult: { ...values, bio },
        leaderWalletAddress: parentData.wallet,
        parentNftAddress: parentData.fakeID,
        wallet,
        seniority: 0,
        updateMessage: setMessage,
        woodenNickel: woodenNickel!,
      });

      await createUser(
        {
          ...values,
          bio,
          wallet: wallet.publicKey!.toString(),
          avatar: res.image,
          fakeID: res.nftAddress,
        },
        parentData.fakeID,
        res.metadataUrl
      );

      setLoading(false);
      setMessage(
        "Congrats! Your Fake ID has been minted. You'll be redirected to The Forge shortly."
      );
      setTimeout(() => {
        router.back();
      }, 3000);
      updateWoodenNickelByFakeIDMint(woodenNickel!);
    } catch (err) {
      setMessage(
        "I dunno why, but the machine elves f*cked up your mint. Try again later."
      );
      console.error(err);
      Sentry.captureException(err);
      setLoading(false);
    }
  };

  return (
    <Box sx={container}>
      <Box sx={wrapper}>
        <Box sx={forgeBackButtonWrapper} onClick={() => router.back()}>
          <ArrowBackIos sx={{ fill: "#8D8D8D" }} />
          <Typography variant="h3">{"THE FORGE"}</Typography>
        </Box>
        <Box sx={photoBoothWrapper}>
          <Box sx={headerWrapper}>
            <Button
              sx={buttonStyles}
              onClick={() => setFormFilled(false)}
              variant="contained"
            >
              <Typography variant="caption">
                {"Back to Change your Identity"}
              </Typography>
            </Button>
            <Typography variant="h6" sx={{ alignSelf: "center" }}>
              {"Photobooth"}
            </Typography>
            <Box sx={{ width: "15%" }}></Box>
          </Box>
          <Box sx={photoBoothContainer}>
            <Box sx={photoBoothTitleWrapper}>
              <Typography variant="subtitle2">
                Take your Fake ID Photo<sup>*</sup>
              </Typography>
              <Typography variant="subtitle2">{getStepTitle()}</Typography>
            </Box>
            <LayerBuilder />
          </Box>
          <Box sx={photoBoothFooterWrapper}>
            <Box sx={mintButtonWrapper}>
              <Button
                disabled={loading || currentStep <= maxStepNumber}
                color="primary"
                variant="contained"
                onClick={createIdentity}
                sx={mintButton}
              >
                {loading ? (
                  <CircularProgress sx={circularProgress} />
                ) : (
                  <Typography variant="subtitle2">{"Mint"}</Typography>
                )}
              </Button>
            </Box>
            {message && (
              <Box sx={mintingMessageWrapper}>
                <Typography sx={mintingMessage} variant="subtitle2">
                  {message}
                </Typography>
              </Box>
            )}
            <Box sx={availabilityContainer}>
              <Box sx={availabilityWrapper}>
                <Typography variant={"subtitle1"} sx={availabilityDescription}>
                  {"ID's minted"}
                </Typography>
                <Typography variant={"subtitle1"} sx={availabilityDescription}>
                  {mintedCount}
                </Typography>
              </Box>
              <Box sx={availabilityWrapper}>
                <Typography variant={"subtitle1"} sx={availabilityDescription}>
                  Price
                </Typography>
                <Typography variant={"subtitle1"} sx={availabilityDescription}>
                  6.66 USDC
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PhotoBooth;
