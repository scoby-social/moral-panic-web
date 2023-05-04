import { SpinePlayer } from "@esotericsoftware/spine-player";
import React, { useEffect } from "react";

export const SpineAnimations = () => {
  useEffect(() => {
    const spinePlayer = new SpinePlayer("animation-custom", {
      preserveDrawingBuffer: true,
      jsonUrl: "assets/spineSprites/HellyGirl/Hellbenders.json",
      atlasUrl: "assets/spineSprites/HellyGirl/HellyGirl_Skins2.atlas",
      premultipliedAlpha: true,
      backgroundColor: "#cccccc",
      viewport: {
        debugRender: true,
      },
      showControls: true,
      skins: ["Characters/Helly8", "Weapons/Chainsaw"],
    });
  }, []);
  return <div>SpineAnimations</div>;
};
