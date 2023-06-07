import { SxProps } from "@mui/material";

export const container: SxProps = {
  width: "100%",
  display: "flex",
  flexFlow: "column",
  justifyContent: "center",
  alignItems: "center",
  alignSelf: "center",
};

export const wrapper: SxProps = {
  width: "100%",
  display: "flex",
  flexFlow: "column",
  justifyContent: "center",
  alignItems: "center",
};

export const forgeBackButtonWrapper: SxProps = {
  width: "80%",
  display: "flex",
  marginBottom: "1vmin",
  alignItems: "center",

  "&:hover": {
    cursor: "pointer",
  },
};

export const photoBoothWrapper: SxProps = {
  width: "80%",
  backgroundColor: "#27262D",
  borderRadius: "25px",

  padding: "2vmax 4vmax",
};

export const photoBoothContainer: SxProps = {
  padding: "2vmax",
};

export const photoBoothTitleWrapper: SxProps = {
  display: "flex",
  justifyContent: "space-between",
};

export const textWithMargin: SxProps = {
  margin: "0.50vmax 0",
};

export const photoBoothFooterWrapper: SxProps = {
  display: "flex",
  flexGrow: 1,
  flexFlow: "column",
};

export const mintButtonWrapper: SxProps = {
  marginTop: "1vmax",
  display: "flex",
  justifyContent: "center",
};

export const mintingMessageWrapper: SxProps = {
  marginTop: "1vmin",
  marginBottom: "1vmax",
  display: "flex",
  justifyContent: "center",
};

export const mintingMessage: SxProps = {
  maxWidth: "20%",
  textAlign: "center",
};

export const availabilityContainer: SxProps = {
  flexGrow: 1,
  marginTop: "2vmin",
  display: "flex",
  justifyContent: "center",
};

export const availabilityWrapper: SxProps = {
  minWidth: "20%",
  display: "flex",
  flexFlow: "column",
  justifyContent: "center",
  alignItems: "center",
};

export const availabilityDescription: SxProps = {
  maxWidth: "55%",
  textAlign: "center",
  fontWeight: "900",
};

export const buttonStyles: SxProps = {
  padding: "0.3vmax 0.5vmax",
  background: "#BEEF00 !important",
  borderRadius: "25px",
  fontFamily: "Poppins",
  color: "#262F36",
};

export const mintButton: SxProps = {
  padding: "0.3vmax 2.5vmax",
  opacity: 0.7,
  background: "#BEEF00 !important",
  borderRadius: "25px",
  fontFamily: "Poppins",
  color: "#262F36",
};

export const circularProgress: SxProps = {
  width: "2vmax !important",
  height: "2vmax !important",
};

export const headerWrapper: SxProps = {
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};
