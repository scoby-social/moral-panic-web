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

export const layersActionButtonsContainer: SxProps = {
  minHeight: "2.5vmax",
  display: "flex",
  justifyContent: "center",
  alignItems: "start",
};

export const layersActionbuttonsWrapper: SxProps = {
  display: "flex",
  flexFlow: "row",
  justifyContent: "center",
  alignItems: "center",
};

export const arrowWrapper: SxProps = {
  margin: "0 1.5vmax",
  display: "flex",
  justifyContent: "center",
  alignSelf: "center",
  backgroundColor: "#fff",
  borderRadius: "100%",
};

export const arrowIcons: SxProps = {
  width: "1vmax",
  height: "1vmax",
  fill: "#2F3841",
};

export const actionButtonsWrapper: SxProps = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

export const layerWrapper: SxProps = {
  display: "flex",
  flexFlow: "column",
  justifyContent: "center",
  alignItems: "center",
};

export const imageWrapper: SxProps = {
  width: "12vmax",
  height: "12vmax",
  position: "relative",
};

export const imageStyle: CSSProperties = {
  width: "100%",
  height: "100%",
};

export const circularProgress: SxProps = {
  width: "1vmax !important",
  height: "1vmax !important",
};
