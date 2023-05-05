import { Box, SxProps } from "@mui/material";

import ForgeMain from "components/Forge/Forge";
import { Header } from "components/common/Header/Header";

const headerBoxContainerStyle: SxProps = {
  // paddingBottom: "1rem",
  overflow: "auto",
};

const Forge = () => {
  const headerTitle = "The Forge";

  return (
    <div>
      <Box sx={headerBoxContainerStyle}>
        <Header spawn={false} title={headerTitle} isProfile={false} />
        <ForgeMain />
      </Box>
    </div>
  );
};

export default Forge;
