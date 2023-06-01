import React, { useCallback, useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import { useWallet } from "@solana/wallet-adapter-react";
import { useAtom } from "jotai";

import { checkIfUserHasFakeID } from "lib/web3/fakeID/checkIfUserHasFakeID";
import { checkIfUserHasWoodenNickel } from "lib/web3/woodenNickel/checkIfUserHasWoodenNickel";
import { currentUser, currentWallet } from "lib/store";
import { container } from "./styles";
import CRConnectWallet from "./CRConnectWallet/CRConnectWallet";
import CRWalletConnected from "./CRWalletConnected/CRWalletConnected";
import CREnterTheForge from "./CREnterTheForge/CREnterTheForge";
import CRSlipstream from "./CRSlipstream/CRSlipstream";
import { saveWallet } from "lib/axios/requests/users/saveWallet";
import { checkIfWalletExists } from "lib/axios/requests/users/checkIfWalletExists";
import { checkIfUserHasCompassRose } from "lib/web3/compassRose/checkIfUSerHasCompassRose";
import { getCompassRoseMetaData } from "lib/web3/compassRose/getCompassRoseMetaData";
import { nftMetadata } from "lib/web3/types/nftMetadata";

const CompassRose = () => {
  const wallet = useWallet();
  const [publicKey] = useAtom(currentWallet);
  const [user, _] = useAtom(currentUser);

  const [isLoading, setIsLoading] = useState(true);
  const [hasFakeId, setHasFakeId] = useState(false);
  const [walletWasSaved, setwalletWasSaved] = useState(false);
  const [hasWoodenNickel, setHasWoodenNickel] = useState(false);
  const [hasCompassRose, setHasCompassRose] = useState(false);
  const [compassRoseMetadata, setcompassRoseMetadata] =
    useState<nftMetadata | null>(null);

  const onInit = useCallback(async () => {
    if (wallet.publicKey) {
      const fakeId = await checkIfUserHasFakeID(wallet);
      const compassRose = await checkIfUserHasCompassRose(wallet);
      const compass = await getCompassRoseMetaData(wallet);
      const walletSaved = await checkIfWalletExists(wallet.publicKey!);

      if (compassRose) {
        const { name, description, image, external_url, symbol, attributes } =
          compass!;

        setcompassRoseMetadata({
          name,
          description,
          external_url,
          symbol,
          attributes,
          imageUri: image,
          collection_name: "Compass Rose",
          family_name: "Mapshifting",
        });
      }

      // const woodenNickel = await checkIfUserHasWoodenNickel(wallet);
      // setHasWoodenNickel(woodenNickel);
      setHasFakeId(fakeId);
      setHasCompassRose(compassRose);
      setwalletWasSaved(walletSaved);
      setIsLoading(false);
    } else {
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    }
    // eslint-disable-next-line
  }, [wallet.publicKey]);

  useEffect(() => {
    onInit();
    // eslint-disable-next-line
  }, [publicKey]);

  useEffect(() => {
    if (wallet.connecting) {
      setIsLoading(false);
    }
    // eslint-disable-next-line
  }, [wallet.connecting]);

  const saveWalletAddress = () => {
    if (wallet.publicKey) {
      saveWallet(wallet.publicKey).then();
      setwalletWasSaved(true);
    }
  };

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

    if (!wallet.publicKey) {
      return <CRConnectWallet />;
    }

    if (wallet.publicKey && !hasCompassRose && !hasFakeId) {
      return (
        <CRWalletConnected
          walletWasSaved={walletWasSaved}
          saveWalletAddress={saveWalletAddress}
        />
      );
    }

    if (wallet.publicKey && !hasCompassRose && hasFakeId) {
      return (
        <CRWalletConnected
          walletWasSaved={walletWasSaved}
          saveWalletAddress={saveWalletAddress}
        />
      );
    }

    if (
      wallet.publicKey &&
      ((hasCompassRose && hasFakeId && compassRoseMetadata !== null) ||
        (hasCompassRose && !hasFakeId && compassRoseMetadata !== null))
    ) {
      return (
        <CRSlipstream
          walletWasSaved={walletWasSaved}
          userName={user.username}
          compassRoseData={compassRoseMetadata}
          saveWallet={saveWalletAddress}
        />
      );
    }
  };

  return <Box sx={container}>{renderComponent()}</Box>;
};

export default CompassRose;
