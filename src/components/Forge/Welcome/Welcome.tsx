import { Box, Typography } from "@mui/material";

import { ConnectPhantomButton } from "components/common/ConnectPhantomButton";

import { text, welcomeContainer } from "./styles";

const Welcome = () => (
  <Box sx={welcomeContainer}>
    <Typography variant="h2" sx={text}>
      {"WELCOME HOME, HELLBENDER"}
    </Typography>
    <Typography sx={text} variant="body1">
      {
        "You’ve reached The Forge, a resource in the Slipstream where you can mint resources for your adventures in the Slipstream."
      }
    </Typography>
    <Typography sx={text} variant="body1">
      {"There are no rules... ...particularly this one:"}
    </Typography>
    <Typography sx={text} variant="body1">
      {"To enter The Forge:"}
    </Typography>
    <ConnectPhantomButton />
  </Box>
);

export default Welcome;
