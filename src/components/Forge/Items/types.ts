export type WoodenNickelQuota = {
  minted: number;
  upTo: number;
  maxList: number;
  increasesAt: number;
  nextQuota: string | null;
};

export type WoodenNickelLineage = {
  minter?: string;
  parent: string;
  grandParent: string;
  grandGrandParent: string;
  creator?: string;
};
