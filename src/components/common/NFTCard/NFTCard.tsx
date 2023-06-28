import styled from "@emotion/styled";
import Image from "next/image";
import React, { FC, useEffect, useState } from "react";

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
  cardInfoNotificationText,
} from "./styles";
import { CardButton } from "./components/CardButton";
import { TransactionExpiredNonceInvalidError } from "@solana/web3.js";

const NftImage = styled(Image)`
  width: 40%;
  height: auto;
  @media (min-width: 767px) {
  }
`;

const CustomInput = styled(Input)`
  margin-left: 0.1vmax;
  & input {
    font-size: .8vmax !important;
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

  const CardPropertiesBuy = () => (
    <Box>
      <Box sx={cardInfoPropertie}>
        <Typography sx={cardInfoPropertieText}>Listed:</Typography>
        <Typography sx={cardInfoPropertieValue}>{amount}</Typography>
      </Box>

      <Box sx={cardInfoPropertie}>
        <Typography sx={cardInfoPropertieText}>Quota:</Typography>
        <Typography sx={cardInfoPropertieValue}>{quota}</Typography>
      </Box>

      <Box sx={cardInfoPropertie}>
        <Typography sx={cardInfoPropertieText}>Units:</Typography>
        <CustomInput type="number" value={units} onChange={handleChanceUnits} />
      </Box>
    </Box>
  );

  const CardPropertiesSell = () => (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ width: "50%" }}>
        <Box sx={cardInfoPropertie}>
          <Typography sx={cardInfoPropertieText}>Listed:</Typography>
          <Typography sx={cardInfoPropertieValue}>{amount}</Typography>
        </Box>

        <Box sx={cardInfoPropertie}>
          <Typography sx={cardInfoPropertieText}>Quota:</Typography>
          <Typography sx={cardInfoPropertieValue}>{quota}</Typography>
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
      <Box
        sx={{
          width: "50%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Box sx={cardInfoPropertie}>
          <Typography sx={cardInfoPropertieText}>Last Sale:</Typography>
          <Typography sx={cardInfoPropertieValue}>{`${price} USDC`}</Typography>
        </Box>

        <Box sx={cardInfoPropertie}>
          <Typography sx={cardInfoPropertieText}>24hr Volume:</Typography>
          <Typography sx={cardInfoPropertieValue}>{`${volume} `}</Typography>
        </Box>
      </Box>
    </Box>
  );

  const notificationMessage = (type: messageType) => {
    if (type === messageType.buySuccess) {
      return "Congrats! You have bought a token successfully";
    }

    if (type === messageType.sellSuccess) {
      return "Congrats! You have list a token successfully";
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

    if (type === messageType.limitQuota) {
      return "Sorry pal, you can’t list more of these tokens until 2 of the ones you minted have been used and burned.";
    }

    if (type === messageType.buyLimit) {
      return "Hey pal, looks like you already have a Wooden Nickel. I’d love to sell you another but you should figure out how to mint your own.";
    }

    return "";
  };

  const getNotificacionMessage = (type: messageType): NotificationMessage => {
    return {
      type: type,
      msg: notificationMessage(type),
    };
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

  const CardActionBuy = () => {
    return (
      <Box sx={{ ...cardInfoContainer }}>
        <Box sx={cardInfoAction}>
          <CardPropertiesBuy />

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            <CardButton
              disabled={transactionDisabled || actionDisabled}
              onClick={async () => await handleClickBuy()}
            >
              {`BUY`}
            </CardButton>
            <Typography
              sx={{
                ...priceText,
                textAlign: "center",
                marginTop: "0.1vmax",
              }}
            >
              {`Unit Cost: ${price} USDC`}
            </Typography>
            <Typography
              sx={{
                ...priceText,
                textAlign: "center",
              }}
            >
              {`Total: ${units > 0 ? price * units : price} USDC`}
            </Typography>
            <Typography
              sx={{
                ...priceText,
                textAlign: "center",
                marginTop: "0.1vmax",
                fontSize: {
                  xs: ".4vmax",
                  sm: ".6vmax",
                  lg: ".4vmax",
                },
              }}
            >
              {`Plus a small SOL transaction fee`}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            ...cardInfoNotification,
            color:
              transaccionMessage.type === messageType.buySuccess ||
              transaccionMessage.type === messageType.sellSuccess
                ? "rgba(190, 239, 0, 1)"
                : transaccionMessage.type === messageType.buyLimit
                ? "#FAD326"
                : " rgba(255, 113, 11, 1)",
          }}
        >
          <Typography sx={cardInfoNotificationText}>
            {transaccionMessage.msg}
          </Typography>
        </Box>
      </Box>
    );
  };

  const CardActionSell = () => {
    return (
      <Box sx={{ ...cardInfoContainer }}>
        <Box sx={cardInfoAction}>
          <CardPropertiesSell />

          <Box>
            <CardButton
              disabled={transactionDisabled || actionDisabled}
              onClick={async () => await handleClickSell()}
            >
              {`MINT`}
            </CardButton>
            <Typography
              sx={{
                ...priceText,
                textAlign: "center",
                marginTop: "0.1vmax",
                fontSize: {
                  xs: ".4vmax",
                  sm: ".6vmax",
                  lg: ".4vmax",
                },
              }}
            >
              {`Plus a small SOL transaction fee`}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            ...cardInfoNotification,
            color:
              transaccionMessage.type === messageType.buySuccess ||
              transaccionMessage.type === messageType.sellSuccess
                ? "rgba(190, 239, 0, 1)"
                : transaccionMessage.type === messageType.buyLimit
                ? "#FAD326"
                : " rgba(255, 113, 11, 1)",
          }}
        >
          <Typography sx={cardInfoNotificationText}>
            {transaccionMessage.msg}
          </Typography>
        </Box>
      </Box>
    );
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
      {type === "sell" && <CardActionSell />}
      {type === "buy" && <CardActionBuy />}
    </Box>
  );
};

export default NFTCard;
