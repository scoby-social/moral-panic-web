import { Box, Link } from "@mui/material";
import { link, linkWrapper } from "./styles";

const TopTabs = () => {
  return (
    <Box sx={linkWrapper}>
      <Link sx={link} href={`/throw-down`}>
        Throw Down
      </Link>
      <Link sx={link} target="_blank" href="https://www.hellbenders.world">
        The Club
      </Link>
      <Link sx={link} href="/forge">
        The Forge
      </Link>
      <Link sx={link} href="/cave">
        The Cave
      </Link>
      <Link sx={link} href="/deal">
        The Deal
      </Link>
      <Link sx={link} href="/black-paper">
        The Black Paper
      </Link>
    </Box>
  );
};

export default TopTabs;
