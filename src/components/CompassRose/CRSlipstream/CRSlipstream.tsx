import React from "react";
import { Box, Typography } from "@mui/material";
import { textStyle, title, container } from "./styles";

export const CRSlipstream = () => {
  return (
    <Box sx={container}>
      <Typography sx={title} variant="h2">{`Welcome Home Stranger`}</Typography>

      <Typography variant="h3" sx={textStyle}>
        {`This is the entry point to the Slipstream, where you will embark on an epic adventure beyond time, space and the death-grip of global civilization.`}
      </Typography>
      <Typography variant="h3" sx={{ ...textStyle, marginBottom: "2vmax" }}>
        {`The Compass Rose will serve as your guide on this journey.`}
      </Typography>

      <Box
        style={{
          borderRadius: "2vmax",
          border: "0.2vmax solid #72767E",
          backgroundColor: "rgba(21, 30, 37, 1)",
          padding: "4vmax",
          width: "100%",
        }}
      ></Box>
    </Box>
  );
};
