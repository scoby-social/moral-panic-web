import React from "react";
import { container, subContainer } from "../styles";

import { Box } from "@mui/material";

import NFTCard from "components/common/NFTCard/NFTCard";

export const DealWoodenNickel = () => {
  const nftdata = {
    name: "Fred’s Wooden Nickel",
    symbol: "NICKEL",
    description: `
  With this Wooden Nickel you can forge the Fake ID you’ll need for your voyage into the Hellbenders Slipstream.

The first Wooden Nickel was issued in 1933 by the town of Blaine, Washington as a real currency when their bank failed during the Great Depression. Many other towns followed suit until the U.S. Congress outlawed wooden currency just a few years later.

The Hellbenders Motorcycle Club honors each member as a sovereign soul with the inalienable right to mint their own currency. 

  `,
    image: "/rose.png",
    external_url: "https://quest.hellbenders.world/",
    minter: "Fred",
    seniority: "2",
    creators: "Fred",
  };
  return (
    <Box sx={subContainer}>
      <NFTCard {...nftdata} />
    </Box>
  );
};
