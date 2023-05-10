import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";

import { container } from "./styles";
import { CRConnectWallet } from "./CRConnectWallet/CRConnectWallet";
import { CRWalletConnected } from "./CRWalletConnected/CRWalletConnected";
import { useWallet } from "@solana/wallet-adapter-react";
import { useGetOperateSystem } from "lib/hooks/useGetOperateSystem";
import { checkIfUserHasFakeID } from "lib/web3/fakeID/checkIfUserHasFakeID";
import { checkIfUserHasWoodenNickle } from "lib/web3/woodenNickle/checkIfUserHasWoodenNickle";
import { currentWallet } from "lib/store";
import { useAtom } from "jotai";
import { CREnterTheForge } from "./CREnterTheForge/CREnterTheForge";
import { CRSlipstream } from "./CRSlipstream/CRSlipstream";

export const CompassRose = () => {
  const wallet = useWallet();
  const [publicKey] = useAtom(currentWallet);

  const [hasFakeId, setHasFakeId] = useState(true);
  const [hasWoodenNickle, setHasWoodenNickle] = useState(false);
  const [hasCompassRose, setHasCompassRose] = useState(true);

  useEffect(() => {
    if (publicKey) {
      getTokensInWallet().then();
    }
    // eslint-disable-next-line
  }, [publicKey]);

  const getTokensInWallet = async () => {
    // const fakeId = await checkIfUserHasFakeID(wallet);
     const woodenNickle = await checkIfUserHasWoodenNickle(wallet);
    // setHasWoodenNickle(woodenNickle);
    // setHasFakeId(fakeId);
  };

  const renderComponent = () => {
    if (publicKey && !hasCompassRose && !hasFakeId) {
      return <CRWalletConnected />;
    }

    if (
      publicKey &&
      ((!hasCompassRose && hasFakeId) || (hasCompassRose && !hasFakeId))
    ) {
      return <CREnterTheForge />;
    }

    if (publicKey && hasCompassRose && hasFakeId) {
      return <CRSlipstream />;
    }

    if (!publicKey) {
      return <CRConnectWallet />;
    }
  };

  return <Box sx={container}>{renderComponent()}</Box>;
};

/* NICKEL */
