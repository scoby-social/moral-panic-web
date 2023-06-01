import { SxProps } from "@mui/material";
import { CSSProperties } from "react";


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
  marginTop: '1.5vmax',
  fontSize: {
    xs: '1.5vmax',
    sm: '1.8vmax',
    lg: '1.3vmax'
  }
}

export const nftPropertie: SxProps = {
  fontSize: {
    xs: "1.6vmax",
    sm: "2vmax",
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
  backgroundColor: "rgba(21, 30, 37, 1)",
  padding: {
    xs: "1.8vmax",
    sm: "4vmax",
    lg: "4vmax 8vmax",
  },
  width: "100%",
};

export const nftTitle: SxProps = {
  ...title,
  color: "rgba(190, 239, 0, 1)",
  fontFamily: "Patched-Prospect",
  fontWeight: "400",
  fontSize: {
    xs: "2.5vmax !important",
    sm: "4.5vmax !important"
  },
  marginBottom: {
    xs: "2vmax",
    sm: "3vmax"
  }
};

export const propertiesContainer: SxProps = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridGap: "1vmax",
  gridAutoRows: "minmax(1vmax, auto)",
  marginTop: '2vmax',
  marginBottom: {
    xs: "4vmax",
    lg: "8vmax",
  }
};

export const lastPropertiesNft: SxProps = {
  ...propertieItem,

  overflow: {
    xs: "none",
    sm: "none"
  },
  textOverflow: {
    xs: "ellipsis",
    sm: 'inherit'
  },
  whiteSpace: {
    xs: "nowrap",
    sm: 'initial'
  },
  display: "flex",
  flexDirection: "column",

  gridColumnStart: "1",
  gridColumnEnd: {
    xs: "3",
    sm: "2",
  },
};