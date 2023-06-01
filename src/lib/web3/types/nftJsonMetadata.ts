export interface NftJsonMetadata {
    name:                    string;
    symbol:                  string;
    description:             string;
    seller_fee_basis_points: number;
    image:                   string;
    external_url:            string;
    attributes:              Attribute[];
    properties:              Properties;
}

export interface Attribute {
    trait_type: string;
    value:      string;
}

export interface Properties {
    edition:  number;
    files:    File[];
    category: string;
    creators: Creator[];
}

export interface Creator {
    address: string;
    share:   number;
}

export interface File {
    uri:  string;
    type: string;
}