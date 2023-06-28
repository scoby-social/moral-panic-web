import { SxProps } from "@mui/material";
import { CSSProperties } from "react";

export const layersContainer: SxProps = {
  width: "80%",
  maxHeight: "15vmax",
  overflowY: "auto",
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  alignItems: "center",
};

export const layerWrapper: SxProps = {
  margin: "1vmax",
  padding: "1vmax",
  borderRadius: "14px",
  display: "flex",
  flexFlow: "column",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(217, 217, 217, 0.05)",
  border: "1px solid rgba(255, 255, 255, 0.1)",

  "&:hover": {
    cursor: "pointer",
  },
};

export const imageWrapper = (selected: boolean): SxProps => ({
  width: "6vmax",
  height: "6vmax",
  position: "relative",
});

export const captionTextColor: SxProps = {
  marginTop: "0.5vmax",
  color: "rgba(255, 255, 255, 0.8)",
  userSelect: "none",
};

export const imageStyle: CSSProperties = {
  width: "100%",
  height: "100%",
};
