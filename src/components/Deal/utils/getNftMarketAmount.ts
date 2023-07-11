import { NftInMarketplace } from "lib/web3/types/NftInMarketplace";

export const getNftMarketAmount = (
  nftMarket: NftInMarketplace[],
  symbol: string
) => {
  if (!nftMarket) return 0;
  if (nftMarket.length === 0) return 0;

  const marketFiltered = nftMarket.filter(
    val => val.symbol === symbol && val.amount
  );

  if (!marketFiltered) return 0;
  if (marketFiltered.length === 0) return 0;

  const marketAmountArr = marketFiltered.map(val => val.amount);

  return marketAmountArr.reduce((prev, curr) => prev + curr);
};
