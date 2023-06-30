import { FC } from "react";

import { Box, Typography } from "@mui/material";

import { CardButton } from "./CardButton";
import { NotificationMessage } from "../types";
import { CardPropertiesSell } from "./CardPropertiesToSell";
import {
  cardInfoAction,
  cardInfoContainer,
  titlePropertiePriceText,
  transacctionTextColor,
  cardInfoNotification,
  cardInfoNotificationText,
} from "./styles";

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
          <Typography sx={titlePropertiePriceText}>
            {`Plus a small SOL transaction fee`}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          ...cardInfoNotification,
          color: transacctionTextColor(transaccionMessage.type),
        }}
      >
        <Typography sx={cardInfoNotificationText}>
          {transaccionMessage.msg}
        </Typography>
      </Box>
    </Box>
  );
};
