import React, { CSSProperties, FC, useState } from "react";

import styled from "@emotion/styled";
import {
  Typography,
  Button,
  IconButton,
  Snackbar,
  SxProps,
} from "@mui/material";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Image from "next/image";

import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import CloseIcon from "@mui/icons-material/Close";

import useCheckMobileScreen from "lib/hooks/useCheckMobileScreen";
import { walletAddressShortener } from "../../lib/helpers/walletAddressShortener";
import { useAtom } from "jotai";
import {
  currentUser,
  currentWallet,
  isLoadingUser,
  userHasNoID,
} from "lib/store";
import { getOldestFakeIDInWallet } from "lib/web3/fakeID/getOldestFakeIDInWallet";
import { getUserByFakeID } from "lib/axios/requests/users/getUserByFakeID";
import { User } from "lib/models/user";

const textStyle: SxProps = {
  fontFamily: "Patched",
  fontSize: {
    xs: "1.4vmax",
    lg: "1.2vmax",
  },
};

const clipboardIconStyle: SxProps = {
  fontSize: {
    lg: "1.5vmax !important",
  },
};

const WalletAddressButton = styled(Button)`
  max-height: 3vmax;
  background-color: rgba(38, 38, 38, 0.76);
  line-height: 0 !important;
  padding: 2.4vmax 3vmax;
  border-radius: 3px;
  color: #fff;
  &:focus {
    background-color: rgba(38, 38, 38, 0.76);
  }

  @media (min-width: 769px) {
    padding: 2vmax 2.2vmax;
  }
`;

const WalletButton = styled(WalletMultiButton)`
  max-height: 3vmax;
  background-color: #076936;
  line-height: 0 !important;
  padding: 2.4vmax 3vmax;
  border-radius: 3px;
  border: 1px solid #000;

  @media (min-width: 769px) {
    padding: 2vmax;
  }

  & i {
    @media (min-width: 1025px) {
      margin-left: 1.4vmax !important;
    }
  }
`;

const PhantomIcon = styled(Image)`
  height: 24px;
  width: 24px;
  @media (min-width: 1025px) {
    height: 2vmax !important;
    width: 2vmax !important;
  }
`;

interface ConnectWalletButtonProps {}

export const ConnectPhantomButton: FC<ConnectWalletButtonProps> = () => {
  const isMobile = useCheckMobileScreen();
  const { publicKey } = useWallet();

  const [_, setWallet] = useAtom(currentWallet);
  const [__, setCurrentUser] = useAtom(currentUser);
  const [___, setLoadingUser] = useAtom(isLoadingUser);
  const [____, setUserHasNoID] = useAtom(userHasNoID);

  const [open, setOpen] = useState(false);

  const getUserByWalletOrRemoveUser =
    React.useCallback(async (): Promise<void> => {
      if (publicKey) {
        setLoadingUser(true);
        setWallet(publicKey.toString());

        const walletFakeID = await getOldestFakeIDInWallet(publicKey);

        if (!walletFakeID) {
          setUserHasNoID(true);
          return;
        }

        const user = await getUserByFakeID(walletFakeID.mintAddress.toString());

        if (Object.keys(user).length === 0) {
          setUserHasNoID(true);
        } else {
          setUserHasNoID(false);
        }

        setLoadingUser(false);
        setCurrentUser(user);
        return;
      }

      setLoadingUser(false);
      setWallet("");
      setCurrentUser({} as User);
      setUserHasNoID(false);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [publicKey]);

  React.useEffect(() => {
    getUserByWalletOrRemoveUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publicKey]);

  const copyToClipboard = () => {
    if (publicKey) {
      navigator.clipboard.writeText(publicKey?.toString());
      setOpen(true);
    }
  };

  const handleCloseToast = () => {
    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleCloseToast}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  if (!publicKey) {
    return (
      <WalletButton
        startIcon={undefined}
        endIcon={
          <PhantomIcon
            src={`/phantom_icon.png`}
            width={100}
            height={100}
            alt="paper"
          />
        }
      >
        <Typography sx={textStyle}>
          {isMobile ? "CONNECT PHANTOM" : "CONNECT WALLET"}
        </Typography>
      </WalletButton>
    );
  }

  return (
    <>
      <WalletAddressButton
        type="button"
        variant="contained"
        endIcon={<ContentCopyRoundedIcon sx={clipboardIconStyle} />}
        onClick={copyToClipboard}
      >
        <Typography sx={textStyle}>
          {walletAddressShortener(publicKey?.toString())}
        </Typography>
      </WalletAddressButton>

      <Snackbar
        open={open}
        autoHideDuration={1400}
        onClose={handleCloseToast}
        message="Public key was copied to clipboard"
        action={action}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
      />
    </>
  );
};
