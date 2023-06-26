import React, { useEffect, useState } from "react";
import { container, subContainer, title } from "../styles";

import { Box, Tab, Tabs, Typography } from "@mui/material";

import NFTCard from "components/common/NFTCard/NFTCard";
import { NFTCardProps, messageType } from "components/common/NFTCard/types";
import { useWallet } from "@solana/wallet-adapter-react";
import { getWoodenNickelsListMarket } from "lib/web3/woodenNickel/getWoodenNickelsListMarket";
import styled from "@emotion/styled";

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

  const [nftsToSell, setNftsToSell] = useState([] as NFTCardProps[]);

  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    if (wallet.connected) {
      getNftsToDeal().then(data => {
        setNftsToSell(data);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet.connected]);

  const getNftsToDeal = async () => {
    const nftList = await getWoodenNickelsListMarket(wallet);

    const nftFiltered = nftList.map(async nft => {
      const minterString = nft.name.split(" ")[0];
      const minter = minterString.substring(0, minterString.length - 2);

      const image = await (await fetch(nft.image)).blob();
      const imageUrl = URL.createObjectURL(image);

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
      } as NFTCardProps;
    });

    return Promise.all(nftFiltered);
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
  return (
    <Box sx={subContainer}>
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
        </Box>
      </TabPanel>
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

          {nftsToSell.map(
            (value, index) =>
              value.amount > 0 && (
                <NFTCard key={`${value.description + index}`} {...value} />
              )
          )}
        </Box>
      </TabPanel>
    </Box>
  );
};
/* 


*/
