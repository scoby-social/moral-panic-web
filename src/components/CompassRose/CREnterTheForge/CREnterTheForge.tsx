import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { container, textStyle, title } from "./styles";
import styled from "@emotion/styled";

const CREnterTheForge = () => {
  const EnterTheForgeButton = styled(Button)`
    max-height: 3vmax;
    background-color: #076936;
    line-height: 0 !important;
    padding: 2.4vmax 3vmax;
    border-radius: 3px;
    color: #fff;
    border: solid 1px #000;
    &:focus {
      background-color: #076936;
    }
    &:hover {
      background-color: #1a1f2e;
    }
  `;

  return (
    <Box sx={container}>
      <Typography
        sx={title}
        variant="h2"
      >{`Welcome Home, Hellbender`}</Typography>

      <Typography variant="h3" sx={textStyle}>
        {`This is the entry point to the Slipstream, where you will embark on an epic adventure beyond time, space and the death-grip of global civilization.`}
      </Typography>
      <Typography variant="h3" sx={textStyle}>
        {`You will need a Compass Rose to serve as your guide on this journey.`}
      </Typography>
      <Typography variant="h3" sx={{ ...textStyle, marginBottom: "2vmax" }}>
        {`You can mint one in The Forge.`}
      </Typography>

      <EnterTheForgeButton>
        <Typography sx={{ fontFamily: "Patched", fontSize: "1.4vmax" }}>
          {`ENTER THE FORGE`}
        </Typography>
      </EnterTheForgeButton>
    </Box>
  );
};
export default CREnterTheForge;
