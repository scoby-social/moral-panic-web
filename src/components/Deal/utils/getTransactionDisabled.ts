import { compareSymbol } from "./compareSymbol";

export const getTransactionDisabled = (symbol: string, userHasNft: boolean) => {
  const symbolCompared = compareSymbol(symbol);

  if (symbolCompared && userHasNft) {
    return true;
  }

  return false;
};
