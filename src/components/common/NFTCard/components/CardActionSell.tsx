import { FC } from "react";

import { Box, Typography } from "@mui/material";

import { CardButton } from "./CardButton/CardButton";
import { CardPropertiesSell } from "./CardPropertiesToSell";
import {
  cardInfoAction,
  cardInfoContainer,
  titlePropertiePriceText,
  transactionTextColor,
  cardInfoNotification,
  cardInfoNotificationText,
  titlePropertiePriceTextFullScreen,
  actionContainer,
  actionContainerFullScreen,
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
  fullScreen = false,
  handleClickSell,
  handleChangeUnits,
}) => {
  return (
    <Box sx={{ ...cardInfoContainer }}>
      <Box sx={cardInfoAction}>
        <CardPropertiesSell
          fullScreen={fullScreen}
          amount={amount}
          price={price}
          quota={quota}
          units={units}
          volume={volume}
          handleChangeUnits={handleChangeUnits}
        />

        <Box>
          <CardButton
            fullScreen={fullScreen}
            disabled={transactionDisabled || actionDisabled}
            onClick={async () => await handleClickSell()}
          >
            {`LIST`}
          </CardButton>
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
          sx={fullScreen ? cardInfoNotificationText : cardInfoNotificationText}
        >
          {transaccionMessage.msg}
        </Typography>
      </Box>
    </Box>
  );
};
