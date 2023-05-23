import { SxProps } from "@mui/material";
import { Box } from "@mui/system";
import TheDeal from "components/Deal/Deal";
import { CustomButton } from "components/common/CustomButton/CustomButton";
import { Header } from "components/common/Header/Header";
import { useAtom } from "jotai";
import { currentWallet, userHasNoID } from "lib/store";
import { useEffect } from "react";

const headerBoxContainerStyle: SxProps = {
  // paddingBottom: "1rem",
  overflow: "auto",
};
const Deal = () => {
  const [missingID] = useAtom(userHasNoID);
  const [wallet] = useAtom(currentWallet);

  const headerTitle = "THE DEAL";

  useEffect(() => {
    // eslint-disable-next-line
  }, [missingID, wallet]);

  return (
    <div>
      <Box sx={headerBoxContainerStyle}>
        <Header spawn={false} title={headerTitle} isProfile={false} />
        <TheDeal />
      </Box>
    </div>
  );
};

export default Deal;
