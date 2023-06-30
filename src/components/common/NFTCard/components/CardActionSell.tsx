import { FC } from "react";

import { Box, Typography } from "@mui/material";

import { CardButton } from "./CardButton";
import { CardPropertiesSell } from "./CardPropertiesToSell";
import {
  cardInfoAction,
  cardInfoContainer,
  titlePropertiePriceText,
  transactionTextColor,
  cardInfoNotification,
  cardInfoNotificationText,
} from "./styles";
import { CardActionSellProps } from "../types";

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
