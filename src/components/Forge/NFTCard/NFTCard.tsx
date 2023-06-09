import { Card, Box, Typography, Button, Badge } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

import useCheckMobileScreen from "lib/hooks/useCheckMobileScreen";

import {
  image,
  mintButtonContainer,
  itemContainer,
  itemImageContainer,
  tokenInfoContainer,
  itemTitle,
  itemDescription,
  lockedTextStyles,
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
  locked,
  lockedText,
}: NFTCardProps) => {
  const isMobile = useCheckMobileScreen();
  const router = useRouter();

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
          <Box sx={itemDescription}>
            <Typography variant="subtitle2">{description}</Typography>
          </Box>
        </Box>

        <Box sx={mintButtonContainer}>
          {locked ? (
            <Badge
              badgeContent={
                <Image
                  src={
                    "https://storage.googleapis.com/hellbenders-public-c095b-assets/hellbendersWebAssets/lock.svg"
                  }
                  alt="lock"
                  width={isMobile ? 20 : 40}
                  height={isMobile ? 20 : 40}
                />
              }
            >
              <Button variant="contained" disabled={locked}>
                {buttonTitle}
              </Button>
            </Badge>
          ) : (
            <Button
              onClick={e => {
                e.preventDefault();
                router.push("/forge/identity", {
                  forceOptimisticNavigation: true,
                });
              }}
              variant="contained"
              disabled={locked}
            >
              {buttonTitle}
            </Button>
          )}
          {price && currency && (
            <>
              <Typography variant="caption">
                <b>Unit Cost: </b>
                {price} {currency}
              </Typography>
              <Typography variant="caption">
                Plus a small SOL transaction Fee
              </Typography>
            </>
          )}
          {locked && lockedText && (
            <Typography
              sx={lockedTextStyles}
              variant="subtitle2"
              color="#FF710B"
            >
              {lockedText}
            </Typography>
          )}
        </Box>
      </Box>
    </Card>
  );
};

export default NFTCard;
