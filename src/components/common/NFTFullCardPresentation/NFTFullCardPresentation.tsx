import styled from "@emotion/styled";
import Image from "next/image";
import React, { FC } from "react";

import { Box, Link, Typography } from "@mui/material";

import {
  lastPropertiesNft,
  nftCard,
  nftPropertie,
  nftTitle,
  propertieItem,
  propertiesContainer,
  textStyle,
} from "./styles";
import { NFTFullCardProps } from "./types";

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
  externalUrl,
  title,
  imageUrl,
  attributes,
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
              sx={{ ...textStyle, textAlign: "start", marginTop: "0.4vmax" }}
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
              sx={{ ...textStyle, textAlign: "start", marginTop: "0.4vmax" }}
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
              sx={{ ...textStyle, textAlign: "start", marginTop: "0.4vmax" }}
            >
              {collectionName}
            </Typography>
          </Box>

          {attributes.length &&
            attributes.map(att => (
              <Box sx={propertieItem} key={att.trait_type}>
                <Typography variant="h3" sx={nftPropertie}>
                  {att.trait_type}
                </Typography>
                <Typography
                  variant="h3"
                  sx={{ ...textStyle, textAlign: "start", marginTop: "0.4vmax" }}
                >
                  {att.value}
                </Typography>
              </Box>
            ))}

          <Box
            sx={{
              ...lastPropertiesNft,
            }}
          >
            <Typography variant="h3" sx={nftPropertie}>
              {`external_url`}
            </Typography>
            <Link
              href={externalUrl}
              target="_blank"
              sx={{
                ...textStyle,
                textAlign: "start",
                marginTop: "0.4vmax",
                color: "rgba(255, 255, 255, 1)",
                textDecoration: "none",
              }}
            >
              {externalUrl}
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default NFTFullCardPresentation;
