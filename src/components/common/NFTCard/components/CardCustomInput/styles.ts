import { SxProps } from "@mui/material";

export const buttonStyle: SxProps = {
  marginLeft: ".5vmax !important",
  maxWidth: "3vmax",
  backgroundColor: "transparent",
  "& fieldset": { border: "none" },
  input: {
    border: "none !important",
    textAlign: "center",
    padding: "0.3vmax",
    fontFamily: "Cabin",
    fontSize: ".8vmax !important",
  },

  "& .MuiInputBase-input.Mui-disabled": {
    WebkitTextFillColor: "rgba(217, 217, 217, 0.20)",
  },

  "& .MuiOutlinedInput-root": {
    border: "none",
    borderBottom: ".2vmax solid rgba(163, 163, 163, 1)",
  },
};

export const buttonStyleFullScreen: SxProps = {
  ...buttonStyle,
  input: {
    border: "none !important",
    textAlign: "center",
    padding: "0.3vmax",
    fontFamily: "Cabin",
    fontSize: {
      xs: "1vmax !important",
      lg: "1.4vmax !important",
    },
  },
};
