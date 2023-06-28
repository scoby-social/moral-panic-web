import { SxProps } from "@mui/material";
import { CSSProperties } from "react";

export const headerBoxWithImageWrapper = (hasImage: boolean): SxProps => {
  const style: SxProps = {
    width: "100%",
    height: hasImage ? "50vh" : "20vh",
  };

  if (hasImage) {
    style.background = `url(/hellbenders_wallpaper.png)`;
    style.backgroundRepeat = "no-repeat";
    style.backgroundSize = "cover";
  }

  return style;
};

export const headerContentWrapper: SxProps = {
  height: "100%",
  display: "flex",
  padding: "3vmin",
  flexFlow: "column",
};

export const headerTopContent: SxProps = {
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
};

export const searchBarWrapper: SxProps = {
  display: "flex",
  justifyContent: "center",
};

export const leaderboardContentWrapper = (isProfile: boolean): SxProps => {
  const styles = {
    width: "80%",
    height: "100%",
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexFlow: "column",
    alignSelf: "center",
  };

  if (isProfile) styles.alignSelf = "center";

  return styles;
};

export const leaderboardText: SxProps = {
  fontFamily: 'Patched Prospect',
  letterSpacing: "0.2vmax",
  textAlign: "center",
  userSelect: "none",
  fontWeight: 400
};

export const headerImageWrapper: SxProps = {
  width: "8vmax",
  height: "4vmax",
  position: "relative",
};

export const imageStyle: CSSProperties = {
  width: "100%",
  height: "100%",
  cursor: "pointer",
};

export const buttonWrapper: SxProps = {
  width: "10vmax",
};
