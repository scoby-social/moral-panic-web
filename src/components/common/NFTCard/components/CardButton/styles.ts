import styled from "@emotion/styled";
import { SxProps, Button } from "@mui/material";

export const BaseButton = styled(Button)`
  margin: 0 auto;
  min-width: 36px !important;
  max-height: 2vmax !important;
  line-height: 0 !important;
  padding: 1vmax 1.5vmax;
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
    background-color: rgba(47, 47, 49, 1) !important;
    color: rgba(237, 234, 224, 0.5) !important;
    border: none !important;
  }

  @media (min-width: 768px) {
    min-width: 64px !important;
    padding: 1.2vmax 2vmax;
  }

  @media (min-width: 1140px) {
    border: solid 2px rgba(237, 234, 224, 1) !important;
    outline: solid 1px rgba(47, 47, 49, 1) !important;
  }
`;

export const BaseButtonFullScreen = styled(BaseButton)`
  padding: 1.4vmax 2.6vmax;

  @media (min-width: 768px) {
    padding: 2vmax 4vmax;
  }
`;

export const buttonText: SxProps = {
  fontFamily: "Patched",
  fontSize: {
    xs: ".8vmax !important",
    sm: "1vmax !important",
  },
  marginTop: {
    xs: "2px",
    sm: "4px",
  },
  lineHeight: 0,
};

export const buttonTextFullScreen: SxProps = {
  fontFamily: "Patched",
  fontSize: {
    xs: "1.2vmax !important",
    lg: "2vmax !important",
  },
  marginTop: "4px",
  lineHeight: 0,
};
