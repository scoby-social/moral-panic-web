import { SxProps } from "@mui/material";
import { CSSProperties } from "react";

export const featuredCardStyles: SxProps = {
  padding: "1vmax",
  display: "flex",
  flexFlow: {
    xs: "column",
    md: "row",
  },
  justifyContent: "space-between",
  backgroundColor: "#191724",
  borderRadius: "25px",
  border: "1px solid #8B8B8B",
};

export const featuredCardMetadata: SxProps = {
  marginTop: "2vmax",
  display: "flex",
  justifyContent: "space-around",
  flexWrap: "wrap",
};

export const featuredImageWrapper: SxProps = {
  width: "100%",
  height: {
    md: "auto",
    xs: "20vmax",
  },
  marginRight: {
    md: "2vmax",
    xs: "0",
  },
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export const featuredImageContainer: SxProps = {
  width: {
    md: "100%",
    xs: "80%",
  },
  height: "100%",
  position: "relative",
};

export const image: CSSProperties = {
  width: "100%",
  height: "100%",
};

export const featuredCardActionsContainer: SxProps = {
  width: "100%",
  marginTop: "2vmax",
  padding: "1vmax 1vmax 0.5vmax 1vmax",
  borderRadius: "8px",
  border: "1px solid #565656",
  backgroundColor: "#1E1D2A",
  display: "flex",
  flexFlow: "column",
  justifyContent: "space-around",
  alignItems: "center",
};

export const featuredCardActionsWrapper: SxProps = {
  width: "100%",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
};

export const resultText: SxProps = {
  maxWidth: "80%",
  marginTop: "1vmax",
  textAlign: "center",
};

export const featuredFormContainer: SxProps = {
  display: "flex",
  flexFlow: "column",
};

export const mintButtonContainer: SxProps = {
  display: "flex",
  flexFlow: "column",
  alignSelf: "center",
  alignItems: "start",
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

  "& .MuiInputBase-input.Mui-disabled": {
    WebkitTextFillColor: "rgba(217, 217, 217, 0.20)",
  },
};
