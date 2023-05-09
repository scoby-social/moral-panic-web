import styled from "@emotion/styled";
import { Box, Button, Typography } from "@mui/material";
import { textStyle, container, title, roseDropTextStyle } from "./styles";
import { ConnectPhantomButton } from "components/common/ConnectPhantomButton";
import { WoodenNickelButton } from "components/common/WoodenNickelButton";

const RoseDropButton = styled(Button)`
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

  @media (min-width: 769px) {
    padding: 2vmax 3.3vmax;
  }
`;

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

      <Typography
        variant="h3"
        sx={{
          ...textStyle,
          marginBottom: "2vmax",
          maxWidth: { lg: "22vmax", sm: "29vmax" },
        }}
      >
        {`If you don’t have a Compass Rose, you can register for the next Rosedrop here.`}
      </Typography>
      <RoseDropButton>
        <Typography sx={roseDropTextStyle}>{`ROSEDROP ME!`}</Typography>
      </RoseDropButton>
    </Box>
  );
};
