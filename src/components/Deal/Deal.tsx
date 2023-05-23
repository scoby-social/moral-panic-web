import React, { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import { container } from "./styles";
import useCheckMobileScreen from "lib/hooks/useCheckMobileScreen";
import WalletDisconnect from "./WalletDisconnect/WalletDisconnect";
import { DealWoodenNickel } from "./DealWoodenNickel/DealWoodenNickel";
import { useWallet } from "@solana/wallet-adapter-react";
import { useAtom } from "jotai";
import { currentUser, currentWallet } from "lib/store";

const TheDeal = () => {
  const wallet = useWallet();
  const [publicKey] = useAtom(currentWallet);
  const [user, _] = useAtom(currentUser);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (wallet.connecting) {
      setIsLoading(false);
    }
    // eslint-disable-next-line
  }, [wallet.connecting]);

  const renderComponent = () => {
    if (isLoading) {
      return (
        <CircularProgress
          size={`9vmax`}
          sx={{
            alignSelf: "center",
            width: "9vmax",
            height: "9vmax",
            marginTop: "12vmax",
          }}
        />
      );
    }

    if (!publicKey) {
      return <WalletDisconnect />;
    }

    if (publicKey) {
      return <DealWoodenNickel />;
    }
  };

  return <Box sx={container}>{renderComponent()}</Box>;
};

export default TheDeal;
