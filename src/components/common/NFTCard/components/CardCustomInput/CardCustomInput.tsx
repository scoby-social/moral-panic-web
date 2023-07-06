import { FC } from "react";
import { TextField, TextFieldProps } from "@mui/material";
import { buttonStyle, buttonStyleFullScreen } from "./styles";
import { CardCustomInputProps } from "./types/CardCustomInputProps";

export const CardCustomInput: FC<CardCustomInputProps & TextFieldProps> = ({
  fullScreen = false,
  ...props
}) => {
  return (
    <TextField
      {...props}
      sx={fullScreen ? buttonStyleFullScreen : buttonStyle}
    />
  );
};
