import { SxProps } from "@mui/material";
import { CSSProperties } from "react";

export const pageWrapper: SxProps = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export const container: SxProps = {
  maxWidth: "1500px",
  margin: "2vmax 5vmax",
};

export const featuredCardStyles: SxProps = {
  padding: "1vmax",
  display: "flex",
  justifyContent: "space-between",
  backgroundColor: "#383740",
  borderRadius: "25px",
  border: "1px solid #8B8B8B",
};

export const featuredCardMetadata: SxProps = {
  display: "flex",
  justifyContent: "space-around",
  flexWrap: "wrap",
};

export const featuredImageContainer: SxProps = {
  width: "60%",
  height: "100%",
  marginRight: "1vmax",
  position: "relative",
};

export const image: CSSProperties = {
  width: "100%",
  height: "100%",
};
