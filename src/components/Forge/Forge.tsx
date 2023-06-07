import { useWallet } from "@solana/wallet-adapter-react";

import Items from "./Items/Items";
import Welcome from "./Welcome/Welcome";

const ForgeMain = () => {
  const { publicKey } = useWallet();
  return !publicKey ? <Welcome /> : <Items />;
};

export default ForgeMain;
