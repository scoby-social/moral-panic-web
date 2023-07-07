import { FC } from "react";

import { Box, Typography } from "@mui/material";
import {
  cardInfoPropertie,
  cardInfoPropertieText,
  cardInfoPropertieTextFullScreen,
  cardInfoPropertieValue,
  cardInfoPropertieValueFullScreen,
} from "./styles";
import { CardPropertiesBuyProps } from "../types/cardPropertiesBuyProps";
import { unitsInputValidations } from "../utils/unitsInputValidations";
import { CardCustomInput } from "./CardCustomInput/CardCustomInput";

export const CardPropertiesBuy: FC<CardPropertiesBuyProps> = ({
  amount,
  quota,
  units,
  fullScreen = false,
  handleChangeUnits,
}) => {
  return (
    <Box>
      <Box sx={cardInfoPropertie}>
        <Typography
          sx={
            fullScreen ? cardInfoPropertieTextFullScreen : cardInfoPropertieText
          }
        >
          Listed:
        </Typography>
        <Typography
          sx={
            fullScreen
              ? cardInfoPropertieValueFullScreen
              : cardInfoPropertieValue
          }
        >
          {amount}
        </Typography>
      </Box>

      <Box sx={cardInfoPropertie}>
        <Typography
          sx={
            fullScreen ? cardInfoPropertieTextFullScreen : cardInfoPropertieText
          }
        >
          Quota:
        </Typography>
        <Typography
          sx={
            fullScreen
              ? cardInfoPropertieValueFullScreen
              : cardInfoPropertieValue
          }
        >
          {quota}
        </Typography>
      </Box>

      <Box sx={cardInfoPropertie}>
        <Typography
          sx={
            fullScreen ? cardInfoPropertieTextFullScreen : cardInfoPropertieText
          }
        >
          Units:
        </Typography>
        <CardCustomInput
          fullScreen={fullScreen}
          type="number"
          value={units}
          onChange={handleChangeUnits}
          disabled={unitsInputValidations(quota)}
        />
      </Box>
    </Box>
  );
};
