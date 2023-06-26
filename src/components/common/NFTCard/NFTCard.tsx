import styled from "@emotion/styled";
import Image from "next/image";
import React, { FC, useState } from "react";

import { Box, Input, TextField, Typography } from "@mui/material";
import { NFTCardProps, NotificationMessage, messageType } from "./types";

import {
  cardInfoAction,
  cardInfoContainer,
  cardInfoPropertie,
  cardInfoPropertieText,
  cardInfoPropertieValue,
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
  cardInfoNotification,
} from "./styles";
import { CustomButton } from "../CustomButton/CustomButton";

const NftImage = styled(Image)`
  width: 100%;
  height: auto;
  @media (min-width: 767px) {
    min-width: 50%;
  }
`;

const CustomInput = styled(Input)`
  margin-left: 1vmax;
  & input {
    font-size: 1.6vmax !important;
    font-family: Cabin;
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
}) => {
  const [units, setUnits] = useState(0);
  const [transaccionMessage, setTransaccionMessage] =
    useState<NotificationMessage>(transaccionNotificationInitial);

  const CardPropertiesBuy = () => (
    <Box>
      <Box sx={cardInfoPropertie}>
        <Typography sx={cardInfoPropertieText}>Listed:</Typography>
        <Typography sx={cardInfoPropertieValue}>{`100`}</Typography>
      </Box>

      <Box sx={cardInfoPropertie}>
        <Typography sx={cardInfoPropertieText}>Quota:</Typography>
        <Typography sx={cardInfoPropertieValue}>{`1`}</Typography>
      </Box>

      <Box sx={cardInfoPropertie}>
        <Typography sx={cardInfoPropertieText}>Unit Price:</Typography>
        <Typography sx={cardInfoPropertieValue}>{`${price} USDC`}</Typography>
      </Box>

      <Box sx={cardInfoPropertie}>
        <Typography sx={cardInfoPropertieText}>Units:</Typography>
        <CustomInput
          type="number"
          value={units}
          onChange={e => setUnits(parseInt(e.target.value))}
        />
      </Box>
    </Box>
  );

  const CardPropertiesSell = () => (
    <Box>
      <Box sx={cardInfoPropertie}>
        <Typography sx={cardInfoPropertieText}>Listed:</Typography>
        <Typography sx={cardInfoPropertieValue}>{`100`}</Typography>
      </Box>

      <Box sx={cardInfoPropertie}>
        <Typography sx={cardInfoPropertieText}>Last Sale:</Typography>
        <Typography sx={cardInfoPropertieValue}>{`1 USDC`}</Typography>
      </Box>

      <Box sx={cardInfoPropertie}>
        <Typography sx={cardInfoPropertieText}>24hr Volume:</Typography>
        <Typography sx={cardInfoPropertieValue}>{`${price} USDC`}</Typography>
      </Box>
    </Box>
  );

  const notificationMessage = (type: messageType) => {
    if (type === messageType.success) {
      return "Congrats! You have bought a token successfully";
    }

    if (type === messageType.insufficientBalance) {
      return `
      "Hey! We checked your wallet and you don't have enough crypto to buy.
      Come back later when you've earned some bread and try again."
      `;
    }

    if (type === messageType.unknow) {
      return "I dunno why, but the machines elves f*cked up your trade, Try again later.";
    }

    return "";
  };

  const getNotificacionMessage = (type: messageType): NotificationMessage => {
    return {
      type: type,
      msg: notificationMessage(type),
    };
  };

  const handleClick = async () => {
    try {
      const response = await handleTransaction();

      if (response) {
        setTransaccionMessage(getNotificacionMessage(messageType.success));
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

  return (
    <Box sx={nftCard}>
      <NftImage src={image} alt="rose" width={100} height={100} />

      <Box sx={nftInformation}>
        <Typography variant="h2" sx={nftTitle}>
          {name}
        </Typography>

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
        </Box>

        <Box sx={cardInfoContainer}>
          {/* //* Properties sell or buy */}
          {type === "buy" ? CardPropertiesBuy() : CardPropertiesSell()}

          <Box sx={cardInfoAction}>
            <CustomButton onClick={async () => await handleClick()}>{`${
              type === "buy" ? "BUY" : "MINT"
            }`}</CustomButton>
            <Typography
              sx={{
                ...priceText,
                textAlign: "center",
                fontSize: "1vmax !important",
                marginTop: "0.5vmax",
              }}
            >
              {`Plus a small SOL transaction fee`}
            </Typography>
          </Box>
          <Box
            sx={{
              ...cardInfoNotification,
              color:
                transaccionMessage.type === messageType.success
                  ? "rgba(190, 239, 0, 1)"
                  : " rgba(255, 113, 11, 1)",
            }}
          >
            {transaccionMessage.msg}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default NFTCard;
