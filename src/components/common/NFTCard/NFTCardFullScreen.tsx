import React, { FC, useEffect, useState } from "react";

import { Box, Typography } from "@mui/material";

import { NotificationMessage, messageType } from "./types/notificationsMessage";

import {
  NftImage,
  NftImageFullScreen,
  firstPropertiesNft,
  nftCard,
  nftCardContainer,
  nftCardFullScreen,
  nftInformation,
  nftPropertie,
  nftPropertieFullScreen,
  nftTitle,
  nftTitleFullScreen,
  propertieItem,
  propertiesContainer,
  propertiesContainerFullScreen,
  propertiesTextStyle,
  propertiesTextStyleFullScreen,
  textStyle,
} from "./styles";

import { getNotificacionMessage } from "./utils/notificationMessage";

import { CardActionBuy } from "./components/CardActionBuy";
import { CardActionSell } from "./components/CardActionSell";
import { NFTCardProps } from "./types";

const transaccionNotificationInitial: NotificationMessage = {
  type: messageType.idle,
  msg: "",
};
const NFTCardFullScreen: FC<NFTCardProps> = ({
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
  userHasFakeId = false,
  transactionDisabled = false,
}) => {
  const [units, setUnits] = useState(0);

  const [actionDisabled, setActionDisabled] = useState(true);
  const [transaccionMessage, setTransaccionMessage] =
    useState<NotificationMessage>(transaccionNotificationInitial);

  useEffect(() => {
    setCardInitNotification();

    if (quota === 0) {
      setActionDisabled(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setCardInitNotification = () => {
    setTransaccionMessage(() => {
      if (transactionDisabled && type === "buy" && quota < 1) {
        return getNotificacionMessage(messageType.buyLimit);
      }

      if (type === "buy" && userHasFakeId) {
        return getNotificacionMessage(messageType.hasFakeId);
      }

      return getNotificacionMessage(messageType.idle);
    });
  };

  const handleChangeUnits = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const valueString = e.target.value;
    const value = parseInt(e.target.value);

    if (value < 0) {
      e.target.value = "0";
      setUnits(parseInt("0"));
    }

    if (value < 1 || valueString === "") {
      setActionDisabled(true);
      setTransaccionMessage(getNotificacionMessage(messageType.idle));
    } else if (value > quota) {
      setActionDisabled(true);
      setTransaccionMessage(getNotificacionMessage(messageType.limitQuota));
    } else {
      setTransaccionMessage(getNotificacionMessage(messageType.idle));
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
        setActionDisabled(true);
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
        setTransaccionMessage(
          getNotificacionMessage(messageType.insufficientTokenBalance)
        );
      }
    } catch (error) {
      console.error(error);
      setTransaccionMessage(getNotificacionMessage(messageType.unknow));
    }
  };

  return (
    <Box sx={nftCardFullScreen}>
      <Box sx={nftCardContainer}>
        <NftImageFullScreen src={image} alt="rose" width={100} height={100} />

        <Box sx={nftInformation}>
          <Typography variant="h2" sx={nftTitleFullScreen}>
            {name}
          </Typography>

          <Box sx={propertiesContainerFullScreen}>
            <Box sx={firstPropertiesNft}>
              <Typography variant="h3" sx={nftPropertieFullScreen}>
                {`Guidance`}
              </Typography>
              <Typography
                variant="h3"
                sx={{ ...propertiesTextStyleFullScreen, textAlign: "start" }}
              >
                {description}
              </Typography>
            </Box>

            <Box sx={propertieItem}>
              <Typography variant="h3" sx={nftPropertieFullScreen}>
                {`Symbol`}
              </Typography>
              <Typography variant="h3" sx={propertiesTextStyleFullScreen}>
                {symbol}
              </Typography>
            </Box>

            <Box sx={propertieItem}>
              <Typography variant="h3" sx={nftPropertieFullScreen}>
                {`external_url`}
              </Typography>
              <Typography variant="h3" sx={propertiesTextStyleFullScreen}>
                {external_url}
              </Typography>
            </Box>
            <Box sx={propertieItem}>
              <Typography variant="h3" sx={nftPropertieFullScreen}>
                {`minter`}
              </Typography>
              <Typography variant="h3" sx={propertiesTextStyleFullScreen}>
                {minter}
              </Typography>
            </Box>

            <Box sx={propertieItem}>
              <Typography variant="h3" sx={nftPropertieFullScreen}>
                {`Seniority`}
              </Typography>
              <Typography variant="h3" sx={propertiesTextStyleFullScreen}>
                {seniority}
              </Typography>
            </Box>
          </Box>

          {type === "sell" && (
            <CardActionSell
              fullScreen
              amount={amount}
              price={price}
              quota={quota}
              units={units}
              volume={volume}
              actionDisabled={actionDisabled}
              transactionDisabled={transactionDisabled}
              handleClickSell={handleClickSell}
              transaccionMessage={transaccionMessage}
              handleChangeUnits={handleChangeUnits}
            />
          )}
          {type === "buy" && (
            <CardActionBuy
              fullScreen
              amount={amount}
              price={price}
              quota={quota}
              units={units}
              actionDisabled={actionDisabled}
              transactionDisabled={transactionDisabled}
              handleClickBuy={handleClickBuy}
              transaccionMessage={transaccionMessage}
              handleChangeUnits={handleChangeUnits}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default NFTCardFullScreen;
