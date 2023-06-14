import { OrderedSelectedLayers } from "lib/axios/requests/users/types/orderedSelectedLayers";
import { uploadImages } from "lib/axios/requests/users/uploadImages";
import { filterLayersToCheckNewExceptions } from "components/Forge/Identity/PhotoBooth/LayerBuilder/utils/filterLayersToCheckNewExceptions";

import { deleteShadowDriveFile } from "../deleteShadowDriveFile";
import { mintFakeID } from "./mintFakeID";
import { MetadataAttributes, Metadata } from "../types/metadata";
import { UploadNftParams } from "../types/uploadNftParams";
import { UploadNFTReturnType } from "../types/uploadNFTReturnType";
import { saveJsonMetadata } from "../uploadFileToShdwDrive";

export async function uploadNFT({
  selectedLayers,
  resultingLayer,
  formResult,
  leaderWalletAddress,
  wallet,
  parentNftAddress,
  seniority,
  updateMessage,
  woodenNickel,
}: UploadNftParams): Promise<UploadNFTReturnType> {
  const attributes: MetadataAttributes[] = [];
  const orderedLayers: OrderedSelectedLayers = {
    selectedLayers: [],
    name: formResult.username,
  };

  const today = new Date();
  const UTCDate = today.toJSON();
  const splittedDate = UTCDate.split("T");
  const splittedTime = splittedDate[1].split(".");

  const quarter = Math.floor((today.getMonth() + 3) / 3);
  const year = today.getFullYear();

  const name = `${formResult.username} the ${formResult.amplifierRole} ${formResult.superpowerRole}`;
  const croppedName = name.slice(0, 27);

  const metadata: Metadata = {
    name: croppedName,
    description: formResult.bio,
    image: resultingLayer.image,
    symbol: "HELLPASS",
    seniority,
    pronouns: formResult.pronouns,
    external_link: `www.hellbenders.world/${formResult.username}`,
    collection_name: "Hellbenders Fake ID",
    family_name: "Mapshifting",
    parent: leaderWalletAddress,
    mint_wallet: wallet.publicKey!.toString(),
    twitter_handle: formResult.twitterHandle,
    discord_handle: formResult.discordHandle,
    telegram_handle: formResult.telegramHandle,
    username: formResult.username,
    birthday: splittedDate[0],
    time_of_birth: `${splittedTime[0]} UTC`,
    season: `Q${quarter} ${year}`,
  };

  const filteredLayers = [...selectedLayers];

  filterLayersToCheckNewExceptions(filteredLayers);

  filteredLayers.forEach(layer => {
    if (layer && !layer.skipped) {
      attributes.push({
        trait_type: layer.type.toString(),
        value: layer.name.split(".")[0],
      });

      orderedLayers.selectedLayers.push({
        type: layer.type,
        name: layer.name,
      });
    }
  });

  updateMessage("Your image is being deployed to the blockchain.");

  const resultingImages = await uploadImages(orderedLayers);

  metadata.image = resultingImages.nftImageURL;

  const contentType = "application/json;charset=utf-8;";

  const blob = new Blob(
    [
      decodeURIComponent(
        encodeURI(JSON.stringify({ ...metadata, attributes }))
      ),
    ],
    { type: contentType }
  );

  const blobUri = URL.createObjectURL(blob);

  updateMessage("Your identity is being concealed from the authorities.");

  const metadataShdwUrl = await saveJsonMetadata(
    blob,
    blobUri,
    `${metadata.username}.json`,
    process.env.NEXT_PUBLIC_SHDW_STORE_ACCOUNT!
  );

  let nftAddress = "";

  updateMessage("Your Fake ID is being minted.");

  try {
    nftAddress = await mintFakeID(
      wallet,
      metadataShdwUrl,
      metadata.name,
      parentNftAddress,
      woodenNickel
    );
  } catch (err) {
    deleteShadowDriveFile(metadataShdwUrl);
    deleteShadowDriveFile(metadata.image);
    throw err;
  }

  URL.revokeObjectURL(blobUri);

  return {
    image: resultingImages.profileImageURL,
    nftAddress,
    metadataUrl: metadataShdwUrl,
  };
}
