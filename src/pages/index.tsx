import { SxProps } from "@mui/material";
import { Box } from "@mui/system";
import { CompassRose } from "components/CompassRose/CompassRose";
import { Header } from "components/common/Header/Header";
import { useAtom } from "jotai";
import { currentWallet, userHasNoID } from "lib/store";
import { useEffect } from "react";

import { NextComponentType } from "next";

const headerBoxContainerStyle: SxProps = {
  // paddingBottom: "1rem",
  overflow: "auto",
};

const Home = ({}) => {
  const [missingID] = useAtom(userHasNoID);
  const [wallet] = useAtom(currentWallet);

  const headerTitle = "";

  useEffect(() => {
    // eslint-disable-next-line
  }, [missingID, wallet]);

  return (
    <div>
      <Box sx={headerBoxContainerStyle}>
        <Header spawn={false} title={headerTitle} isProfile={false} />

        <CompassRose />
      </Box>
    </div>
  );
};

export default Home;
