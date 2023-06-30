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

interface CardPropertiesSellProps {
  amount: number;
  quota: number;
  units: number;
  price: number;
  volume: number;
  handleChanceUnits: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
}

export const CardPropertiesSell: FC<CardPropertiesSellProps> = ({
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
