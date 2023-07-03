import { compareSymbol } from "./compareSymbol";

export const getTransactionDisabled = (
  symbol: string,
  symbolToCompare: string,
  userHasNft: boolean
) => {
  const symbolCompared = compareSymbol(symbol, symbolToCompare);

  return symbolCompared && userHasNft;
};
