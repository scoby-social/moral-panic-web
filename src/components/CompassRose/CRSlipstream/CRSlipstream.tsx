import React, { FC } from "react";
import { Box, Button, SxProps, Typography } from "@mui/material";
import { textStyle, title, container } from "./styles";
import NFTFullCardPresentation from "components/common/NFTFullCardPresentation/NFTFullCardPresentation";
import styled from "@emotion/styled";
import { nftMetadata } from "lib/web3/types/nftMetadata";

interface CRSlipstream {
  userName: string;
  walletWasSaved: boolean;
  compassRoseData: nftMetadata;
  saveWallet: () => void;
}

const EnterToSlipstream = styled(Button)`
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
  &.Mui-disabled {
    background-color: rgba(3, 86, 43, 1) !important;
    color: rgba(255, 255, 255, 1) !important;
  }
`;

const CRSlipstream: FC<CRSlipstream> = ({
  userName,
  saveWallet,
  compassRoseData,
  walletWasSaved,
}) => {
  const {
    description,
    symbol,
    family_name,
    collection_name,
    background,
    external_url,
    imageUri,
  } = compassRoseData;

  console.log({ imageUri });

  const nftdata = {
    guidance: description,
    creationDate: "2023-03-05",
    symbol: symbol,
    familyName: family_name,
    collectionName: collection_name,
    background: background,
    externalUrl: external_url,
    title: "Compass Rose",
    imageUrl: imageUri,
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

      <EnterToSlipstream
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
          {!walletWasSaved ? `HELL YEAH!` : `ALL SET!`}
        </Typography>
      </EnterToSlipstream>
    </Box>
  );
};

export default CRSlipstream;
