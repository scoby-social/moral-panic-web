import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useWallet } from "@solana/wallet-adapter-react";
import { useAtom } from "jotai";

import { checkIfUserHasFakeID } from "lib/web3/fakeID/checkIfUserHasFakeID";
import { checkIfUserHasWoodenNickel } from "lib/web3/woodenNickel/checkIfUserHasWoodenNickel";
import { currentUser, currentWallet } from "lib/store";
import { checkIfUserHasCompassRose } from "lib/web3/compassRose/checkIfUSerHasCompassRose";
import { container } from "./styles";
import CRConnectWallet from "./CRConnectWallet/CRConnectWallet";
import CRWalletConnected from "./CRWalletConnected/CRWalletConnected";
import CREnterTheForge from "./CREnterTheForge/CREnterTheForge";
import CRSlipstream from "./CRSlipstream/CRSlipstream";

const CompassRose = () => {
  const wallet = useWallet();
  const [publicKey] = useAtom(currentWallet);
  const [user, _] = useAtom(currentUser);

  const [hasFakeId, setHasFakeId] = useState(true);
  const [hasWoodenNickel, setHasWoodenNickel] = useState(false);
  const [hasCompassRose, setHasCompassRose] = useState(true);
  const [compassRoseMetadata, setcompassRoseMetadata] = useState(null);

  useEffect(() => {
    if (wallet.publicKey) {
      getTokensInWallet().then();
    }
    // eslint-disable-next-line
  }, [publicKey, wallet]);

  const getTokensInWallet = async () => {
    const fakeId = await checkIfUserHasFakeID(wallet);
    const compassRose = await checkIfUserHasCompassRose(wallet);
    // const woodenNickel = await checkIfUserHasWoodenNickel(wallet);
    // setHasWoodenNickel(woodenNickel);
    setHasFakeId(fakeId);
    setHasCompassRose(compassRose);
  };

  const renderComponent = () => {
    if (publicKey && !hasCompassRose && !hasFakeId) {
      return <CRWalletConnected />;
    }

    if (publicKey && !hasCompassRose && hasFakeId) {
      return <CREnterTheForge />;
    }

    if (
      publicKey &&
      ((hasCompassRose && hasFakeId) || (hasCompassRose && !hasFakeId))
    ) {
      return <CRSlipstream userName={user.username} />;
    }

    if (!publicKey) {
      return <CRConnectWallet />;
    }
  };

  return <Box sx={container}>{renderComponent()}</Box>;
};

export default CompassRose;
