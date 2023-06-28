import { Box, CircularProgress } from "@mui/material";
import { useWallet } from "@solana/wallet-adapter-react";
import * as React from "react";
import { useAtom } from "jotai";

import {
  resolveToWalletAddress,
  getParsedNftAccountsByOwner,
} from "@nfteyez/sol-rayz";
import { Connection } from "@solana/web3.js";

import { getWoodenNickelAddress } from "lib/axios/requests/woodenNickel/getWoodenNickelAddress";
import { woodenNickelAddress, woodenNickelCurrentQuota } from "lib/store/forge";
import { currentUser, userHasNoID } from "lib/store";

import FeaturedCard from "../FeaturedCard/FeaturedCard";
import NFTCard from "../NFTCard/NFTCard";

import {
  cardItemContainer,
  container,
  loadingContainer,
  pageWrapper,
} from "./styles";
import { getWoodenNickelQuota } from "lib/axios/requests/woodenNickel/getWoodenNickelQuota";

const Items = () => {
  const wallet = useWallet();
  const loaded = React.useRef(false);
  const [_, setWoodenNickel] = useAtom(woodenNickelAddress);
  const [missingID] = useAtom(userHasNoID);
  const [user] = useAtom(currentUser);
  const [__, setWoodenNickelQuota] = useAtom(woodenNickelCurrentQuota);
  const [loading, setLoading] = React.useState(false);
  const [walletWoodenNickel, setWalletWoodenNickel] = React.useState("");

  const fetchInfo = React.useCallback(async () => {
    if (!wallet.publicKey) return;
    if (!loaded.current) setLoading(true);

    const woodenNickelAddr = await getWoodenNickelAddress(
      wallet.publicKey.toString()
    );

    setWoodenNickel(woodenNickelAddr);
    if (!woodenNickelAddr) {
      const wnInWallet = await getWnAddressInWallet();

      setWalletWoodenNickel(wnInWallet || "");
      setWoodenNickelQuota(null);
      if (!loaded.current) setLoading(false);
      loaded.current = true;
      return;
    }

    const woodenNickelQuota = await getWoodenNickelQuota(woodenNickelAddr);

    setWoodenNickelQuota(woodenNickelQuota);
    if (!loaded.current) setLoading(false);
    loaded.current = true;

    // eslint-disable-next-line
  }, [wallet.publicKey]);

  const getWnAddressInWallet = React.useCallback(async () => {
    if (!wallet.publicKey) return;
    const connection = new Connection(
      process.env.NEXT_PUBLIC_HELIUS_SOLANA_CLUSTER!
    );

    const publicAddress = await resolveToWalletAddress({
      text: wallet.publicKey.toString(),
    });
    const nftArray = await getParsedNftAccountsByOwner({
      publicAddress,
      connection,
    });

    const wn = nftArray.find(val => val.data.symbol === "NICKEL");

    return wn?.mint;
  }, [wallet.publicKey]);

  React.useEffect(() => {
    fetchInfo();

    // eslint-disable-next-line
  }, [wallet.publicKey]);

  return (
    <Box sx={pageWrapper}>
      {loading ? (
        <Box sx={loadingContainer}>
          <CircularProgress
            size={`5vmax`}
            sx={{
              alignSelf: "center",
              marginTop: "5vmax",
            }}
          />
        </Box>
      ) : (
        <>
          <Box sx={container}>
            <FeaturedCard
              imageUrl="https://storage.googleapis.com/hellbenders-public-c095b-assets/hellbendersWebAssets/wooden_nickel.png"
              title="WOODEN NICKEL"
              description={
                "With this Wooden Nickel you can forge the Fake ID you’ll need for your voyage into the Hellbenders Slipstream.\n\nThe first Wooden Nickel was issued in 1933 by the town of Blaine, Washington as a real currency when their bank failed during the Great Depression. Many other towns followed suit until the U.S. Congress outlawed wooden currency just a few years later.\n\nThe Hellbenders Motorcycle Club honors each member as a sovereign soul with the inalienable right to mint their own currency."
              }
              metadata={[
                { title: "Symbol", description: "NICKEL" },
                { title: "Minter", description: user?.username },
                {
                  title: "External URL",
                  description: "https://quest.hellbenders.world",
                  link: true,
                },
              ]}
              fetchInfo={fetchInfo}
              locked={missingID}
            />
          </Box>
          <Box>
            <Box sx={cardItemContainer}>
              <NFTCard
                imageUrl="https://storage.googleapis.com/hellbenders-public-c095b-assets/hellbendersWebAssets/fake_id.png"
                title="Fake ID"
                description="Forge your own credentials to enter The Slipstream and build your brood. Design your PFP, declare your identity and add your superpowers."
                price={6.66}
                currency="USDC"
                buttonTitle="CREATE ID"
                id="fake_id"
                locked={!walletWoodenNickel || !missingID}
                lockedText={
                  missingID
                    ? "Hey pal, looks like you are missing a Wooden Nickel. Go cop one and try again!"
                    : "Hey pal, looks like you already have a Fake ID. You don't need to have two identities! But if want to, you'll need to do it with a different wallet holding a Wooden Nickel."
                }
              />

              <NFTCard
                imageUrl="https://storage.googleapis.com/hellbenders-public-c095b-assets/hellbendersWebAssets/compass_rose_example.png"
                title="Compass Rose"
                description="Follow your personal Compass Rose for an epic adventure beyond time, space and the death-grip of global civilization. Your quest is as unique as your sovereign soul."
                buttonTitle="MINT"
                id="compass_rose"
                locked
                lockedText=""
              />

              <NFTCard
                id="founders_guild"
                imageUrl="https://storage.googleapis.com/hellbenders-public-c095b-assets/hellbendersWebAssets/founders_guild.png"
                title="Founders Guild"
                description="The Founders Guild is society of transformation where members initiate themselves into the mysteries of their own souls."
                buttonTitle="MINT"
                locked
                lockedText=""
              />

              <NFTCard
                imageUrl="https://storage.googleapis.com/hellbenders-public-c095b-assets/hellbendersWebAssets/spawn.png"
                title="Spawn"
                description="The Spawn embodies your brood, provides membership in the Cooperative DAO and allows you to create characters that will do your bidding in the Slipstream."
                id="fake_id"
                buttonTitle="MINT"
                locked
                lockedText=""
              />
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Items;
