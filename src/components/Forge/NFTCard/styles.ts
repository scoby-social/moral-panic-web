import { SxProps } from "@mui/material";
import { CSSProperties } from "react";

export const itemTitle: SxProps = {
  margin: "1vmax 0",
};

export const itemDescription: SxProps = {
  padding: "0.5vmax",
  borderRadius: "3px",
  backgroundColor: "rgba(76, 76, 81, 0.17)",
};

export const itemContainer: SxProps = {
  width: "100%",
  height: "20vmax",
  padding: "1vmax",
  display: "flex",
  justifyContent: "space-between",
  backgroundColor: "#27262D",
  borderRadius: "25px",
};

export const tokenInfoContainer: SxProps = {
  maxWidth: "60%",
  display: "flex",
  flexFlow: "column",
  justifyContent: "space-between",
};

export const itemImageContainer: SxProps = {
  width: "50%",
  height: "100%",
  marginRight: "1vmax",
  position: "relative",
};

export const image: CSSProperties = {
  width: "100%",
  height: "100%",
};

export const mintButtonContainer: SxProps = {
  marginTop: "1vmax",
  display: "flex",
  flexFlow: "column",
  alignSelf: "center",
  justifyContent: "center",
  alignItems: "center",
};

export const lockedTextStyles: SxProps = {
  maxWidth: {
    md: "70%",
    xs: "80%",
  },
  textAlign: "center",
  marginTop: "1vmax",
};
