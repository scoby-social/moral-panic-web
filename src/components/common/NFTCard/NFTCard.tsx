import styled from "@emotion/styled";
import Image from "next/image";
import React, { FC, useEffect, useState } from "react";

import { Box, Input, TextField, Typography } from "@mui/material";
import { NFTCardProps, NotificationMessage, messageType } from "./types";

import {
  firstPropertiesNft,
  nftCard,
  nftInformation,
  nftPropertie,
  nftTitle,
  propertieItem,
  propertiesContainer,
  textStyle,
} from "./styles";

import { getNotificacionMessage } from "./utils/notificationMessage";

import { CardActionBuy } from "./components/CardActionBuy";
import { CardActionSell } from "./components/CardActionSell";

const NftImage = styled(Image)`
  width: 40%;
  height: auto;
  @media (min-width: 767px) {
  }
`;

const transaccionNotificationInitial: NotificationMessage = {
  type: messageType.idle,
  msg: "",
};
const NFTCard: FC<NFTCardProps> = ({
  name,
  symbol,
  description,
  image,
  external_url,
  minter,
  seniority,
  price,
  type = "buy",
  handleTransaction,
  amount,
  volume = 0,
  quota = 0,
  transactionDisabled = false,
}) => {
  const [units, setUnits] = useState(0);

  const [transaccionMessage, setTransaccionMessage] =
    useState<NotificationMessage>(transaccionNotificationInitial);

  const [actionDisabled, setActionDisabled] = useState(false);

  useEffect(() => {
    if (transactionDisabled) {
      setTransaccionMessage(getNotificacionMessage(messageType.buyLimit));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChanceUnits = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const valueString = e.target.value;
    const value = parseInt(e.target.value);

    if (value < 0) {
      e.target.value = "0";
      setUnits(parseInt("0"));
    }

    if (value < 1 || (value > quota && type == "sell")) {
      setActionDisabled(true);
    } else {
      setActionDisabled(false);
    }

    if (
      valueString[valueString.length] === "e" ||
      valueString[valueString.length] === "." ||
      valueString[valueString.length] === "."
    ) {
      e.target.value = valueString.substring(-1);
      setUnits(parseInt(valueString.substring(-1)));
    }

    setUnits(value);
  };

  const handleClickBuy = async () => {
    try {
      const response = await handleTransaction(units);

      if (response) {
        setTransaccionMessage(getNotificacionMessage(messageType.buySuccess));
      } else {
        setTransaccionMessage(
          getNotificacionMessage(messageType.insufficientBalance)
        );
      }
    } catch (error) {
      console.error(error);
      setTransaccionMessage(getNotificacionMessage(messageType.unknow));
    }
  };

  const handleClickSell = async () => {
    try {
      const response = await handleTransaction(units);

      if (response) {
        setTransaccionMessage(getNotificacionMessage(messageType.sellSuccess));
      } else {
        setTransaccionMessage(getNotificacionMessage(messageType.limitQuota));
      }
    } catch (error) {
      console.error(error);
      setTransaccionMessage(getNotificacionMessage(messageType.unknow));
    }
  };

  return (
    <Box sx={nftCard}>
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "row",
            sm: "row",
          },
          width: "100%",
        }}
      >
        <NftImage src={image} alt="rose" width={100} height={100} />

        <Box sx={nftInformation}>
          <Typography variant="h2" sx={nftTitle}>
            {name}
          </Typography>

          <Box sx={{ ...propertiesContainer }}>
            <Box sx={firstPropertiesNft}>
              <Typography variant="h3" sx={{ ...nftPropertie }}>
                {`Guidance`}
              </Typography>
              <Typography
                variant="h3"
                sx={{ ...textStyle, textAlign: "start" }}
              >
                {description}
              </Typography>
            </Box>

            <Box sx={propertieItem}>
              <Typography variant="h3" sx={nftPropertie}>
                {`Symbol`}
              </Typography>
              <Typography
                variant="h3"
                sx={{ ...textStyle, textAlign: "start", marginTop: ".5vmax" }}
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
                sx={{ ...textStyle, textAlign: "start", marginTop: ".5vmax" }}
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
                sx={{ ...textStyle, textAlign: "start", marginTop: ".5vmax" }}
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
                sx={{ ...textStyle, textAlign: "start", marginTop: ".5vmax" }}
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
                sx={{ ...textStyle, textAlign: "start", marginTop: ".5vmax" }}
              >
                {seniority}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      {type === "sell" && (
        <CardActionSell
          amount={amount}
          price={price}
          quota={quota}
          units={units}
          volume={volume}
          actionDisabled={actionDisabled}
          transactionDisabled={transactionDisabled}
          handleClickSell={handleClickSell}
          transaccionMessage={transaccionMessage}
          handleChanceUnits={handleChanceUnits}
        />
      )}
      {type === "buy" && (
        <CardActionBuy
          amount={amount}
          price={price}
          quota={quota}
          units={units}
          actionDisabled={actionDisabled}
          transactionDisabled={transactionDisabled}
          handleClickBuy={handleClickBuy}
          transaccionMessage={transaccionMessage}
          handleChanceUnits={handleChanceUnits}
        />
      )}
    </Box>
  );
};

export default NFTCard;
