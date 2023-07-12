export interface NFTCardProps {
  name: string;
  maxWidth: boolean;
  symbol: string;
  description: string;
  image: string;
  external_url: string;
  minter: string;
  seniority: string;
  price: number;
  type?: "sell" | "buy";
  amount: number;
  volume?: number;
  quota: number;
  userHasFakeId?: boolean;
  transactionDisabled?: boolean;
  mint: string;
  fakeIdMintedToIncreasedAt: number;
  handleTransaction: (amount: number) => Promise<Boolean | undefined>;
}
