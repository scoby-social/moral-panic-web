import { SxProps } from "@mui/material";
import { Box } from "@mui/system";
import { useAtom } from "jotai";
import { useEffect } from "react";

import { currentWallet, userHasNoID } from "lib/store";

import { Header } from "components/common/Header/Header";

const headerBoxContainerStyle: SxProps = {
  // paddingBottom: "1rem",
  overflow: "auto",
};
const Home = () => {
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
      </Box>
    </div>
  );
};

export default Home;
