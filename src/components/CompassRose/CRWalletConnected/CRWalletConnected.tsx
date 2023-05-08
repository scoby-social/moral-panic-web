import { Box, Typography } from "@mui/material";
import React from "react";
import { textStyle, container, title } from "./styles";
import { ConnectPhantomButton } from "components/common/ConnectPhantomButton";
import { WoodenNickelButton } from "components/common/WoodenNickelButton";

export const CRWalletConnected = () => {
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
        {`There are no rules in the Slipstream. There are no terms of service. There are no privacy statements. There’s no intellectual f*cking property.`}
      </Typography>
      <Typography variant="h3" sx={textStyle}>
        {`The next set of guidance you’ll receive is from the Compass Rose herself.`}
      </Typography>
      <Typography variant="h3" sx={{ ...textStyle, marginBottom: "2vmax" }}>
        {`If you’re holding a Compass Rose in another wallet, send her here:`}
      </Typography>

      <ConnectPhantomButton />

      <Typography variant="h3" sx={textStyle}>
        {`If you don't have a Compass Rose, you can mint one or score one off the dealer.`}
      </Typography>

      <Typography variant="h3" sx={{ ...textStyle, marginBottom: "2vmax" }}>
        {`But you'll need a Wooden Nickel for that.`}
      </Typography>

      <WoodenNickelButton />
    </Box>
  );
};
