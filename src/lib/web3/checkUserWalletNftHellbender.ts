import { checkIfUserHasFakeID } from "./fakeID/checkIfUserHasFakeID";
import { checkIfUserHasWoodenNickel } from "./woodenNickel/checkIfUserHasWoodenNickel";

export const checkUserWalletNftHellbender = async (wallet: any) => {
  const userWn = await checkIfUserHasWoodenNickel(wallet);
  const userFakeID = await checkIfUserHasFakeID(wallet);

  const userWalletChecked = {
    HELLPASS: userFakeID,
    NICKEL: userWn,
  };

  return userWalletChecked;
};
