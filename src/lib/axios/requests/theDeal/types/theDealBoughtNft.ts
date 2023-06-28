export interface TheDealBougthNft {
    _id: string;
    walletOwner: string;
    walletBuyer: string;
    tokenAddress: string;
    tokenSymbol: string;
    nftMetadataUrl: string;
    createdAt: Date;
    amount: number;
}