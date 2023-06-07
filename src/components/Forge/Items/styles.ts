import { SxProps } from "@mui/material";

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