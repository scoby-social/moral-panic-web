import { compareSymbol } from "./compareSymbol";

export const getQuota = (
  hasNft: boolean,
  hasFakeId: boolean,
  symbol: string,
  simbolToCompare: string
) => {
  const symbolCompared = compareSymbol(symbol, simbolToCompare);

  if ((hasNft && symbolCompared) || hasFakeId) {
    return 0;
  }

  return 1;
};
