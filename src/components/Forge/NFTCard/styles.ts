import { SxProps } from "@mui/material";
import { CSSProperties } from "react";

export const itemTitle: SxProps = {
  margin: "1vmax 0",
};

export const itemContainer: SxProps = {
  width: "100%",
  padding: "1vmax",
  display: "flex",
  justifyContent: "space-between",
  backgroundColor: "#27262D",
  borderRadius: "25px",
};

export const tokenInfoContainer: SxProps = {
  display: "flex",
  flexFlow: "column",
  justifyContent: "space-between",
};

export const itemImageContainer: SxProps = {
  width: "50vmax",
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
