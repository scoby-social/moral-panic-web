import { Card, Box, Typography, TextField, Button } from "@mui/material";
import { useWallet } from "@solana/wallet-adapter-react";
import { mintWoodenNickel } from "lib/web3/woodenNickel/mintWoodenNickel";
import Image from "next/image";

import {
  supplyDescription,
  supplyMintInfoContainer,
  supplyQuotaContainer,
  supplyInfoItemWrapper,
  supplyInfoForm,
  supplyMintButtonContainer,
  supplyContainer,
  supplyImageContainer,
  supplyTitle,
  image,
} from "./styles";
import { SupplyCardProps } from "./types";

const SupplyCard = ({
  id,
  title,
  imageUrl,
  description,
  price,
  currency,
  author,
  locked,
}: SupplyCardProps) => {
  const wallet = useWallet();

  return (
    <Card sx={supplyContainer}>
      <Box sx={supplyImageContainer}>
        <Image src={imageUrl} style={image} fill alt={id} />
      </Box>

      <Box>
        <Typography sx={supplyTitle} variant="h3" color="primary">
          {title}
        </Typography>

        <Box sx={supplyDescription}>
          <Typography variant="subtitle2">{description}</Typography>

          <Typography variant="subtitle2" color="primary">
            {"Author"}
          </Typography>
          <Typography variant="subtitle2">{author}</Typography>
        </Box>

        <Box sx={supplyMintInfoContainer}>
          <Box sx={supplyQuotaContainer}>
            <Box sx={{ ...supplyInfoItemWrapper, marginBottom: "0.4vmax" }}>
              <Typography variant="subtitle2">
                <b>{"Quota:"}</b>
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{
                  textAlign: "center",
                  width: "100%",
                  borderBottom: "1px solid rgba(76, 76, 81, 0.3)",
                }}
              >
                10
              </Typography>
            </Box>

            <Box sx={supplyInfoItemWrapper}>
              <Typography variant="subtitle2">
                <b>{"Keep:"}</b>
              </Typography>
              <TextField
                variant="standard"
                type="number"
                value={7}
                sx={supplyInfoForm}
                size="small"
              />
            </Box>
          </Box>

          <Box sx={supplyMintButtonContainer}>
            <Button
              variant="contained"
              onClick={() => mintWoodenNickel(wallet, 10, "Elias")}
            >
              {"MINT"}
            </Button>
            {!locked && (
              <>
                <Typography variant="caption">
                  <b>Unit Cost: </b>
                  {price} {currency}
                </Typography>
                <Typography variant="caption">
                  <b>How Many: </b>9
                </Typography>
                <Typography variant="caption">
                  <b>Total Price: </b>0.10 USDC
                </Typography>
                <Typography variant="caption">
                  Plus a Small SOL transaction Fee
                </Typography>
              </>
            )}
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default SupplyCard;
