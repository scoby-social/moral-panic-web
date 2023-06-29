import {
  cardInfoAction,
  cardInfoContainer,
  cardInfoNotification,
  cardInfoNotificationText,
  priceText,
} from "../styles";
import { CardPropertiesBuy } from "./CarsPropertiesBuy";
import { Box, Typography } from "@mui/material";
import { CardButton } from "./CardButton";
import { FC } from "react";
import { NotificationMessage, messageType } from "../types";

interface CardActionBuyProps {
  amount: number;
  quota: number;
  price: number;
  units: number;
  transactionDisabled: boolean;
  actionDisabled: boolean;
  transaccionMessage: NotificationMessage;
  handleClickBuy: () => Promise<void>;
  handleChanceUnits: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
}

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
