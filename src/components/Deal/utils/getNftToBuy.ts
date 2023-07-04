import { getWoodenNickelsListMarket } from "lib/web3/woodenNickel/getWoodenNickelsListMarket";
import { BuyNftListDealStatement } from "../types/buyNftListDealStatement";
import { checkUserWalletNftHellbender } from "lib/web3/checkUserWalletNftHellbender";
import { getTransactionDisabled } from "./getTransactionDisabled";
import { getQuota } from "./getQuota";
import { getNftMarketAmount } from "./getNftMarketAmount";

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

  const userWalletChecked = await checkUserWalletNftHellbender(wallet);
  const userWn = userWalletChecked["NICKEL"];
  const userFakeID = userWalletChecked["HELLPASS"];

  const quota = getQuota(userWn, userFakeID, nft.symbol, "NICKEL");
  const transactionDisabled = getTransactionDisabled(
    nft.symbol,
    "NICKEL",
    userWn
  );

  const realAmount = getNftMarketAmount(nfts, nft.symbol);

  return {
    external_url: nft.external_url,
    description: nft.description,
    image: imageUrl,
    seniority: "2",
    name: nft.name,
    symbol: nft.symbol,
    price: nft.price,
    amount: realAmount,
    minter,
    type: "buy",
    statement: nft,
    lisNftMarket: nfts,
    userHasFakeId: userFakeID,
    transactionDisabled,
    quota,
  } as BuyNftListDealStatement;
};
