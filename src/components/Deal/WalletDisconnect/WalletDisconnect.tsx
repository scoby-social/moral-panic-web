import React from "react";
import { Box, Typography } from "@mui/material";
import { subContainer, textStyle, title } from "../styles";
import { ConnectPhantomButton } from "components/common/ConnectPhantomButton";

const WalletDisconnect = () => {
  return (
    <Box sx={subContainer}>
      <Typography sx={title} variant="h2">
        {`Welcome Home, Hellbender`}
      </Typography>
      <Typography variant="h3" sx={textStyle}>
        {`You’ve reached The Deal, a resource in the Slipstream where you can cop resources for your adventures in the Slipstream.`}
      </Typography>
      <Typography variant="h3" sx={textStyle}>
        {`There are no rules...`}
      </Typography>
      <Typography variant="h3" sx={{ ...textStyle, marginTop: "0.5vmax" }}>
        {`...particularly this one:`}
      </Typography>
      <Typography variant="h3" sx={{ ...textStyle, marginY: "2vmax" }}>
        {`To enter The Deal:`}
      </Typography>

      <ConnectPhantomButton renderPhantomIcon={false} />
    </Box>
  );
};

export default WalletDisconnect;
