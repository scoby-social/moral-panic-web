export type NFTCardProps = {
  title: string;
  imageUrl: string;
  description: string;
  id: string;
  buttonTitle: string;
  locked: boolean;
  lockedText: string;
  price?: number;
  currency?: string;
};
