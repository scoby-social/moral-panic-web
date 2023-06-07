import { Box, SxProps } from "@mui/material";
import { Header } from "components/common/Header/Header";

import Identity from "components/Forge/Identity/Identity";

const headerBoxContainerStyle: SxProps = {
  width: "100%",
  height: "100%",
  overflow: "auto",
  background:
    "url(https://storage.googleapis.com/hellbenders-public-c095b-assets/hellbendersWebAssets/background_forge.png)",
  backgroundSize: "100%",
};

const IdentityPage = () => (
  <Box sx={headerBoxContainerStyle}>
    <Header hasImage={false} title="" isProfile={false} />
    <Identity />
  </Box>
);

export default IdentityPage;
