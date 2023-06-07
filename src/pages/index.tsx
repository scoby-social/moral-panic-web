import { SxProps } from "@mui/material";
import { Box } from "@mui/system";
import * as React from "react";
import { useAtom } from "jotai";

import CompassRose from "components/CompassRose/CompassRose";
import { Header } from "components/common/Header/Header";

import { currentWallet, userHasNoID } from "lib/store";

const headerBoxContainerStyle: SxProps = {
  subdomain: "quest",
};

const Home = () => {
  const [missingID] = useAtom(userHasNoID);
  const [wallet] = useAtom(currentWallet);

  const headerTitle = "The Quest of the Compass Rose";

  React.useEffect(() => {
    // eslint-disable-next-line
  }, [missingID, wallet]);

  return (
    <div>
      <Box sx={headerBoxContainerStyle}>
        <Header hasImage spawn={false} title={headerTitle} isProfile={false} />

        <CompassRose />
      </Box>
    </div>
  );
};

export default Home;
