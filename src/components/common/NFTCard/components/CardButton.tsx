import React, { FC, PropsWithChildren } from "react";
import styled from "@emotion/styled";
import { Button, ButtonProps, SxProps, Typography } from "@mui/material";

type CustomButtomProps = {};

const BaseButton = styled(Button)`
  max-height: 2vmax !important;
  line-height: 0 !important;
  padding: 1vmax 2vmax;
  border-radius: 0.2vmax;
  color: #fff;
  border: solid 1px rgba(237, 234, 224, 1) !important;
  outline: solid 0.5px rgba(47, 47, 49, 1) !important;
  text-align: center;
  display: flex;
  align-items: center;
  background-color: #076936;
  &:focus {
    background-color: #0b9252;
  }
  &:hover {
    background-color: #004200;
  }
  &.Mui-disabled {
    background-color: rgba(82, 82, 82, 1) !important;
    color: #fff !important;
  }

  @media (min-width: 1140px) {
    border: solid 2px rgba(237, 234, 224, 1) !important;
    outline: solid 1px rgba(47, 47, 49, 1) !important;
  }
`;

const buttonText: SxProps = {
  fontFamily: "Patched",
  fontSize: "1vmax !important",
  marginTop: "4px",
  lineHeight: 0,
};

export const CardButton: FC<
  CustomButtomProps & PropsWithChildren & ButtonProps
> = ({ children, ...props }) => {
  return (
    <BaseButton {...props}>
      <Typography sx={buttonText}>{children}</Typography>
    </BaseButton>
  );
};