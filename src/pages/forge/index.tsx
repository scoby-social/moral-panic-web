import { Box, SxProps } from "@mui/material";

import ForgeMain from "components/Forge/Forge";
import { Header } from "components/common/Header/Header";

const headerBoxContainerStyle: SxProps = {
  // paddingBottom: "1rem",
  width: "100%",
  overflow: "auto",
  background:
    "url(https://storage.googleapis.com/hellbenders-public-c095b-assets/hellbendersWebAssets/background_forge.png)",
  backgroundSize: "100%",
};

const Forge = () => {
  const headerTitle = "The Forge";

  return (
    <Box sx={headerBoxContainerStyle}>
      <Header hasImage spawn={false} title={headerTitle} isProfile={false} />
      <ForgeMain />
    </Box>
  );
};

export default Forge;
