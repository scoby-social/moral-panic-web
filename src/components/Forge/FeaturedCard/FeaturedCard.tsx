import {
  Box,
  Button,
  Card,
  Typography,
  TextField,
  CircularProgress,
  Badge,
  Link,
} from "@mui/material";
import { useWallet } from "@solana/wallet-adapter-react";
import * as React from "react";
import { useAtom } from "jotai";
import Image from "next/image";

import { mintWoodenNickel } from "lib/web3/woodenNickel/mintWoodenNickel";
import { woodenNickelAddress, woodenNickelCurrentQuota } from "lib/store/forge";
import { currentUser, userHasNoID } from "lib/store";
import useCheckMobileScreen from "lib/hooks/useCheckMobileScreen";

import {
  image,
  featuredCardStyles,
  featuredImageWrapper,
  featuredImageContainer,
  featuredCardMetadata,
  featuredCardActionsContainer,
  featuredFormContainer,
  supplyInfoItemWrapper,
  supplyInfoForm,
  mintButtonContainer,
  featuredCardActionsWrapper,
  resultText,
} from "./styles";
import { FeaturedCardProps } from "./types";

const FeaturedCard = ({
  title,
  description,
  imageUrl,
  fetchInfo,
}: FeaturedCardProps) => {
  const wallet = useWallet();
  const isMobile = useCheckMobileScreen();
  const [minting, setMinting] = React.useState(false);
  const [result, setResult] = React.useState({
    success: false,
    message: "",
    link: "",
  });
  const [keep, setKeep] = React.useState(0);
  const [formError, setFormError] = React.useState(false);
  const [user] = useAtom(currentUser);
  const [woodenNickel] = useAtom(woodenNickelAddress);
  const [woodenNickelQuota] = useAtom(woodenNickelCurrentQuota);
  const [missingID] = useAtom(userHasNoID);

  const maxAvailable = woodenNickelQuota
    ? woodenNickelQuota.upTo - woodenNickelQuota.minted
    : 10;

  const mint = async () => {
    if (keep <= 0) {
      setFormError(true);
      return;
    }

    if (maxAvailable <= 0) return;

    try {
      setResult({ success: false, message: "", link: "" });
      setMinting(true);

      await mintWoodenNickel({
        wallet,
        keep,
        username: user.username,
        woodenNickel,
        seniority: user.seniority,
        fullName: `${user.username} the ${user.amplifierRole} ${user.superpowerRole}`,
        fakeID: user.fakeID,
      });
      setResult({
        success: true,
        message: "Congrats! You have minted your token successfully",
        link: "",
      });
      setMinting(false);
      fetchInfo();
    } catch (_) {
      setResult({
        success: false,
        message:
          "I dunno why, but the machines elves f*cked up your trade, Try again later.",
        link: "",
      });
      setMinting(false);
    }
  };

  React.useEffect(() => {
    if (missingID) {
      setResult({
        success: false,
        message:
          "Sorry bud, but you need a Fake ID to mint a Wooden Nickel! Forge one here or go 'n fetch one at ",
        link: "hellbenders.world",
      });
    } else {
      setResult({ success: false, message: "", link: "" });
    }
  }, [missingID]);

  React.useEffect(() => {
    setKeep(maxAvailable);
  }, [maxAvailable]);

  return (
    <Card sx={featuredCardStyles}>
      <Box sx={featuredImageWrapper}>
        <Box sx={featuredImageContainer}>
          <Image src={imageUrl} style={image} fill alt="Wooden Nickel" />
        </Box>
      </Box>
      <Box>
        <Box>
          <Typography variant="h3" color="primary" sx={{ margin: "0.8vmax 0" }}>
            {title}
          </Typography>
          <Typography variant="h6" color="#848484">
            Guidance
          </Typography>
          <Typography variant="subtitle2" sx={{ whiteSpace: "pre-wrap" }}>
            {description}
          </Typography>

          <Box sx={featuredCardMetadata}>
            <Box sx={featuredCardActionsContainer}>
              <Box sx={featuredCardActionsWrapper}>
                <Box sx={featuredFormContainer}>
                  <Box sx={supplyInfoItemWrapper}>
                    <Typography
                      sx={{
                        color: missingID ? "rgba(217, 217, 217, 0.20)" : "#FFF",
                      }}
                      variant="subtitle2"
                    >
                      <b>{"Keep: "}</b>
                    </Typography>
                    <TextField
                      variant="standard"
                      type="number"
                      value={keep}
                      disabled={missingID}
                      error={formError}
                      onChange={e => {
                        const value = Number(e.target.value);
                        if (Number.isNaN(value)) {
                          return;
                        }
                        if (Number(value) < 0) return;
                        setFormError(false);
                        setKeep(value > maxAvailable ? maxAvailable : value);
                      }}
                      sx={supplyInfoForm}
                      size="small"
                    />
                  </Box>

                  <Box
                    sx={{
                      ...supplyInfoItemWrapper,
                      marginTop: "0.4vmax",
                    }}
                  >
                    <Typography variant="subtitle2">
                      <b>{"Quota:"}</b>
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        textAlign: "center",
                        width: "50%",
                      }}
                    >
                      {maxAvailable}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      ...supplyInfoItemWrapper,
                      marginTop: "0.4vmax",
                    }}
                  >
                    <Typography variant="subtitle2">
                      <b>{"Unit Cost:"}</b>
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        textAlign: "center",
                        width: "50%",
                      }}
                    >
                      {0.01} USDC
                    </Typography>
                  </Box>
                </Box>
                <Box sx={mintButtonContainer}>
                  {missingID ? (
                    <Badge
                      badgeContent={
                        <Image
                          src={
                            "https://storage.googleapis.com/hellbenders-public-c095b-assets/hellbendersWebAssets/lock.svg"
                          }
                          alt="lock"
                          width={isMobile ? 20 : 40}
                          height={isMobile ? 20 : 40}
                        />
                      }
                    >
                      <Button variant="contained" disabled={missingID}>
                        MINT
                      </Button>
                    </Badge>
                  ) : (
                    <Button
                      variant="contained"
                      disabled={maxAvailable === 0 || minting}
                      onClick={mint}
                      sx={{
                        backgroundImage:
                          "https://storage.googleapis.com/hellbenders-public-c095b-assets/hellbendersWebAssets/button.svg",
                      }}
                    >
                      {minting ? <CircularProgress /> : "MINT"}
                    </Button>
                  )}
                  <Typography variant="caption">
                    <b>Total: </b>
                    {keep * 0.01} USDC
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "0.5vmax !important",
                      lineHeight: "0.5 !important",
                    }}
                    variant="caption"
                  >
                    Plus a small SOL transaction Fee
                  </Typography>
                </Box>
              </Box>
              {result && (
                <Box sx={{ display: "flex" }}>
                  <Typography
                    variant="subtitle2"
                    sx={resultText}
                    color={result.success ? "primary" : "#FF710B"}
                  >
                    {result.message}
                    {result.link && (
                      <Link
                        color="#FF710B"
                        sx={resultText}
                        href={"https://hellbenders.world"}
                        target="_blank"
                      >
                        hellbenders.world
                      </Link>
                    )}
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default FeaturedCard;
