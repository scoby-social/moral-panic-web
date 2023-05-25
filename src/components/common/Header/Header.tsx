import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import * as React from "react";

import ConnectWalletButton from "components/common/ConnectWalletButton";

import TopTabs from "./TopTabs/TopTabs";
import {
  buttonWrapper,
  headerBoxWithImageWrapper,
  headerContentWrapper,
  headerImageWrapper,
  headerTopContent,
  imageStyle,
  leaderboardContentWrapper,
  leaderboardText,
} from "./styles";
import { HeaderProps } from "./types";

export const Header = ({ title, isProfile, hasImage }: HeaderProps) => {
  const router = useRouter();

  const goToHome = React.useCallback(() => {
    router.push("/");
  }, [router]);

  return (
    <Box sx={headerBoxWithImageWrapper(hasImage)}>
      <Box sx={headerContentWrapper}>
        <Box sx={headerTopContent}>
          <Box sx={headerImageWrapper}>
            <Image
              src="/hellbenders_token_ico.svg"
              alt="Hellbenders token ico"
              fill
              style={imageStyle}
              onClick={goToHome}
            />
          </Box>
          <TopTabs />
          <Box sx={buttonWrapper}>
            <ConnectWalletButton primaryColor={false} />
          </Box>
        </Box>

        {hasImage && (
          <Box sx={leaderboardContentWrapper(isProfile)}>
            <Typography variant="h1" sx={leaderboardText}>
              {title}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};
