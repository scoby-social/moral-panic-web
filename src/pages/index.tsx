import { SxProps } from "@mui/material";
import { Box } from "@mui/system";
import { CompassRose } from "components/CompassRose/CompassRose";
import { Header } from "components/common/Header/Header";
import { useAtom } from "jotai";
import { currentWallet, userHasNoID } from "lib/store";
import { FC, useEffect } from "react";

const headerBoxContainerStyle: SxProps = {
  subdomain: "quest",
};

enum subdomainType {
  quest = "quest",
}

interface indexProps {
  subdomain: "quest";
}

export async function getServerSideProps({ req }: any) {
  const subdomain = req.headers.host.split(".")[0];

  return {
    props: {
      subdomain,
    },
  };
}

const Home: FC<indexProps> = ({ subdomain }) => {
  const [missingID] = useAtom(userHasNoID);
  const [wallet] = useAtom(currentWallet);

  const headerTitle = "The Quest of the Compass Rose";

  useEffect(() => {
    // eslint-disable-next-line
  }, [missingID, wallet]);

  return (
    <div>
      <Box sx={headerBoxContainerStyle}>
        <Header spawn={false} title={headerTitle} isProfile={false} />

        {/* {subdomain === subdomainType.quest && <CompassRose />} */}

        <CompassRose />
      </Box>
    </div>
  );
};

export default Home;
