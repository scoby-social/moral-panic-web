import { Box, Button, Card, Grid, Typography } from "@mui/material";
import { useWallet } from "@solana/wallet-adapter-react";
import * as React from "react";
import Image from "next/image";

import { mintWoodenNickel } from "lib/web3/woodenNickel/mintWoodenNickel";
import { createWoodenNickel } from "lib/axios/requests/woodenNickel/createWoodenNickel";

import NFTCard from "../NFTCard/NFTCard";
import SupplyCard from "../SupplyCard/SupplyCard";

import {
  cardItemContainer,
  container,
  featuredCardMetadata,
  featuredCardStyles,
  featuredImageContainer,
  image,
  mintButtonContainer,
  pageWrapper,
} from "./styles";
import { getWoodenNickelAddress } from "lib/web3/woodenNickel/getWoodenNickelAddress";

const Items = () => {
  const wallet = useWallet();

  const mint = async () => {
    const address = await mintWoodenNickel(wallet, 10, "Elias");

    await createWoodenNickel(wallet.publicKey!.toString(), address);
  };

  React.useEffect(() => {
    console.log("Executing??");
    if (wallet.publicKey) {
      getWoodenNickelAddress(wallet.publicKey!);
    }
    // eslint-disable-next-line
  }, [wallet]);

  return (
    <Box sx={pageWrapper}>
      <Box sx={container}>
        <Card sx={featuredCardStyles}>
          <Grid container>
            <Grid item md={6} xs={12}>
              <Box sx={featuredImageContainer}>
                <Image
                  src="https://storage.googleapis.com/hellbenders-public-c095b-assets/hellbendersWebAssets/wooden_nickel.png"
                  style={image}
                  fill
                  alt="Wooden Nickel"
                />
              </Box>
            </Grid>
            <Grid item md={6} xs={12}>
              <Box>
                <Typography variant="h3" color="primary">
                  {"WOODEN NICKEL"}
                </Typography>
                <Typography variant="h6" color="primary">
                  Guidance
                </Typography>
                <Typography variant="subtitle2">
                  {
                    "With this Wooden Nickel you can forge the Fake ID you’ll need for your voyage into the Hellbenders Slipstream.The first Wooden Nickel was issued in 1933 by the town of Blaine, Washington as a real currency when their bank failed during the Great Depression.  Many other towns..."
                  }
                </Typography>

                <Box sx={featuredCardMetadata}>
                  <Box>
                    <Typography variant="subtitle2" color="primary">
                      {"Symbol"}
                    </Typography>
                    <Typography variant="subtitle2">{"NICKEL"}</Typography>
                  </Box>

                  <Box>
                    <Typography variant="subtitle2" color="primary">
                      {"Minter"}
                    </Typography>
                    <Typography variant="subtitle2">{"Fred"}</Typography>
                  </Box>

                  <Box>
                    <Typography variant="subtitle2" color="primary">
                      {"External URL"}
                    </Typography>
                    <Typography variant="subtitle2">
                      {"https://quest.hellbenders.world"}
                    </Typography>
                  </Box>

                  <Box sx={mintButtonContainer}>
                    <Button variant="contained" onClick={mint}>
                      {"MINT"}
                    </Button>
                    <Typography variant="caption">
                      <b>Unit Cost:</b>3.33 USDC
                    </Typography>
                    <Typography variant="caption">
                      Plus a small SOL transaction Fee
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Card>
      </Box>
      <Box>
        <Box sx={cardItemContainer}>
          <NFTCard
            imageUrl="https://storage.googleapis.com/hellbenders-public-c095b-assets/hellbendersWebAssets/fake_id.png"
            title="Fake ID"
            description="Explore the fractal universe of this unique NFT, where each pixel is a window into a different galaxy."
            price={6.66}
            currency="USDC"
            buttonTitle="CREATE ID"
            id="fake_id"
            locked={false}
          />

          <NFTCard
            imageUrl="https://storage.googleapis.com/hellbenders-public-c095b-assets/hellbendersWebAssets/compass_rose_example.png"
            title="Compass Rose"
            description="The Quest of the Compass Rose is a point of entry into Hellbenders: Moral Panic!, a massively-multiplayer Web3 game available on xNFT Backpack and the Solana Saga phone, an outlaw biker gang of amphibious superheroes. Activate your Compass Rose to play Hellbenders: Moral Panic!, our. "
            price={0}
            buttonTitle="MINT"
            currency="USDC"
            id="compass_rose"
            locked
          />

          <SupplyCard
            id="founders_guild"
            imageUrl="https://storage.googleapis.com/hellbenders-public-c095b-assets/hellbendersWebAssets/WN.png"
            title="Founders Guild"
            description="You can trade these Supplies to forge the Fake  ID you’ll need to sneak into the Hellbenders clubhouse. This Supply Drop may also contain tools, clothing, food or vehicles."
            author="A stunning photograph of a sunset over the ocean, taken at a beach in Hawaii."
            price={0.01}
            buttonTitle="MINT"
            currency="USDC"
            locked
          />

          <NFTCard
            imageUrl="https://storage.googleapis.com/hellbenders-public-c095b-assets/hellbendersWebAssets/spawn.png"
            title="Spawn"
            description="Explore the fractal universe of this unique NFT, where each pixel is a window into a different galaxy."
            price={6.66}
            currency="USDC"
            id="fake_id"
            buttonTitle="MINT"
            locked
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Items;
