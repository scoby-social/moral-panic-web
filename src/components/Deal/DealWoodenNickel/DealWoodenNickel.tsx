import React, { useEffect, useState } from "react";
import { container, subContainer, title } from "../styles";

import { Box, Tab, Tabs, Typography } from "@mui/material";

import NFTCard from "components/common/NFTCard/NFTCard";
import { NFTCardProps, messageType } from "components/common/NFTCard/types";
import { useWallet } from "@solana/wallet-adapter-react";
import { getWoodenNickelsListMarket } from "lib/web3/woodenNickel/getWoodenNickelsListMarket";
import styled from "@emotion/styled";
import { getWoodenNickelsToList } from "lib/web3/woodenNickel/getWoodenNickelsToList";
import { PublicKey } from "@metaplex-foundation/js";
import { getTheDealForgeQuota } from "lib/axios/requests/theDeal/getTheDealForgeQuota";
import { buyWoodenNickelTheDeal } from "lib/web3/woodenNickel/buyWoodenNickelTheDeal";
import { NftInMarketplace } from "lib/web3/types/NftInMarketplace";
import { buyNftTheDeal } from "lib/axios/requests/theDeal/buyNftTheDeal";
import { listWoodenNickel } from "lib/web3/woodenNickel/listWoodenNickel";
import { NftToList } from "lib/web3/types/nftToList";
import { getVolumeNftTheDeal } from "lib/axios/requests/theDeal/getVolumeNftTheDeal";
import { checkIfUserHasWoodenNickel } from "lib/web3/woodenNickel/checkIfUserHasWoodenNickel";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      sx={{ width: "100%" }}
      {...other}
    >
      {value === index && <Box sx={{ width: "100%" }}>{children}</Box>}
    </Box>
  );
}

export const DealWoodenNickel = () => {
  const wallet = useWallet();

  const [nftsToSell, setNftsToSell] = useState([] as NftToList[]);
  const [nftsToSellProps, setNftsToSellProps] = useState([] as NFTCardProps[]);

  const [nftToBuy, setgeNftdToBuy] = useState<null | NftInMarketplace>(null);
  const [nftToBuyProps, setgeNftToBuyProps] = useState<null | NFTCardProps>(
    null
  );

  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    if (wallet.connected && wallet.publicKey) {
      init().then();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet.connected]);

  const init = async () => {
    const sellData = await getNftsToDeal();
    const buyData = await geNftToBuy();

    setNftsToSellProps(sellData);

    setgeNftToBuyProps(buyData);
  };

  const getNftsToDeal = async () => {
    const userPubkey = wallet.publicKey as PublicKey;
    const nftList = await getWoodenNickelsToList(wallet.publicKey as PublicKey);
    const userWalletString = wallet.publicKey!.toString();

    if (nftList.length === 0) {
      return [];
    }

    const nftFiltered = nftList.filter(
      i => i.data.creators[2].address === userPubkey.toBase58()
    );

    setNftsToSell(nftFiltered);

    const nftPropsFormated = nftFiltered.map(async nft => {
      const minterString = nft.name.split(" ")[0];
      const minter = minterString.substring(0, minterString.length - 2);

      const image = await (await fetch(nft.image)).blob();
      const imageUrl = URL.createObjectURL(image);

      const volume = await getVolumeNftTheDeal(new Date(), nft.symbol);
      const quota = await getTheDealForgeQuota(userWalletString);
      return {
        external_url: nft.external_link,
        description: nft.description,
        image: imageUrl,
        seniority: "2",
        name: nft.name,
        symbol: nft.symbol,
        price: 0.01,
        amount: 0,
        minter,
        type: "sell",
        volume,
        quota: quota.maxList || 0,
      } as NFTCardProps;
    });

    return await Promise.all(nftPropsFormated);
  };

  const geNftToBuy = async () => {
    const nfts = await getWoodenNickelsListMarket(wallet);
    const nft = nfts.find(i => i.amount > 0);

    if (!nft) {
      return null;
    }

    setgeNftdToBuy(nft);

    const image = await (await fetch(nft.image)).blob();
    const imageUrl = URL.createObjectURL(image);

    const minterString = nft.name.split(" ")[0];
    const minter = minterString.substring(0, minterString.length - 2);

    const userWn = await checkIfUserHasWoodenNickel(wallet);

    return {
      external_url: nft.external_url,
      description: nft.description,
      image: imageUrl,
      seniority: "2",
      name: nft.name,
      symbol: nft.symbol,
      price: nft.price,
      amount: nft.amount,
      minter,
      type: "buy",
      transactionDisabled: nft.symbol === "NICKEL" ? userWn : false,
    } as NFTCardProps;
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const CustomTabs = styled(Tabs)`
    & .Mui-selected {
      background-color: rgba(217, 217, 217, 0.1) !important;
      color: #fff !important;
    }
    & .MuiTabs-indicator {
      background: #beef00 !important;
    }
  `;

  const CustomTab = styled(Tab)`
    background-color: rgba(217, 217, 217, 0.1) !important;
    color: rgba(255, 255, 255, 0.6) !important;
    width: 50%;
    max-width: none;
    font-size: 1.5vmax !important;
    font-family: Cabin;
    font-weight: normal;
  `;

  const handleBuyNft = async (nft: NftInMarketplace, amount: number) => {
    const buyer = wallet.publicKey as PublicKey;
    const quota = await getTheDealForgeQuota(buyer.toString());
    const response = await buyWoodenNickelTheDeal(nft, wallet, amount);

    const tokenAddress = new PublicKey(nft.mint);
    const owner = new PublicKey(nft.data.creators[2].address);

    if (response) {
      await buyNftTheDeal(
        tokenAddress,
        nft.symbol,
        owner,
        buyer,
        amount,
        nft.external_url
      );
    }

    return response;
  };

  const handleSellNft = async (nft: NftToList, amount: number) => {
    const userWallet = wallet.publicKey as PublicKey;

    const quota = await getTheDealForgeQuota(userWallet.toString());

    if (quota.maxList < amount) {
      return false;
    }

    const response = await listWoodenNickel(nft, wallet, amount);

    return response;
  };

  return (
    <Box sx={subContainer}>
      {/* TABS */}
      <Box sx={{ borderBottom: 1, borderColor: "divider", width: "100%" }}>
        <CustomTabs
          value={tabValue}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <CustomTab label="Buy" {...a11yProps(0)} />
          <CustomTab label="Sell" {...a11yProps(1)} />
        </CustomTabs>
      </Box>

      {/* Buy */}
      <TabPanel value={tabValue} index={0}>
        <Box
          sx={{
            width: "100%",
            padding: {
              xs: "1vmax",
              sm: "5vmax",
              lg: "3vmax 8vmax 8vmax 8vmax",
            },
          }}
        >
          <Typography
            sx={{
              ...title,
              marginBottom: {
                xs: "1vmax",
                sm: "5vmax",
                lg: "3vmax 8vmax 8vmax 8vmax",
              },
              fontFamily: "Cabin",
            }}
          >
            Welcome to The Deal, where your dealer’s got the goods.
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            {nftToBuyProps && nftToBuy ? (
              <>
                <NFTCard
                  {...nftToBuyProps}
                  handleTransaction={(amount: number) => {
                    return handleBuyNft(nftToBuy, amount);
                  }}
                />
              </>
            ) : null}
          </Box>
        </Box>
      </TabPanel>

      {/* Sell */}
      <TabPanel value={tabValue} index={1}>
        <Box
          sx={{
            width: "100%",
            padding: {
              xs: "1vmax",
              sm: "5vmax",
              lg: "3vmax 8vmax 8vmax 8vmax",
            },
          }}
        >
          <Typography
            sx={{
              ...title,
              marginBottom: {
                xs: "1vmax",
                sm: "5vmax",
                lg: "3vmax 8vmax 8vmax 8vmax",
              },
              fontFamily: "Cabin",
            }}
          >
            List your stuff with the dealer and maybe he’ll move it for you.
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            {nftsToSellProps.map((value, index) => (
              <NFTCard
                key={`${value.description + index}`}
                {...value}
                handleTransaction={amount =>
                  handleSellNft(nftsToSell[index], amount)
                }
              />
            ))}
          </Box>
        </Box>
      </TabPanel>
    </Box>
  );
};
