export type FeaturedCardProps = {
  imageUrl: string;
  title: string;
  description: string;
  metadata: Metadata[];
  locked: boolean;
  fetchInfo: () => void;
};

type Metadata = {
  title: string;
  description: string;
  link?: boolean;
};
