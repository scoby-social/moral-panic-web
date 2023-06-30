import styled from "@emotion/styled";
import { SxProps } from "@mui/material";
import Image from "next/image";

export const container: SxProps = {
  display: "flex",
  flexDirection: "column",
  flexWrap: "nowrap",
  alignItems: "center",
  textAlign: "center",
  padding: {
    xs: "1vmax",
  },
  minHeight: "50vh",
};

export const title: SxProps = {
  fontFamily: "Patched",
  marginBottom: ".5vmax",
  fontSize: {
    xs: "2vmax",
  },
};

export const textStyle: SxProps = {
  fontFamily: "Cabin",
  lineHeight: {
    xs: "1vmax",
    sm: "1vmax",
    lg: "1vmax",
  },
  fontSize: {
    xs: ".6vmax",
    sm: ".8vmax",
    lg: ".6vmax",
  },
  textOverflow: "ellipsis",
};

export const propertiesTextStyle: SxProps = {
  ...textStyle,
  textAlign: "start",
  marginTop: ".5vmax",
};

export const nftPropertie: SxProps = {
  fontSize: {
    xs: ".8vmax",
    sm: "1vmax",
    lg: ".8vmax",
  },
  fontWeight: "bold",
  color: "rgba(132, 132, 132, 1)",
  fontFamily: "Cabin",
  textAlign: "start",
};

export const propertieItem: SxProps = {
  marginTop: ".5vmax",
};

export const nftCard: SxProps = {
  borderRadius: "2vmax",
  border: "0.2vmax solid #191724",

  backgroundColor: "rgba(25, 23, 36, 1)",
  padding: {
    xs: "1.3vmax",
    sm: "1vmax",
  },
  width: "auto",
  maxWidth: "45%",
  display: "flex",
  flexDirection: {
    xs: "column",
    sm: "column",
  },
};

export const nftCardContainer: SxProps = {
  display: "flex",
  flexDirection: {
    xs: "row",
    sm: "row",
  },
  width: "100%",
};

export const nftTitle: SxProps = {
  ...title,
  color: "rgba(190, 239, 0, 1)",
  fontFamily: "Patched Prospect",
  fontWeight: "400",
  textAlign: "start",
  marginTop: {
    xs: "1vmax",
    sm: "0",
  },
  fontSize: {
    xs: "1vmax !important",
    sm: "1.2vmax !important",
  },
  marginBottom: "0px",
};

export const nftInformation: SxProps = {
  display: "flex",
  flexDirection: "column",
  paddingTop: {
    xs: "0",
    sm: ".8vmax",
  },

  paddingX: {
    xs: "0",
    sm: ".8vmax",
  },
};

export const propertiesContainer: SxProps = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridGap: ".5vmax",
  overflowY: "auto",
  maxHeight: {
    xs: "5.5vmax",
  },
};
export const firstPropertiesNft: SxProps = {
  ...propertieItem,
  gridColumnStart: "1",
  gridColumnEnd: "4",
};

export const lastPropertiesNft: SxProps = {
  ...propertieItem,
  gridColumnStart: "2",
  gridColumnEnd: {
    xs: "4",
    lg: "3",
  },
};

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

export const cardInfoContainer: SxProps = {
  bgcolor: "	rgba(139, 139, 139, 0.02)",
  border: "1px rgba(139, 139, 139, 0.02) solid",
  borderRadius: "1vmax",
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gridTemplateRows: "repeat(2)",
  marginTop: "1vmax",
};

export const cardInfoPropertie: SxProps = {
  display: "flex",
  flexDirection: "row",
  alignItem: "center",
};

export const cardInfoPropertieText: SxProps = {
  fontSize: ".8vmax  !important",
  textAlign: "center",
  fontFamily: "Cabin",
  display: "inline-flex",
  alignItems: "center",
};

export const cardInfoPropertieValue: SxProps = {
  fontSize: ".8vmax !important",
  fontFamily: "Cabin",
  marginLeft: ".5vmax",
};

export const cardInfoAction: SxProps = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around",
  paddingX: "6vmax",
  alignItems: "center",
  gridColumnStart: 1,
  gridColumnEnd: 4,
  gridRowStart: 1,
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

export const cardInfoNotificationText: SxProps = {
  marginTop: ".5vmax",
  fontWeight: "normal",
  fontFamily: "Cabin",
  fontSize: ".6vmax !important",
  justifyContent: "center",
  maxWidth: "47%",
};

export const NftImage = styled(Image)`
  width: 40%;
  height: auto;
`;
