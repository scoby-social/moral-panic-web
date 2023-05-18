import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useWallet } from "@solana/wallet-adapter-react";
import { useAtom } from "jotai";

import { checkIfUserHasFakeID } from "lib/web3/fakeID/checkIfUserHasFakeID";
import { checkIfUserHasWoodenNickel } from "lib/web3/woodenNickel/checkIfUserHasWoodenNickel";
import { currentUser, currentWallet } from "lib/store";
import { checkIfUserHasCompassRose } from "lib/web3/compassRose/checkIfUserHasCompassRose";
import { container } from "./styles";
import CRConnectWallet from "./CRConnectWallet/CRConnectWallet";
import CRWalletConnected from "./CRWalletConnected/CRWalletConnected";
import CREnterTheForge from "./CREnterTheForge/CREnterTheForge";
import CRSlipstream from "./CRSlipstream/CRSlipstream";
import { saveWallet } from "lib/axios/requests/users/saveWallet";
import { checkIfWalletExists } from "lib/axios/requests/users/checkIfWalletExists";

const CompassRose = () => {
  const wallet = useWallet();
  const [publicKey] = useAtom(currentWallet);
  const [user, _] = useAtom(currentUser);

  const [hasFakeId, setHasFakeId] = useState(false);
  const [walletWasSaved, setwalletWasSaved] = useState(false);
  const [hasWoodenNickel, setHasWoodenNickel] = useState(false);
  const [hasCompassRose, setHasCompassRose] = useState(false);
  const [compassRoseMetadata, setcompassRoseMetadata] = useState(null);

  useEffect(() => {
    if (wallet.publicKey) {
      onInit().then();
    }
    // eslint-disable-next-line
  }, [publicKey]);

  useEffect(() => {}, [publicKey, wallet.publicKey, walletWasSaved]);

  const onInit = async () => {
    const fakeId = await checkIfUserHasFakeID(wallet);
    const compassRose = await checkIfUserHasCompassRose(wallet);
    const walletSaved = await checkIfWalletExists(wallet.publicKey!);
    // const woodenNickel = await checkIfUserHasWoodenNickel(wallet);
    // setHasWoodenNickel(woodenNickel);
    setHasFakeId(fakeId);
    setHasCompassRose(compassRose);
    setwalletWasSaved(walletSaved);
  };

  const saveWalletAddress = () => {
    if (wallet.publicKey) {
      saveWallet(wallet.publicKey).then();
      setwalletWasSaved(true);
    }
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
      return (
        <CRSlipstream
          walletWasSaved={walletWasSaved}
          userName={user.username}
          saveWallet={saveWalletAddress}
        />
      );
    }

    if (!publicKey) {
      return <CRConnectWallet />;
    }
  };

  return <Box sx={container}>{renderComponent()}</Box>;
};

export default CompassRose;
