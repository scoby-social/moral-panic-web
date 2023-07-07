import { SxProps } from "@mui/material";

export const subContainer: SxProps = {
  display: "flex",
  flexDirection: "column",
  flexWrap: "nowrap",
  alignItems: "center",
  textAlign: "center",

  minHeight: "50vh",
};

export const title: SxProps = {
  fontFamily: "Patched",
  marginBottom: "1vmax",
  fontSize: {
    xs: "2vmax",
  },
};

export const tabHeader: SxProps = {
  borderBottom: 1,
  borderColor: "divider",
  width: "100%",
};

export const titleDeal: SxProps = {
  ...title,
  marginBottom: {
    xs: "1vmax",
    sm: "5vmax",
    lg: "3vmax 8vmax 8vmax 8vmax",
  },
  maxWidth: {
    xs: "60%",
    lg: "100%",
  },
  fontSize: {
    xs: "1.4vmax",
    sm: "1.6vmax",
    lg: "2vmax",
  },
  fontFamily: "Cabin",
};

export const tabContainer: SxProps = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: {
    xs: "1vmax",
    sm: "5vmax",
    lg: "3vmax 8vmax 8vmax 8vmax",
  },
};

export const nftListStyle: SxProps = {
  display: "flex",
  flexDirection: {
    xs: "column",
    lg: "row",
  },
  alignItems: {
    xs: "center",
    lg: "flex-start",
  },
  flexWrap: "wrap",
  justifyContent: "space-between",
};
