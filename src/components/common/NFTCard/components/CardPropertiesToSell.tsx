import { FC } from "react";
import { Box, Typography } from "@mui/material";
import {
  CardCustomInput,
  cardInfoPropertie,
  cardInfoPropertieText,
  cardInfoPropertieValue,
  sellPropertiesContainer,
  sellPropertiesContainerLeftSide,
  sellPropertiesContainerRightSide,
} from "./styles";
import { CardPropertiesToSellProps } from "../types";
import { unitsInputValidations } from "../utils/unitsInputValidations";

export const CardPropertiesSell: FC<CardPropertiesToSellProps> = ({
  amount,
  quota,
  units,
  price,
  volume,
  handleChanceUnits,
}) => (
  <Box sx={sellPropertiesContainer}>
    <Box sx={sellPropertiesContainerLeftSide}>
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
          disabled={unitsInputValidations(quota)}
        />
      </Box>
    </Box>
    <Box sx={sellPropertiesContainerRightSide}>
      <Box sx={cardInfoPropertie}>
        <Typography sx={cardInfoPropertieText}>Last Sale:</Typography>
        <Typography sx={cardInfoPropertieValue}>{`${price} USDC`}</Typography>
      </Box>

      <Box sx={cardInfoPropertie}>
        <Typography sx={cardInfoPropertieText}>24hr Volume:</Typography>
        <Typography sx={cardInfoPropertieValue}>{`${volume} `}</Typography>
      </Box>
    </Box>
  </Box>
);
