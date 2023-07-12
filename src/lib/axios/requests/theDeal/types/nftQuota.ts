export interface NftQuota {
  _id: string;
  upTo: number;
  maxList: number;
  increasesAt: number;
  nextQuota: string | null;
  amount: number;
}
