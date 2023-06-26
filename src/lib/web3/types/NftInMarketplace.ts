import { PublicKey } from "@metaplex-foundation/js";

export interface NftInMarketplace {
    name:                    string;
    symbol:                  string;
    description:             string;
    seller_fee_basis_points: number;
    image:                   string;
    external_url:            string;
    edition:                 number;
    attributes:              Attribute[];
    properties:              Properties;
    collection:              Collection;
    key:                     number;
    updateAuthority:         string;
    mint:                    string;
    data:                    Data;
    primarySaleHappened:     number;
    isMutable:               number;
    editionNonce:            null;
    owner:                   PublicKey;
    price:                   number;
    amount:                  number;
}

export interface Attribute {
    trait_type: string;
    value:      string;
}

export interface Collection {
    name:   string;
    family: string;
}

export interface Data {
    name:                 string;
    symbol:               string;
    uri:                  string;
    sellerFeeBasisPoints: number;
    creators:             DataCreator[];
}

export interface DataCreator {
    address:  string;
    verified: number;
    share:    number;
}

export interface Properties {
    files:    File[];
    category: string;
    creators: PropertiesCreator[];
}

export interface PropertiesCreator {
    address: string;
    share:   number;
}

export interface File {
    uri:  string;
    type: string;
}
