import { compareSymbol } from "./compareSymbol";

export const getQuota = (hasNft: boolean, hasFakeId: boolean, symbol: string) => {
  const symbolCompared = compareSymbol(symbol);

  if ((hasNft && symbolCompared) || hasFakeId) {
    return 0;
  }

  return 1;
};
