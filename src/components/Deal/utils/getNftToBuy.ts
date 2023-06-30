import { checkIfUserHasWoodenNickel } from "lib/web3/woodenNickel/checkIfUserHasWoodenNickel";
import { getWoodenNickelsListMarket } from "lib/web3/woodenNickel/getWoodenNickelsListMarket";
import { BuyNftListDealStatement } from "../types/buyNftListDealStatement";

export const getNftToBuy = async (wallet: any) => {
  const nfts = await getWoodenNickelsListMarket(wallet);
  const nft = nfts.find(i => i.amount > 0);

  if (!nft) {
    return null;
  }

  const image = await (await fetch(nft.image)).blob();
  const imageUrl = URL.createObjectURL(image);

  const minterString = nft.name.split(" ")[0];
  const minter = minterString.substring(0, minterString.length - 2);

  const userWn = await checkIfUserHasWoodenNickel(wallet);

  return {
    external_url: nft.external_url,
    description: nft.description,
    image: imageUrl,
    seniority: "2",
    name: nft.name,
    symbol: nft.symbol,
    price: nft.price,
    amount: nft.amount,
    minter,
    type: "buy",
    transactionDisabled: nft.symbol === "NICKEL" ? userWn : false,
    statement: nft,
    lisNftMarket: nfts,
  } as BuyNftListDealStatement;
};
