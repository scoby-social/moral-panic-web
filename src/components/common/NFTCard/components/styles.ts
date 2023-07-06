import { SxProps } from "@mui/material";

import { messageType } from "../types/notificationsMessage";

export const priceText: SxProps = {
  fontFamily: "Cabin",
  fontWeight: "400",
  textAlign: "start",
  letterSpacing: "0.4px",
  fontSize: {
    xs: ".5vmax",
    sm: ".7vmax",
    lg: ".5vmax",
  },
};

export const unitText: SxProps = {
  ...priceText,
  textAlign: "center",
};

export const cardActionsContainer: SxProps = {
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
};

export const propertiePriceText: SxProps = {
  ...priceText,
  textAlign: "center",
  marginTop: "0.1vmax",
};

export const titlePropertiePriceText: SxProps = {
  ...priceText,
  textAlign: "center",
  marginTop: "0.1vmax",
  fontSize: {
    xs: ".4vmax",
    sm: ".6vmax",
    lg: ".4vmax",
  },
};

export const cardInfoAction: SxProps = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around",
  paddingX: {
    xs: "1vmax",
    lg: "6vmax",
  },
  alignItems: "center",
  gridColumnStart: 1,
  gridColumnEnd: 4,
  gridRowStart: 1,
};

export const cardInfoContainer: SxProps = {
  bgcolor: "	rgba(139, 139, 139, 0.02)",
  border: "1px rgba(139, 139, 139, 0.02) solid",
  borderRadius: "1vmax",
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gridTemplateRows: "repeat(2)",
  marginTop: "1vmax",
};

export const cardInfoNotificationText: SxProps = {
  marginTop: ".5vmax",
  fontWeight: "normal",
  fontFamily: "Cabin",
  fontSize: ".6vmax !important",
  justifyContent: "center",
  maxWidth: {
    xs: "65%",
    sm: "40%",
    lg: "47%",
  },
};

export const cardInfoPropertieText: SxProps = {
  fontSize: ".8vmax  !important",
  textAlign: "center",
  fontFamily: "Cabin",
  display: "inline-flex",
  alignItems: "center",
};

export const cardInfoNotification: SxProps = {
  gridColumnStart: 1,
  gridColumnEnd: 3,
  gridRowStart: 2,
  marginTop: ".5vmax",
  fontWeight: "bold",
  fontFamily: "Cabin",
  fontSize: ".6vmax",
  textAlign: "center",
  display: "flex",
  justifyContent: "center",
};

export const actionContainer: SxProps = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
};

export const cardInfoPropertie: SxProps = {
  display: "flex",
  flexDirection: "row",
  alignItem: "center",
};

export const cardInfoPropertieValue: SxProps = {
  fontSize: ".8vmax !important",
  fontFamily: "Cabin",
  marginLeft: ".5vmax",
};

export const sellPropertiesContainer: SxProps = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
};

export const sellPropertiesContainerRightSide: SxProps = {
  width: "55%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
};

export const sellPropertiesContainerLeftSide: SxProps = { width: "45%" };

export const transactionTextColor = (transactionType: messageType) => {
  if (
    transactionType === messageType.buySuccess ||
    transactionType === messageType.sellSuccess
  ) {
    return "rgba(190, 239, 0, 1)";
  }

  if (
    transactionType === messageType.buyLimit ||
    transactionType === messageType.hasFakeId
  ) {
    return "#FAD326";
  }

  return "rgba(255, 113, 11, 1)";
};

// * FullScreen Styles
export const cardInfoPropertieTextFullScreen: SxProps = {
  fontSize: {
    xs: "1vmax  !important",
    lg: "1.4vmax  !important",
  },
  textAlign: "center",
  fontFamily: "Cabin",
  display: "inline-flex",
  alignItems: "center",
};

export const cardInfoPropertieValueFullScreen: SxProps = {
  fontSize: {
    xs: "1vmax  !important",
    lg: "1.4vmax  !important",
  },
  fontFamily: "Cabin",
  marginLeft: ".5vmax",
};

export const cardInfoActionFullScreen: SxProps = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  paddingX: {
    xs: "1vmax",
    lg: "6vmax",
  },
  alignItems: "center",
  gridColumnStart: 1,
  gridColumnEnd: 4,
  gridRowStart: 1,
};

export const cardInfoNotificationTextFullScreen: SxProps = {
  marginTop: "2vmax",
  fontWeight: "normal",
  fontFamily: "Cabin",
  fontSize: {
    xs: ".8vmax !important",
    sm: "1vmax !important",
    lg: "1.2vmax !important",
  },
  justifyContent: "center",
  maxWidth: {
    xs: "80%",
  },
};

export const priceTextFullScreen: SxProps = {
  fontFamily: "Cabin",
  fontWeight: "400",
  textAlign: "start",
  letterSpacing: "0.4px",
  fontSize: {
    xs: ".8vmax",
    sm: "1vmax",
    lg: ".8vmax",
  },
};

export const propertiePriceTextFullScreen: SxProps = {
  ...priceTextFullScreen,
  textAlign: "center",
  marginTop: "0.1vmax",
};

export const unitTextFullScreen: SxProps = {
  ...priceTextFullScreen,
  textAlign: "center",
};

export const titlePropertiePriceTextFullScreen: SxProps = {
  ...priceTextFullScreen,
  textAlign: "center",
  marginTop: "0.1vmax",
  fontSize: {
    xs: ".8vmax",
    sm: "1vmax",
    lg: ".8vmax",
  },
};

export const actionContainerFullScreen: SxProps = {
  display: "flex",
  flexDirection: "column",
  justifyContent: {
    xs: "center",
    sm: '"flex-start"',
  },
};

