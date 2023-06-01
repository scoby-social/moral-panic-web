import styled from "@emotion/styled";
import Image from "next/image";
import React, { FC } from "react";

import { Box, Typography } from "@mui/material";

import {
  lastPropertiesNft,
  nftCard,
  nftPropertie,
  nftTitle,
  propertieItem,
  propertiesContainer,
  textStyle,
} from "./styles";

const NftImage = styled(Image)`
  width: 100%;
  height: auto;

  @media (min-width: 769px) {
    padding-left: 8vmax;
    padding-right: 8vmax;
  }
`;

const NFTFullCardPresentation: FC<NFTFullCardProps> = ({
  guidance,
  symbol,
  familyName,
  collectionName,
  background,
  externalUrl,
  title,
  imageUrl,
}) => {
  return (
    <Box sx={nftCard}>
      <Typography variant="h2" sx={nftTitle}>
        {title}
      </Typography>

      <NftImage src={imageUrl} alt="rose" width={1080} height={1080} />

      <Box>
        <Box>
          <Typography variant="h3" sx={{ ...nftPropertie, marginTop: "2vmax" }}>
            {`Guidance`}
          </Typography>
          <Typography variant="h3" sx={{ ...textStyle, textAlign: "start" }}>
            {guidance}
          </Typography>
        </Box>

        <Box sx={propertiesContainer}>
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
              {`family_name`}
            </Typography>
            <Typography
              variant="h3"
              sx={{ ...textStyle, textAlign: "start", marginTop: "1vmax" }}
            >
              {familyName}
            </Typography>
          </Box>

          <Box sx={propertieItem}>
            <Typography variant="h3" sx={nftPropertie}>
              {`collection_name`}
            </Typography>
            <Typography
              variant="h3"
              sx={{ ...textStyle, textAlign: "start", marginTop: "1vmax" }}
            >
              {collectionName}
            </Typography>
          </Box>

          <Box sx={propertieItem}>
            <Typography variant="h3" sx={nftPropertie}>
              {`Background`}
            </Typography>
            <Typography
              variant="h3"
              sx={{ ...textStyle, textAlign: "start", marginTop: "1vmax" }}
            >
              {background}
            </Typography>
          </Box>

          <Box
            sx={{
              ...lastPropertiesNft,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            <Typography variant="h3" sx={nftPropertie}>
              {`external_url`}
            </Typography>
            <Typography
              variant="h3"
              sx={{
                ...textStyle,
                textAlign: "start",
                marginTop: "1vmax",
              }}
            >
              {externalUrl}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default NFTFullCardPresentation;
