import { SxProps } from "@mui/material";

export const pageWrapper: SxProps = {
  display: "flex",
  flexFlow: "column",
  justifyContent: "center",
  alignItems: "center",
};

export const container: SxProps = {
  maxWidth: "1500px",
  margin: "2vmax 5vmax",
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

export const loadingContainer: SxProps = {
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
