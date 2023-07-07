import { FC } from "react";
import { Box, Typography } from "@mui/material";

import { CardPropertiesBuy } from "./CardPropertiesBuy";
import { CardButton } from "./CardButton/CardButton";
import {
  cardInfoAction,
  cardInfoContainer,
  cardActionsContainer,
  propertiePriceText,
  titlePropertiePriceText,
  transactionTextColor,
  cardInfoNotification,
  priceText,
  cardInfoNotificationText,
  cardInfoActionFullScreen,
  cardInfoNotificationTextFullScreen,
  propertiePriceTextFullScreen,
  unitText,
  unitTextFullScreen,
  titlePropertiePriceTextFullScreen,
} from "./styles";

import { CardActionBuyProps } from "../types";

export const CardActionBuy: FC<CardActionBuyProps> = ({
  amount,
  quota,
  price,
  units,
  fullScreen = false,
  transactionDisabled,
  actionDisabled,
  transaccionMessage,
  handleClickBuy,
  handleChangeUnits,
}) => {
  return (
    <Box sx={{ ...cardInfoContainer }}>
      <Box sx={fullScreen ? cardInfoActionFullScreen : cardInfoAction}>
        <CardPropertiesBuy
          fullScreen={fullScreen}
          amount={amount}
          quota={quota}
          handleChangeUnits={handleChangeUnits}
          units={units}
        />

        <Box sx={cardActionsContainer}>
          <CardButton
            fullScreen={fullScreen}
            disabled={transactionDisabled || actionDisabled}
            onClick={async () => await handleClickBuy()}
          >
            {`BUY`}
          </CardButton>
          <Typography
            sx={fullScreen ? propertiePriceTextFullScreen : propertiePriceText}
          >
            {`Unit Cost: ${price} USDC`}
          </Typography>
          <Typography sx={fullScreen ? unitTextFullScreen : unitText}>
            {`Total: ${units > 0 ? price * units : price} USDC`}
          </Typography>
          <Typography
            sx={
              fullScreen
                ? titlePropertiePriceTextFullScreen
                : titlePropertiePriceText
            }
          >
            {`Plus a small SOL transaction fee`}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          ...cardInfoNotification,
          color: transactionTextColor(transaccionMessage.type),
        }}
      >
        <Typography
          sx={
            fullScreen
              ? cardInfoNotificationTextFullScreen
              : cardInfoNotificationText
          }
        >
          {transaccionMessage.msg}
        </Typography>
      </Box>
    </Box>
  );
};
