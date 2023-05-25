import { SxProps } from "@mui/material";
import { CSSProperties } from "react";

export const supplyDescription: SxProps = {
  padding: "0.5vmax 0.5vmax",
  borderRadius: "3px",
  backgroundColor: "rgba(76, 76, 81, 0.47)",
};

export const supplyMintInfoContainer: SxProps = {
  display: "flex",
  justifyContent: "space-between",
};

export const supplyQuotaContainer: SxProps = {
  width: "25%",
  marginTop: "1vmax",
  marginLeft: "0.5vmax",
  display: "flex",
  flexFlow: "column",
  justifyContent: "center",
  alignItems: "center",
};

export const supplyInfoItemWrapper: SxProps = {
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

export const supplyInfoForm: SxProps = {
  width: "50%",
  margin: "0.1vmax 0",
  backgroundColor: "rgba(76, 76, 81, 0.3)",
  borderRadius: "3px",
  "& fieldset": { border: "none" },
  input: {
    border: "none !important",
    textAlign: "center",
    padding: "0.3vmax",
  },
};

export const supplyMintButtonContainer: SxProps = {
  marginTop: "1vmax",
  display: "flex",
  flexFlow: "column",
};

export const supplyTitle: SxProps = {
  margin: "1vmax 0",
};

export const supplyContainer: SxProps = {
  width: "100%",
  padding: "1vmax",
  display: "flex",
  justifyContent: "space-between",
  backgroundColor: "#27262D",
  borderRadius: "25px",
};

export const image: CSSProperties = {
  width: "100%",
  height: "100%",
};

export const supplyImageContainer: SxProps = {
  width: "50vmax",
  height: "100%",
  marginRight: "1vmax",
  position: "relative",
};
