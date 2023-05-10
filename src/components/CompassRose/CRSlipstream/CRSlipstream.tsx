import React from "react";
import { Box, SxProps, Typography } from "@mui/material";
import { textStyle, title, container } from "./styles";
import Image from "next/image";
import styled from "@emotion/styled";

const RoseImage = styled(Image)`
  width: 100%;
  height: auto;
`;

const rosePropertie: SxProps = {
  fontSize: {
    xs: "1.6vmax",
  },
  fontWeight: "bold",
  color: "rgba(132, 132, 132, 1)",
  fontFamily: "Cabin",
  textAlign: "start",
};

const propertieItem: SxProps = {
  marginTop: "0.8vmax",
};

export const CRSlipstream = () => {
  return (
    <Box sx={container}>
      <Typography sx={title} variant="h2">{`Welcome Home Stranger`}</Typography>

      <Typography variant="h3" sx={textStyle}>
        {`This is the entry point to the Slipstream, where you will embark on an epic adventure beyond time, space and the death-grip of global civilization.`}
      </Typography>
      <Typography variant="h3" sx={{ ...textStyle, marginBottom: "2vmax" }}>
        {`The Compass Rose will serve as your guide on this journey.`}
      </Typography>

      <Box
        style={{
          borderRadius: "2vmax",
          border: "0.2vmax solid #72767E",
          backgroundColor: "rgba(21, 30, 37, 1)",
          padding: "1.8vmax",
          width: "100%",
        }}
      >
        <Typography variant="h2" sx={{...title, color: 'rgba(190, 239, 0, 1)', fontFamily: 'Patched-Prospect', fontWeight: '400', fontSize: '3vmax !important'}}>
          {`Compass Rose`}
        </Typography>

        <RoseImage src={`/rose.png`} alt="rose" width={100} height={100} />

        <Box>
          <Box>
            <Typography variant="h3" sx={rosePropertie}>
              {`Guidance`}
            </Typography>
            <Typography variant="h3" sx={{ ...textStyle, textAlign: "start" }}>
              {`The Quest of the Compass Rose is a point of entry into Hellbenders: Moral Panic!, a massively-multiplayer Web3 game available on xNFT Backpack and the Solana Saga phone , an outlaw biker gang of amphibious superheroes. Activate your Compass Rose to play Hellbenders: Moral Panic!, our. `}
            </Typography>
          </Box>

          <Box sx={{ marginTop: "1vmax" }}>
            <Typography variant="h3" sx={rosePropertie}>
              {`Artist`}
            </Typography>
            <Typography variant="h3" sx={{ ...textStyle, textAlign: "start" }}>
              {`A stunning photograph of a sunset over the ocean, taken at a beach in Hawaii.`}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gridGap: "1vmax",
              gridAutoRows: "minmax(1vmax, auto)",
            }}
          >
            <Box sx={propertieItem}>
              <Typography variant="h3" sx={rosePropertie}>
                {`Creation date`}
              </Typography>
              <Typography
                variant="h3"
                sx={{ ...textStyle, textAlign: "start", marginTop: "1vmax" }}
              >
                {`2023-03-05`}
              </Typography>
            </Box>

            <Box sx={propertieItem}>
              <Typography variant="h3" sx={rosePropertie}>
                {`File size`}
              </Typography>
              <Typography
                variant="h3"
                sx={{ ...textStyle, textAlign: "start", marginTop: "1vmax" }}
              >
                {`800 KB`}
              </Typography>
            </Box>
            <Box sx={propertieItem}>
              <Typography variant="h3" sx={rosePropertie}>
                {`Creation date`}
              </Typography>
              <Typography
                variant="h3"
                sx={{ ...textStyle, textAlign: "start", marginTop: "1vmax" }}
              >
                {`2023-03-05`}
              </Typography>
            </Box>
            <Box sx={propertieItem}>
              <Typography variant="h3" sx={rosePropertie}>
                {`Symbol`}
              </Typography>
              <Typography
                variant="h3"
                sx={{ ...textStyle, textAlign: "start", marginTop: "1vmax" }}
              >
                {`ROSE`}
              </Typography>
            </Box>

            <Box sx={propertieItem}>
              <Typography variant="h3" sx={rosePropertie}>
                {`family_name`}
              </Typography>
              <Typography
                variant="h3"
                sx={{ ...textStyle, textAlign: "start", marginTop: "1vmax" }}
              >
                {`Mapshifting`}
              </Typography>
            </Box>

            <Box sx={propertieItem}>
              <Typography variant="h3" sx={rosePropertie}>
                {`collection_name`}
              </Typography>
              <Typography
                variant="h3"
                sx={{ ...textStyle, textAlign: "start", marginTop: "1vmax" }}
              >
                {`Compass Rose`}
              </Typography>
            </Box>

            <Box sx={propertieItem}>
              <Typography variant="h3" sx={rosePropertie}>
                {`Background`}
              </Typography>
              <Typography
                variant="h3"
                sx={{ ...textStyle, textAlign: "start", marginTop: "1vmax" }}
              >
                {`Parent`}
              </Typography>
            </Box>

            <Box
              sx={{
                ...propertieItem,
                gridColumnStart: "2",
                gridColumnEnd: "4",
              }}
            >
              <Typography variant="h3" sx={rosePropertie}>
                {`external_url`}
              </Typography>
              <Typography
                variant="h3"
                sx={{ ...textStyle, textAlign: "start", marginTop: "1vmax" }}
              >
                {`https://quest.hellbenders.world/`}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
