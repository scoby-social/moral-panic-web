import { SxProps } from "@mui/material";


export const container: SxProps = {
  display: "flex",
  flexDirection: "column",
  flexWrap: 'nowrap',
  alignItems: 'center',
  textAlign: 'center',
  padding: {
    xs: '1vmax'
  },
  minHeight: '50vh',
}

export const title: SxProps = {
  fontFamily: 'Patched',
  marginBottom: '1vmax',
  fontSize: {
    xs: '2vmax'
  }
}

export const textStyle: SxProps = {
  fontFamily: 'Cabin',
  lineHeight: {
    xs: '1.4vmax',
    sm: '1.8vmax',
    lg: '1.5vmax'
  },
  fontSize: {
    xs: '1.3vmax',
    sm: '1.5vmax',
    lg: '1.3vmax'
  },
  textOverflow: 'ellipsis',
}

export const nftPropertie: SxProps = {
  fontSize: {
    xs: "1.5vmax",
    sm: "1.8vmax",
    lg: "1.6vmax"
  },
  fontWeight: "bold",
  color: "rgba(132, 132, 132, 1)",
  fontFamily: "Cabin",
  textAlign: "start",
};

export const propertieItem: SxProps = {
  marginTop: "1vmax",

};

export const nftCard: SxProps = {
  borderRadius: "2vmax",
  border: "0.2vmax solid #72767E",
  backgroundColor: "rgba(25, 23, 36, 1)",
  padding: {
    xs: "1.8vmax",
    sm: "1.5vmax"
  },
  width: "100%",
  display: "flex",
  flexDirection: {
    xs: 'column',
    sm: 'row'
  }
};

export const nftTitle: SxProps = {
  ...title,
  color: "rgba(190, 239, 0, 1)",
  fontFamily: "Patched-Prospect",
  fontWeight: "400",
  textAlign: "start",
  marginTop: {
    xs: "2vmax",
    sm: "0"
  },
  fontSize: {
    xs: "2vmax !important",
    sm: "2.9vmax !important",
  },
  marginBottom: "0px"
};


export const nftInformation: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  paddingTop: {
    xs: "0",
    sm: "1vmax"
  },

  paddingX: {
    xs: "0",
    sm: "1vmax"
  },
}

export const propertiesContainer: SxProps = {
  display: "grid",

  gridTemplateColumns: "repeat(3, 1fr)",
  gridGap: "1vmax",
  overflowY: 'auto',
  maxHeight: {
    xs: '23.5vmax',
    sm: '23.5vmax',
    lg: '23.5vmax',
  },

};

export const firstPropertiesNft: SxProps = {
  ...propertieItem,
  gridColumnStart: "1",
  gridColumnEnd: "4"
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
  fontFamily: 'Cabin',
  fontWeight: "400",
  textAlign: 'start',
  letterSpacing: '0.4px',
  fontSize: {
    xs: '1vmax',
    sm: '1.2vmax',
    lg: '1.1vmax'
  }
}

export const cardInfoContainer: SxProps = {
  bgcolor: "	rgba(139, 139, 139, 0.02)",
  border: "1px rgba(139, 139, 139, 0.02) solid",
  borderRadius: "1vmax",
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gridTemplateRows: "repeat(2)",
  marginTop: "2vmax",
}

export const cardInfoPropertie: SxProps = {
  display: "flex",
  flexDirection: "row",
  alignItem: "center",
}

export const cardInfoPropertieText: SxProps = {
  fontSize: "1.6vmax !important",
  textAlign: "center",
  fontFamily: "Cabin",
  display: "inline-flex",
  alignItems: "center",
}

export const cardInfoPropertieValue: SxProps = {
  fontSize: "1.6vmax !important",
  fontFamily: "Cabin",
  marginLeft: "1vmax",
}

export const cardInfoAction: SxProps = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gridColumnStart: 2,
  gridColumnEnd: 4,
  gridRowStart: 1,
}

export const cardInfoNotification: SxProps = {
  gridColumnStart: 1,
  gridColumnEnd: 3,
  gridRowStart: 2,
  marginTop: "1vmax",
  fontWeight: "bold",
  fontFamily: "Cabin",
  fontSize: "1.4vmax",
}