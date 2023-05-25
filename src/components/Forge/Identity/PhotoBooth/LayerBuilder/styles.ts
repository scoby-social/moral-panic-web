import { SxProps } from "@mui/material";
import { CSSProperties } from "react";

export const layerBuilderWrapper: SxProps = {
  padding: "1.5vmax 1vmax",
  border: "1px dashed #5B608C",
  borderRadius: "8px",
};

export const layersContainer: SxProps = {
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
};

export const actionButtonsWrapper: SxProps = {
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
};

export const layerWrapper: SxProps = {
  display: "flex",
  flexFlow: "column",
  justifyContent: "center",
  alignItems: "center",
};

export const imageContainer: SxProps = {
  display: "flex",
  flexFlow: "column",
  justifyContent: "center",
  alignItems: "center",
};

export const imageWrapper: SxProps = {
  width: "12vmax",
  height: "12vmax",
  position: "relative",
  margin: "auto",
};

export const imageStyle: CSSProperties = {
  width: "100%",
  height: "100%",
};

export const circularProgress: SxProps = {
  width: "1vmax !important",
  height: "1vmax !important",
};

export const buttonStyles: SxProps = {
  width: "8%",
  padding: "0.3vmax 0.5vmax",
  borderRadius: "25px",
  fontFamily: "Poppins",
  background: "#485364",
};

export const revertButton: SxProps = {
  width: "8%",
  padding: "0.3vmax 0.5vmax",
  borderRadius: "25px",
  fontFamily: "Poppins",

  "&.Mui-disabled": {
    backgroundColor: "transparent !important",
  },
};

export const layerCropSquare: SxProps = {
  padding: "3.5vmax 3.5vmax",
  position: "absolute",
  zIndex: 2,
  border: "1px solid rgba(190, 239, 0, 1)",
  borderRadius: 2,
  top: "2px",
  left: "2.5vmax",
};

export const layerExceptionCaption: SxProps = {
  marginTop: "0.5vmax",
  color: "rgba(255, 255, 255, 0.8)",
  maxWidth: "250px",
  margin: "1vmax 0",
  textAlign: "center",
  userSelect: "none",
};
