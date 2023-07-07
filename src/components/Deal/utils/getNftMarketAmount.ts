import { NftInMarketplace } from "lib/web3/types/NftInMarketplace";

export const getNftMarketAmount = (
  nftMarket: NftInMarketplace[],
  symbol: string
) => {
  const marketFiltered = nftMarket.filter(val => val.symbol === symbol);
  const marketAmountArr = marketFiltered.map(val => val.amount);

  return marketAmountArr.reduce((prev, curr) => prev + curr);
};
