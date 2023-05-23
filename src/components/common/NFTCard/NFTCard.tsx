import styled from "@emotion/styled";
import Image from "next/image";
import React, { FC } from "react";

import { Box, Typography } from "@mui/material";
import { NFTCardProps } from "./types";

import {
  firstPropertiesNft,
  lastPropertiesNft,
  nftCard,
  nftInformation,
  nftPropertie,
  nftTitle,
  priceText,
  propertieItem,
  propertiesContainer,
  textStyle,
} from "./styles";
import { CustomButton } from "../CustomButton/CustomButton";

const NftImage = styled(Image)`
  width: 100%;
  height: auto;
  @media (min-width: 767px) {
    min-width: 50%;
  }
`;

const NFTCard: FC<NFTCardProps> = ({
  name,
  symbol,
  description,
  image,
  external_url,
  minter,
  seniority,
  creators,
}) => {
  return (
    <Box sx={nftCard}>
      <NftImage src={image} alt="rose" width={100} height={100} />

      <Box sx={nftInformation}>
        <Typography variant="h2" sx={nftTitle}>
          {name}
        </Typography>

        {/*         <Box sx={{ marginTop: "1.5vmax" }}>
          <Typography variant="h3" sx={nftPropertie}>
            {`File size`}
          </Typography>
          <Typography variant="h3" sx={{ ...textStyle, textAlign: "start" }}>
            {artist}
          </Typography>
        </Box> */}

        <Box sx={propertiesContainer}>
          <Box sx={firstPropertiesNft}>
            <Typography variant="h3" sx={{ ...nftPropertie }}>
              {`Guidance`}
            </Typography>
            <Typography variant="h3" sx={{ ...textStyle, textAlign: "start" }}>
              {description}
            </Typography>
          </Box>

          <Box sx={propertieItem}>
            <Typography variant="h3" sx={nftPropertie}>
              {`Symbol`}
            </Typography>
            <Typography
              variant="h3"
              sx={{ ...textStyle, textAlign: "start", marginTop: "1vmax" }}
            >
              {symbol}
            </Typography>
          </Box>

          <Box sx={propertieItem}>
            <Typography variant="h3" sx={nftPropertie}>
              {`external_url`}
            </Typography>
            <Typography
              variant="h3"
              sx={{ ...textStyle, textAlign: "start", marginTop: "1vmax" }}
            >
              {external_url}
            </Typography>
          </Box>
          <Box sx={propertieItem}>
            <Typography variant="h3" sx={nftPropertie}>
              {`minter`}
            </Typography>
            <Typography
              variant="h3"
              sx={{ ...textStyle, textAlign: "start", marginTop: "1vmax" }}
            >
              {minter}
            </Typography>
          </Box>
          <Box sx={propertieItem}>
            <Typography variant="h3" sx={nftPropertie}>
              {`Symbol`}
            </Typography>
            <Typography
              variant="h3"
              sx={{ ...textStyle, textAlign: "start", marginTop: "1vmax" }}
            >
              {symbol}
            </Typography>
          </Box>

          <Box sx={propertieItem}>
            <Typography variant="h3" sx={nftPropertie}>
              {`Seniority`}
            </Typography>
            <Typography
              variant="h3"
              sx={{ ...textStyle, textAlign: "start", marginTop: "1vmax" }}
            >
              {seniority}
            </Typography>
          </Box>

          <Box sx={propertieItem}>
            <Typography variant="h3" sx={nftPropertie}>
              {`Creator`}
            </Typography>
            <Typography
              variant="h3"
              sx={{ ...textStyle, textAlign: "start", marginTop: "1vmax" }}
            >
              {creators}
            </Typography>
          </Box>
        </Box>

        <Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "2vmax",
            }}
          >
            <CustomButton>{`BUY`}</CustomButton>
            <Typography sx={{ ...priceText, marginTop: "0.7vmax" }}>
              {` Unit Cost: 0.05 USDC`}
            </Typography>
            <Typography sx={priceText}>
              {`Plus a small SOL transaction fee`}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default NFTCard;
