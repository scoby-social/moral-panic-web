import styled from "@emotion/styled";
import { Button, Typography, SxProps } from "@mui/material";
import React from "react";

const textStyle: SxProps = {
  fontFamily: "Patched",
  fontSize: {
    xs: "1.4vmax",
    lg: "1.2vmax",
  },
  color: "#fff",
};

const WoodenButton = styled(Button)`
  max-height: 3vmax;
  background-color: #076936;
  line-height: 0 !important;
  padding: 2.4vmax 3vmax;
  border-radius: 3px;
  color: #fff;
  border: solid 1px #000;
  &:focus {
    background-color: #076936;
  }

  &:hover {
    background-color: #1a1f2e;
  }

  @media (min-width: 769px) {
    padding: 2vmax 2.2vmax;
  }
`;
export const WoodenNickelButton = () => {
  return (
    <WoodenButton type="button" variant="contained">
      <Typography sx={textStyle}>{`COP A WOODEN NICKEL`}</Typography>
    </WoodenButton>
  );
};
