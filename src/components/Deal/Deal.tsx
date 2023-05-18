import React from "react";
import { Box } from "@mui/material";
import { container} from "./styles";
import useCheckMobileScreen from "lib/hooks/useCheckMobileScreen";
import WalletDisconnect from "./WalletDisconnect/WalletDisconnect";

const Deal = () => {
  const isMobile = useCheckMobileScreen();

  return (
    <Box sx={container}>
      <WalletDisconnect />
    </Box>
  );
};

export default Deal;
