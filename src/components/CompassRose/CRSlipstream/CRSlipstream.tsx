import React, { FC } from "react";
import { Box, Button, SxProps, Typography } from "@mui/material";
import { textStyle, title, container } from "./styles";
import NFTFullCardPresentation from "components/common/NFTFullCardPresentation/NFTFullCardPresentation";
import styled from "@emotion/styled";

interface CRSlipstream {
  userName: string;
  walletWasSaved: boolean;
  saveWallet: () => void;
}

const EnterThSlipstream = styled(Button)`
  max-height: 3vmax;
  background-color: #076936;
  line-height: 0 !important;
  padding: 2.5vmax 4.5vmax;
  border-radius: 0.6vmax;
  color: #fff;
  border: solid 1px #000;
  text-align: center;
  display: flex;
  align-items: center;
  &:focus {
    background-color: #076936;
  }
  &:hover {
    background-color: #1a1f2e;
  }
`;

const CRSlipstream: FC<CRSlipstream> = ({
  userName,
  saveWallet,
  walletWasSaved,
}) => {
  const nftdata = {
    guidance:
      "The Quest of the Compass Rose is a point of entry into Hellbenders: Moral Panic!, a massively-multiplayer Web3 game available on xNFT Backpack and the Solana Saga phone , an outlaw biker gang of amphibious superheroes. Activate your Compass Rose to play Hellbenders: Moral Panic!, our.",
    artist:
      "A stunning photograph of a sunset over the ocean, taken at a beach in Hawaii.",
    creationDate: "2023-03-05",
    fileSize: "800 KB",
    symbol: "ROSE",
    familyName: "Mapshifting",
    collectionName: "Compass Rose",
    background: "Parent",
    externalUrl: "https://quest.hellbenders.world/",
    title: "Compass Rose",
    imageUrl: `/rose.png`,
  };

  return (
    <Box sx={container}>
      <Typography sx={title} variant="h2">{`${
        !userName ? "Welcome Home Stranger" : "Welcome Home, " + userName
      }`}</Typography>

      <Typography variant="h3" sx={{ ...textStyle, maxWidth: "48vmax" }}>
        {`This is the entry point to the Slipstream, where you will embark on an epic adventure beyond time, space and the death-grip of global civilization.`}
      </Typography>
      <Typography variant="h3" sx={{ ...textStyle, marginBottom: "2vmax" }}>
        {`The Compass Rose will serve as your guide on this journey.`}
      </Typography>

      <NFTFullCardPresentation {...nftdata} />

      {!userName ? (
        <Typography variant="h3" sx={{ ...textStyle, marginY: "3vmax" }}>
          {`Pay attention to the wallet holding your Compass Rose. She’ll let you know when your ready to take the next step on your quest.`}
        </Typography>
      ) : (
        <Typography variant="h3" sx={{ ...textStyle, marginY: "3vmax" }}>
          {`Do you want the Compass Rose to send guidance when you’re ready to embark on your quest?`}
        </Typography>
      )}

      <EnterThSlipstream
        onClick={() => {
          saveWallet();
        }}
        disabled={walletWasSaved}
      >
        <Typography
          sx={{
            fontFamily: "Patched",
            fontSize: "1.6vmax !important",
            marginTop: "5px",
          }}
        >
          {userName ? `HELL YEAH!` : `ALL SET!`}
        </Typography>
      </EnterThSlipstream>
    </Box>
  );
};

export default CRSlipstream;
