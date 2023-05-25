import styled from "@emotion/styled";
import { SxProps } from "@mui/material";

import { PhotoBoothFormStyleProps } from "./types";

export const formContainer: SxProps = {
  padding: "2vmax 4vmax",
  backgroundColor: "#27262D",
  display: "flex",
  flexFlow: "column",
  justifyContent: "space-around",
};

export const container: SxProps = {
  width: "100%",
  display: "flex",
  flexFlow: "column",
};

export const formWrapper: SxProps = {
  margin: "1.5vmax 0",
  display: "flex",
  flex: 1,
  justifyContent: "flex-start",
  flexFlow: "column",
};

export const formWrapperWithoutMargin: SxProps = {
  display: "flex",
  flex: 1,
  justifyContent: "flex-start",
  flexFlow: "column",
};

export const roleFieldWrapper: SxProps = {
  marginLeft: "1.5vmax",
  display: "flex",
  justifyContent: "space-between",
};

export const textWithMargin: SxProps = {
  margin: "0.50vmax 0",
};

export const FormElement = styled.form<PhotoBoothFormStyleProps>`
  align-self: center;
  width: ${props => (props.isMobile ? "100%" : "80%")};
  border-radius: 15px;
`;

export const helperText: SxProps = {
  color: "rgba(255, 255, 255, 0.4)",
  marginBottom: "0.50vmax",
};

export const tooltip: SxProps = {
  width: "1.5vmax",
  height: "1.5vmax",
  marginLeft: "0.2vmin",
  alignSelf: "flex-start",
};

export const superheroIdentityWrapper: SxProps = {
  display: "flex",
};

export const roleFormFields: SxProps = {
  maxWidth: "33%",
};

export const formGridGroup: SxProps = {
  padding: "0 0.5vmax",
};

export const identityFooterWrapper: SxProps = {
  display: "flex",
  justifyContent: "center",
  flexGrow: 1,
};

export const mintButtonWrapper: SxProps = {
  marginTop: "1vmax",
  display: "flex",
  justifyContent: "center",
};

export const mintButton: SxProps = {
  padding: "0.3vmax 2.5vmax",
  opacity: 0.7,
  background: "#BEEF00 !important",
  borderRadius: "25px",
  fontFamily: "Poppins",
  color: "#262F36",
};

export const forgeBackButtonWrapper: SxProps = {
  display: "flex",
  marginBottom: "1vmin",
  alignItems: "center",

  "&:hover": {
    cursor: "pointer",
  },
};
