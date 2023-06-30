import { FC } from "react";

import { Box, Typography } from "@mui/material";
import {
  CardCustomInput,
  cardInfoPropertie,
  cardInfoPropertieText,
  cardInfoPropertieValue,
} from "./styles";
import { CardPropertiesBuyProps } from "../types/cardPropertiesBuyProps";

export const CardPropertiesBuy: FC<CardPropertiesBuyProps> = ({
  amount,
  quota,
  units,
  handleChanceUnits,
}) => (
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
      <CardCustomInput
        type="number"
        value={units}
        onChange={handleChanceUnits}
      />
    </Box>
  </Box>
);
