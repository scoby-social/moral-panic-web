import { ButtonProps } from "@mui/material";
import { PropsWithChildren } from "react";

export interface CardButtonProps extends PropsWithChildren, ButtonProps {
  fullScreen?: boolean;
}
