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
import { CardPropertiesSell } from "./CardPropertiesToSell";

interface CardActionSellProps {
  amount: number;
  quota: number;
  price: number;
  units: number;
  volume: number;
  transactionDisabled: boolean;
  actionDisabled: boolean;
  transaccionMessage: NotificationMessage;
  handleClickSell: () => Promise<void>;
  handleChanceUnits: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
}

export const CardActionSell: FC<CardActionSellProps> = ({
  amount,
  quota,
  price,
  units,
  transactionDisabled,
  actionDisabled,
  transaccionMessage,
  volume,
  handleClickSell,
  handleChanceUnits,
}) => {
  return (
    <Box sx={{ ...cardInfoContainer }}>
      <Box sx={cardInfoAction}>
        <CardPropertiesSell
          amount={amount}
          price={price}
          quota={quota}
          units={units}
          volume={volume}
          handleChanceUnits={handleChanceUnits}
        />

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
