import { FC } from "react";
import { Box, Typography } from "@mui/material";

import { CardPropertiesBuy } from "./CardPropertiesBuy";
import { CardButton } from "./CardButton";
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
} from "./styles";

import { CardActionBuyProps } from "../types";

export const CardActionBuy: FC<CardActionBuyProps> = ({
  amount,
  quota,
  price,
  units,
  transactionDisabled,
  actionDisabled,
  transaccionMessage,
  handleClickBuy,
  handleChanceUnits,
}) => {
  return (
    <Box sx={{ ...cardInfoContainer }}>
      <Box sx={cardInfoAction}>
        <CardPropertiesBuy
          amount={amount}
          quota={quota}
          handleChanceUnits={handleChanceUnits}
          units={units}
        />

        <Box sx={cardActionsContainer}>
          <CardButton
            disabled={transactionDisabled || actionDisabled}
            onClick={async () => await handleClickBuy()}
          >
            {`BUY`}
          </CardButton>
          <Typography sx={propertiePriceText}>
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
          <Typography sx={titlePropertiePriceText}>
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
        <Typography sx={cardInfoNotificationText}>
          {transaccionMessage.msg}
        </Typography>
      </Box>
    </Box>
  );
};
