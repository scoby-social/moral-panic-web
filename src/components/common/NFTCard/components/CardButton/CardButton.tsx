import React, { FC } from "react";
import Image from "next/image";
import { Badge, Typography } from "@mui/material";

import useCheckMobileScreen from "lib/hooks/useCheckMobileScreen";
import {
  BaseButton,
  BaseButtonFullScreen,
  buttonText,
  buttonTextFullScreen,
} from "./styles";
import { CardButtonProps } from "./types/CardButtonProps";

export const CardButton: FC<CardButtonProps> = ({
  children,
  fullScreen = false,
  ...props
}) => {
  const isMobile = useCheckMobileScreen();
  const { disabled } = props;

  if (props.disabled) {
    return (
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
        {fullScreen && (
          <BaseButtonFullScreen variant="contained" disabled={disabled}>
            <Typography sx={buttonTextFullScreen}>{children}</Typography>
          </BaseButtonFullScreen>
        )}

        {!fullScreen && (
          <BaseButton variant="contained" disabled={disabled}>
            <Typography sx={buttonText}>{children}</Typography>
          </BaseButton>
        )}
      </Badge>
    );
  }

  return (
    <>
      {fullScreen && (
        <BaseButtonFullScreen {...props}>
          <Typography sx={buttonTextFullScreen}>{children}</Typography>
        </BaseButtonFullScreen>
      )}

      {!fullScreen && (
        <BaseButton {...props}>
          <Typography sx={buttonText}>{children}</Typography>
        </BaseButton>
      )}
    </>
  );
};
