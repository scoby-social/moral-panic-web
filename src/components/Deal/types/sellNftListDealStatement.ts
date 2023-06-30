import { NFTCardProps } from "components/common/NFTCard/types";
import { NftToList } from "../../../lib/web3/types/nftToList";

export interface SellNftListDealStatement extends NFTCardProps {
  statement: NftToList[];
}
