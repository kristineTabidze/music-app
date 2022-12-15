import React from "react";
import MusicListItem from "../../atoms/MusicListItem";
import AudioPlayer from "../AudioPlayer";
import Library from "../../molecules/Library";
import { MUSIC } from "../../utils/data/data";

const MusicPage: React.FC = () => {
  const currentMusic = MUSIC.find((mus) => mus.active);

  return (
    // <div style={{ display: "flex" }}>
      <AudioPlayer tracks={MUSIC} />
    // </div>
  );
};

export default MusicPage;
