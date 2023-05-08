import React from "react";
import { Box } from "@mui/material";

import { container } from "./styles";
import useCheckMobileScreen from "lib/hooks/useCheckMobileScreen";
import { CRConnectWallet } from "./CRConnectWallet/CRConnectWallet";
import { CRWalletConnected } from "./CRWalletConnected/CRWalletConnected";

export const CompassRose = () => {
  const isMobile = useCheckMobileScreen();

  return (
    <Box sx={container}>
      {/* <CRConnectWallet /> */}

      <CRWalletConnected />

      {/*  <CREnterTheForge /> */}
    </Box>
  );
};
