export interface NftToList {
  name: string;
  description: string;
  image: string;
  symbol: string;
  seniority: number;
  pronouns: string;
  external_url: string;
  minter: string;
  key: number;
  updateAuthority: string;
  mint: string;
  data: Data;
  primarySaleHappened: number;
  isMutable: number;
  editionNonce: null;
  listed: boolean;
}

export interface Data {
  name: string;
  symbol: string;
  uri: string;
  sellerFeeBasisPoints: number;
  creators: Creator[];
}

export interface Creator {
  address: string;
  verified: number;
  share: number;
}
