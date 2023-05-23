import React from "react";
import { Box } from "@mui/material";
import { container } from "./styles";
import useCheckMobileScreen from "lib/hooks/useCheckMobileScreen";
import WalletDisconnect from "./WalletDisconnect/WalletDisconnect";
import { DealWoodenNickel } from "./DealWoodenNickel/DealWoodenNickel";

const TheDeal = () => {
  const isMobile = useCheckMobileScreen();

  return (
    <Box sx={container}>
      {/*  <WalletDisconnect /> */}
      <DealWoodenNickel />
    </Box>
  );
};

export default TheDeal;
