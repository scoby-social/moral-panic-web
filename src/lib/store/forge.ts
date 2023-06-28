import { WoodenNickelQuota } from "components/Forge/Items/types";
import { atom } from "jotai";

export const woodenNickelAddress = atom<string | null>(null);
export const woodenNickelCurrentQuota = atom<WoodenNickelQuota | null>(null);
