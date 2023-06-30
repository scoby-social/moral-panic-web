import { NFTCardProps } from "components/common/NFTCard/types";
import { NftInMarketplace } from "lib/web3/types/NftInMarketplace";

export interface BuyNftListDealStatement extends NFTCardProps {
  statement: NftInMarketplace;
}
