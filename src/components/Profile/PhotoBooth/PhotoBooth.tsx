import { joiResolver } from "@hookform/resolvers/joi";
import * as Sentry from "@sentry/nextjs";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import InfoIcon from "@mui/icons-material/Info";
import { useWallet } from "@solana/wallet-adapter-react";
import * as React from "react";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";
import { useAtom } from "jotai";

import { Pronouns } from "lib/models/user";
import { checkIfUsernameExists } from "lib/axios/requests/users/checkIfUsernameExists";
import { createUser } from "lib/axios/requests/users/saveUser";
import {
  combinedLayers,
  currentUser,
  finalCroppedImage,
  photoBoothStep,
  selectedLayerPerStep,
  selectedLeader,
} from "lib/store";
import useCheckMobileScreen from "lib/hooks/useCheckMobileScreen";
import { uploadNFT } from "lib/web3/fakeID/uploadNFT";
import { checkIfUserHasFakeID } from "lib/web3/fakeID/checkIfUserHasFakeID";
import { getPoolMintedCount } from "lib/web3/fakeID/getPoolMintedCount";
import { getWalletBalance } from "lib/web3/common/getWalletBalance";

import { schema } from "./validator";
import { PhotoBoothFormInputs } from "./types";
import { getStepsLength, getTotalStepsStartingFromOne } from "./utils/getSteps";

const PhotoBooth = () => {
  return <></>;
};

export default PhotoBooth;
