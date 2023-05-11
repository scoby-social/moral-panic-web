import { SxProps } from "@mui/material";
import { CSSProperties } from "react";


export const container: SxProps = {
    display: "flex",
    flexDirection: "column",
    flexWrap: 'nowrap',
    alignItems: 'center',
    textAlign: 'center',
    padding: {
        xs: '1vmax',
        sm: '5vmax',
        lg: '3vmax 8vmax 8vmax 8vmax'
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
        lg: '1.6vmax'
    }
}