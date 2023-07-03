import { SxProps } from "@mui/material";

export const container: SxProps = {
  display: "flex",
  flexDirection: "column",
  flexWrap: "nowrap",
  background: `url(https://storage.googleapis.com/hellbenders-public-c095b-assets/hellbendersWebAssets/the_deal_wallpaper.png)`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  minHeight: "100vmax",
};

export const subContainer: SxProps = {
  marginTop: "4vmax",
  display: "flex",
  flexDirection: "column",
  flexWrap: "nowrap",
  alignItems: "center",
  textAlign: "center",
  height:'100%'
};

export const title: SxProps = {
  fontFamily: "Patched",
  marginBottom: "1vmax",
  fontSize: {
    xs: "2vmax",
  },
};

export const textStyle: SxProps = {
  fontFamily: "Cabin",
  marginTop: "1.5vmax",
  maxWidth: {
    xs: "31vmax !important",
    sm: "40vmax !important",
    lg: "50vmax !important",
  },
  fontSize: {
    xs: "1.5vmax",
    sm: "1.8vmax",
    lg: "1.6vmax",
  },
};
