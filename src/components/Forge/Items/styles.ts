import { SxProps } from "@mui/material";
import { CSSProperties } from "react";

export const pageWrapper: SxProps = {
  display: "flex",
  flexFlow: "column",
  justifyContent: "center",
  alignItems: "center",
};

export const container: SxProps = {
  maxWidth: "1300px",
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
  width: "80%",
  height: "100%",
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

export const cardItemContainer: SxProps = {
  margin: "5vmax",
  display: "grid",
  justifyItems: "center",
  gridTemplateColumns: {
    xs: "auto",
    md: "repeat(2, 1fr)",
  },
  gridGap: "3vmax",
};
