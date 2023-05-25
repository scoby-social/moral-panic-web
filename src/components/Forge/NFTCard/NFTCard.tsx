import { Card, Box, Typography, Button } from "@mui/material";
import Image from "next/image";

import {
  image,
  mintButtonContainer,
  itemContainer,
  itemImageContainer,
  tokenInfoContainer,
  itemTitle,
} from "./styles";
import { NFTCardProps } from "./types";

const NFTCard = ({
  title,
  imageUrl,
  description,
  price,
  currency,
  buttonTitle,
  id,
}: NFTCardProps) => {
  return (
    <Card sx={itemContainer}>
      <Box sx={itemImageContainer}>
        <Image src={imageUrl} style={image} fill alt={id} />
      </Box>

      <Box sx={tokenInfoContainer}>
        <Box>
          <Typography sx={itemTitle} variant="h3" color="primary">
            {title}
          </Typography>
          <Typography variant="subtitle2">{description}</Typography>
        </Box>

        <Box sx={mintButtonContainer}>
          <Button variant="contained">{buttonTitle}</Button>
          <Typography variant="caption">
            <b>Unit Cost:</b>
            {price} {currency}
          </Typography>
          <Typography variant="caption">
            Plus a small SOL transaction Fee
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

export default NFTCard;
