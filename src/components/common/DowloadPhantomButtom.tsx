import React, { FC } from "react";
import styled from "@emotion/styled";
import { Button, Typography, SxProps } from "@mui/material";
import Image from "next/image";

const textStyle: SxProps = {
  fontFamily: "Patched",
  fontSize: {
    xs: "1.4vmax",
    lg: "1.2vmax",
  },
  color: "#fff",
};

const DownloadButton = styled(Button)`
  max-height: 3vmax;
  background-color: rgba(7, 105, 54, 0.3);
  line-height: 0 !important;
  padding: 2.4vmax 3vmax;
  border-radius: 3px;
  border: 1px solid rgba(7, 105, 54, 1);
`;

interface DownloadPhantomButtonProps {
  sx: SxProps;
}

export const DowloadPhantomButtom: FC<DownloadPhantomButtonProps> = ({
  sx,
}) => {
  return (
    <DownloadButton
      sx={{ ...sx }}
      endIcon={
        <Image src={`/phantom_icon.png`} width={24} height={24} alt="paper" />
      }
    >
      <Typography sx={textStyle}>DOWNLOAD PHANTOM</Typography>
    </DownloadButton>
  );
};
