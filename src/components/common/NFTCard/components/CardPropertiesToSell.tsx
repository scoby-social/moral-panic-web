import { FC } from "react";
import { Box, Typography } from "@mui/material";
import {
  cardInfoPropertie,
  cardInfoPropertieText,
  cardInfoPropertieTextFullScreen,
  cardInfoPropertieValue,
  cardInfoPropertieValueFullScreen,
  sellPropertiesContainer,
  sellPropertiesContainerLeftSide,
  sellPropertiesContainerRightSide,
} from "./styles";
import { CardPropertiesToSellProps } from "../types";
import { unitsInputValidations } from "../utils/unitsInputValidations";
import { CardCustomInput } from "./CardCustomInput/CardCustomInput";

export const CardPropertiesSell: FC<CardPropertiesToSellProps> = ({
  amount,
  quota,
  units,
  price,
  volume,
  fullScreen = false,
  handleChangeUnits,
}) => (
  <Box sx={sellPropertiesContainer}>
    <Box sx={sellPropertiesContainerLeftSide}>
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
    <Box sx={sellPropertiesContainerRightSide}>
      <Box sx={cardInfoPropertie}>
        <Typography
          sx={
            fullScreen ? cardInfoPropertieTextFullScreen : cardInfoPropertieText
          }
        >
          Last Sale:
        </Typography>
        <Typography
          sx={
            fullScreen
              ? cardInfoPropertieValueFullScreen
              : cardInfoPropertieValue
          }
        >{`${price} USDC`}</Typography>
      </Box>

      <Box sx={cardInfoPropertie}>
        <Typography
          sx={
            fullScreen ? cardInfoPropertieTextFullScreen : cardInfoPropertieText
          }
        >
          24hr Volume:
        </Typography>
        <Typography
          sx={
            fullScreen
              ? cardInfoPropertieValueFullScreen
              : cardInfoPropertieValue
          }
        >{`${volume} `}</Typography>
      </Box>
    </Box>
  </Box>
);
