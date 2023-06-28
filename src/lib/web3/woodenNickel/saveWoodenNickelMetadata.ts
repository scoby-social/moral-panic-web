import { WoodenNickelLineage } from "components/Forge/Items/types";
import { saveJsonMetadata } from "../uploadFileToShdwDrive";

export async function saveWoodenNickelMetadata(
  name: string,
  serial: number,
  lineage: WoodenNickelLineage
): Promise<string> {
  const symbol = "NICKEL";
  const description = `
    With this Wooden Nickel you can forge the Fake ID you’ll need for your voyage into the Hellbenders Slipstream.

The first Wooden Nickel was issued in 1933 by the town of Blaine, Washington as a real currency when their bank failed during the Great Depression. Many other towns followed suit until the U.S. Congress outlawed wooden currency just a few years later.

The Hellbenders Motorcycle Club honors each member as a sovereign soul with the inalienable right to mint their own currency. 

This Wooden Nickel was minted by ${name} as legal tender in the Slipstream.
  `;
  const image =
    "https://shdw-drive.genesysgo.net/BLFjCRyZkaF9GGwiorXPRwYJVpxD7VrrKNH7XccWUCWF/wooden_nickel.png";
  const externalUrl = "https://quest.hellbenders.world/";
  const minter = name;
  const seniority = serial;

  const metadata = {
    name: `${name}'s Wooden Nickel`,
    description,
    symbol,
    image,
    external_url: externalUrl,
    minter,
    seniority,
    lineage,
  };

  const contentType = "application/json;charset=utf-8;";

  const blob = new Blob(
    [decodeURIComponent(encodeURI(JSON.stringify(metadata)))],
    { type: contentType }
  );

  const blobUri = URL.createObjectURL(blob);

  const result = await saveJsonMetadata(
    blob,
    blobUri,
    `${name}_wooden_nickel.json`,
    process.env.NEXT_PUBLIC_SHDW_WN_ACCOUNT!
  );

  return result;
}
