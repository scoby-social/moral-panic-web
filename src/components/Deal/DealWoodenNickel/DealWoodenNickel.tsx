import React, { useEffect, useMemo, useState } from "react";

import { Box, Typography } from "@mui/material";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@metaplex-foundation/js";

import NFTCard from "components/common/NFTCard/NFTCard";
import { getTheDealForgeQuota } from "lib/axios/requests/theDeal/getTheDealForgeQuota";
import { buyWoodenNickelTheDeal } from "lib/web3/woodenNickel/buyWoodenNickelTheDeal";
import { NftInMarketplace } from "lib/web3/types/NftInMarketplace";
import { buyNftTheDeal } from "lib/axios/requests/theDeal/buyNftTheDeal";
import { listWoodenNickel } from "lib/web3/woodenNickel/listWoodenNickel";
import { NftToList } from "lib/web3/types/nftToList";
import { CustomTab, CustomTabs } from "components/common/CustomTabs";
import { TabPanel } from "components/common/CustomTabs/TabPanel";
import {
  nftListStyle,
  tabContainer,
  tabHeader,
  titleDeal,
  subContainer,
} from "./styles";
import { NFTCardProps } from "components/common/NFTCard/types";
import { getNftToBuy } from "../utils/getNftToBuy";
import { getNftsToDeal } from "../utils/getNftsToDeal";
import { updateAmountListed } from "lib/axios/requests/theDeal/updateAmountListed";
import NFTCardFullScreen from "components/common/NFTCard/NFTCardFullScreen";
import { getTokenBalanceByWallet } from "lib/web3/getTokenBalanceByWallet";

function tabProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const DealWoodenNickel = () => {
  const wallet = useWallet();

  const [nftsToSell, setNftsToSell] = useState([] as NftToList[]);
  const [nftsToSellProps, setNftsToSellProps] = useState([] as NFTCardProps[]);

  const [nftToBuy, setNftToBuy] = useState<null | NftInMarketplace>(null);
  const [nftToBuyProps, setNftToBuyProps] = useState<null | NFTCardProps>(null);

  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    if (wallet.connected && wallet.publicKey) {
      init().then();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet.connected]);

  useEffect(() => {}, [wallet.publicKey]);
  useEffect(() => {}, [nftsToSellProps, nftToBuyProps]);

  const init = async () => {
    const buyData = await getNftToBuy(wallet);
    const nftsTheDealMarket = buyData ? buyData.lisNftMarket : [];

    if (buyData) {
      setNftToBuy(buyData.statement);
    }

    const sellData = await getNftsToDeal(wallet, nftsTheDealMarket);
    const sellStatement = sellData.map(i => i.statement).flat();
    setNftsToSell(sellStatement);

    setNftsToSellProps(sellData);
    setNftToBuyProps(buyData);
  };

  const handleTabsChange = (
    e: React.SyntheticEvent<Element, Event>,
    newValue: number
  ) => {
    setTabValue(newValue);
  };

  const handleBuyNft = async (nft: NftInMarketplace, amount: number) => {
    const buyer = wallet.publicKey as PublicKey;
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

      setTimeout(async () => {
        await init();
      }, 2000);
    }

    const buyData = await getNftToBuy(wallet);

    if (buyData) {
      setNftToBuy(buyData.statement);
      setNftToBuyProps(buyData);
    }

    return response;
  };

  const handleSellNft = async (nft: NftToList, amount: number) => {
    const userWallet = wallet.publicKey as PublicKey;
    const quota = await getTheDealForgeQuota(userWallet.toString());

    if (quota.maxList < amount) {
      return false;
    }

    const info = await getTokenBalanceByWallet(
      userWallet,
      new PublicKey(nft.mint)
    );

    if (info < amount) {
      return false;
    }

    const response = await listWoodenNickel(nft, wallet, amount);

    if (response) {
      await updateAmountListed(userWallet, amount);
      await init();
    }

    return response;
  };

  return (
    <Box sx={subContainer}>
      {/* TABS */}
      <Box sx={tabHeader}>
        <CustomTabs
          value={tabValue}
          onChange={handleTabsChange}
          aria-label="basic tabs example"
        >
          <CustomTab label="Buy" {...tabProps(0)} />
          <CustomTab label="Sell" {...tabProps(1)} />
        </CustomTabs>
      </Box>

      {/* Buy */}
      <TabPanel value={tabValue} index={0}>
        <Box sx={tabContainer}>
          <Typography sx={titleDeal}>
            Welcome to The Deal, where your dealer’s got the goods.
          </Typography>

          <Box sx={nftListStyle}>
            {nftToBuyProps && nftToBuy ? (
              <>
                <NFTCardFullScreen
                  {...nftToBuyProps}
                  maxWidth
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
        <Box sx={tabContainer}>
          <Typography sx={titleDeal}>
            List your stuff with the dealer and maybe he’ll move it for you.
          </Typography>

          <Box sx={nftListStyle}>
            {nftsToSellProps.map((value, index) => {
              const nft = nftsToSell.find(
                i => i.mint === value.mint
              ) as NftToList;

              return (
                <>
                  {index === 0 && (
                    <NFTCardFullScreen
                      key={`${value.description + index + value.mint}`}
                      {...value}
                      maxWidth={index === 0}
                      handleTransaction={amount => handleSellNft(nft, amount)}
                    />
                  )}
                  {index > 0 && (
                    <NFTCard
                      key={`${value.description + index + value.mint}`}
                      {...value}
                      maxWidth={index === 0}
                      handleTransaction={amount => handleSellNft(nft, amount)}
                    />
                  )}
                </>
              );
            })}
          </Box>
        </Box>
      </TabPanel>
    </Box>
  );
};
