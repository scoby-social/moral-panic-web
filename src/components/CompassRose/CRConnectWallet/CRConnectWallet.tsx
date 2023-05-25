import React from "react";
import { Box, Typography } from "@mui/material";

import { ConnectPhantomButton } from "components/common/ConnectPhantomButton";
import { DownloadPhantomButtom } from "components/common/DownloadPhantomButtom";
import {
  container,
  paperContainer,
  paperTextContent,
  paperTextTitle,
  textStyle,
  title,
} from "./styles";
import useCheckMobileScreen from "lib/hooks/useCheckMobileScreen";

const CRConnectWallet = () => {
  const isMobile = useCheckMobileScreen();

  return (
    <Box sx={container}>
      <Typography
        sx={title}
        variant="h2"
      >{`Welcome Home, Hellbender`}</Typography>

      <Typography variant="h3" sx={textStyle}>
        {`This is the entry point to the Slipstream, where you will embark on an epic adventure beyond time, space and the death-grip of global civilization.`}
      </Typography>
      <Typography variant="h3" sx={textStyle}>
        {`There are no rules in the Slipstream. There are no terms of service. There are no privacy statements. There’s no intellectual f*cking property.`}
      </Typography>
      <Typography variant="h3" sx={textStyle}>
        {`You will receive guidance along your journey from many different signs and portents.`}
      </Typography>
      <Typography variant="h3" sx={textStyle}>
        {`Pay attention to these signs, particularly this one:`}
      </Typography>

      <Box sx={paperContainer}>
        <Typography sx={paperTextTitle}>{`Outlaw Code`}</Typography>

        <Typography sx={paperTextContent}>{`Believe Nothing.`}</Typography>
        <Typography
          sx={paperTextContent}
        >{`Experience Everything.`}</Typography>
        <Typography sx={paperTextContent}>{`Deceive No One.`}</Typography>
      </Box>

      <Typography variant="h3" sx={{ ...textStyle, marginBottom: "2vmax" }}>
        {`To embark on the Quest of the Compass Rose:`}
      </Typography>

      <ConnectPhantomButton />
      {isMobile && <DownloadPhantomButtom sx={{ marginTop: "1vmax" }} />}
    </Box>
  );
};

export default CRConnectWallet;
