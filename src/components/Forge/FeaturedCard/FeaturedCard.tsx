import {
  Box,
  Button,
  Card,
  Typography,
  TextField,
  CircularProgress,
} from "@mui/material";
import { useWallet } from "@solana/wallet-adapter-react";
import * as React from "react";
import { useAtom } from "jotai";
import Image from "next/image";
import Link from "next/link";

import { mintWoodenNickel } from "lib/web3/woodenNickel/mintWoodenNickel";
import { woodenNickelAddress, woodenNickelCurrentQuota } from "lib/store/forge";
import { currentUser } from "lib/store";

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
} from "./styles";
import { FeaturedCardProps } from "./types";

const FeaturedCard = ({
  title,
  description,
  imageUrl,
  metadata,
  fetchInfo,
}: FeaturedCardProps) => {
  const wallet = useWallet();
  const [minting, setMinting] = React.useState(false);
  const [result, setResult] = React.useState({ success: false, message: "" });
  const [keep, setKeep] = React.useState(0);
  const [formError, setFormError] = React.useState(false);
  const [user] = useAtom(currentUser);
  const [woodenNickel] = useAtom(woodenNickelAddress);
  const [woodenNickelQuota] = useAtom(woodenNickelCurrentQuota);

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
      setResult({ success: false, message: "" });
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
      });
      setMinting(false);
      fetchInfo();
    } catch (_) {
      setResult({
        success: false,
        message:
          "I dunno why, but the machines elves f*cked up your trade, Try again later.",
      });
      setMinting(false);
    }
  };

  return (
    <Card sx={featuredCardStyles}>
      <Box sx={featuredImageWrapper}>
        <Box sx={featuredImageContainer}>
          <Image src={imageUrl} style={image} fill alt="Wooden Nickel" />
        </Box>
      </Box>
      <Box>
        <Box>
          <Typography variant="h3" color="primary">
            {title}
          </Typography>
          <Typography variant="h6" color="primary">
            Guidance
          </Typography>
          <Typography variant="subtitle2">{description}</Typography>

          <Box sx={featuredCardMetadata}>
            {metadata.map((value, index) => (
              <Box key={index}>
                <Typography variant="subtitle2" color="primary">
                  {value.title}
                </Typography>
                {value.link ? (
                  <Link href={value.description} target="_blank">
                    <Typography variant="subtitle2">
                      {value.description}
                    </Typography>
                  </Link>
                ) : (
                  <Typography variant="subtitle2">
                    {value.description}
                  </Typography>
                )}
              </Box>
            ))}

            <Box sx={featuredCardActionsContainer}>
              <Box sx={featuredFormContainer}>
                <Box sx={supplyInfoItemWrapper}>
                  <Typography variant="subtitle2">
                    <b>{"Keep: "}</b>
                  </Typography>
                  <TextField
                    variant="standard"
                    type="number"
                    value={keep > maxAvailable ? maxAvailable : keep}
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
                    {0.01}
                  </Typography>
                </Box>
              </Box>
              <Box sx={mintButtonContainer}>
                <Button
                  variant="contained"
                  disabled={maxAvailable === 0 || minting}
                  onClick={mint}
                >
                  {minting ? <CircularProgress /> : "MINT"}
                </Button>
                <Typography variant="caption">
                  <b>Total: </b>
                  {keep * 0.01}
                </Typography>
                {!woodenNickel && (
                  <Typography
                    sx={{ fontSize: "0.5vmax !important" }}
                    variant="caption"
                  >
                    Plus a small SOL transaction Fee
                  </Typography>
                )}
              </Box>
            </Box>
            {result && (
              <Typography
                variant="subtitle2"
                color={result.success ? "primary" : "#FF710B"}
              >
                {result.message}
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default FeaturedCard;
