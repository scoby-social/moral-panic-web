import { Attribute } from "lib/web3/types/nftJsonMetadata";

export interface NFTFullCardProps {
    guidance: string;
    creationDate: string;
    symbol: string;
    familyName: string;
    collectionName: string;
    externalUrl: string;
    title: string;
    imageUrl: string;
    attributes: Attribute[];
}