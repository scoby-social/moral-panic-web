import React, { FC, PropsWithChildren } from "react";
import styled from "@emotion/styled";
import { Button, ButtonProps, SxProps, Typography } from "@mui/material";

type CustomButtomProps = {};

const BaseButton = styled(Button)`
  max-height: 3vmax;
  background-color: #076936;
  line-height: 0 !important;
  padding: 2.5vmax 4.5vmax;
  border-radius: 0.6vmax;
  color: #fff;
  border: solid 1px #000 !important;
  text-align: center;
  display: flex;
  align-items: center;
  &:focus {
    background-color: #076936;
  }
  &:hover {
    background-color: #1a1f2e;
  }
`;

const buttonText: SxProps = {
  fontFamily: "Patched",
  fontSize: "1.6vmax !important",
};

export const CustomButton: FC<
  CustomButtomProps & PropsWithChildren & ButtonProps
> = ({ children }) => {
  return (
    <BaseButton>
      <Typography sx={buttonText}>{`ALL SET!`}</Typography>
    </BaseButton>
  );
};
