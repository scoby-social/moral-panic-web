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
  fontFamily: "Cabin",
};

export const tabContainer: SxProps = {
  width: "100%",
  padding: {
    xs: "1vmax",
    sm: "5vmax",
    lg: "3vmax 8vmax 8vmax 8vmax",
  },
};

export const nftListStyle: SxProps = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
};
