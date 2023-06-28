import { SxProps } from "@mui/material";
import { CSSProperties } from "react";


export const container: SxProps = {
    display: "flex",
    flexDirection: "column",
    flexWrap: 'nowrap',
    alignItems: 'center',
    textAlign: 'center',
    padding: {
        xs: '3vmax',
    },
    height: '100%',
}

export const title: SxProps = {
    fontFamily: 'Patched',
    marginBottom: '1vmax',
    fontSize: {
        xs: '2vmax',
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

const paperText: SxProps = {
    fontSize: {
        xs: '1.5vmax',
    },
    fontWeight: 'bold',
    fontFamily: 'Patched'
}

export const paperTextTitle: SxProps = {
    ...paperText,
    color: "rgba(0, 0, 0, 1)"
}

export const paperTextContent: SxProps = {
    ...paperText,
    color: "rgba(183, 2, 4, 1)"
}

export const paperContainer: SxProps = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2vmax',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    width: "100%",
    maxWidth: '25vmax',
    height: '20vmax',
    background: 'url(/hellbenders_paper.png)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: "cover",
}
