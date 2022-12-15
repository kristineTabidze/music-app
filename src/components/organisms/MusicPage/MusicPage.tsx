import React from "react";
import AudioPlayer from "../AudioPlayer";
import Library from "../../molecules/Library";
import { MUSIC } from "../../utils/data/data";

const MusicPage: React.FC = () => {
  return (
    <div style={{ display: "flex" }}>
      <Library musicList={MUSIC} />
      <AudioPlayer tracks={MUSIC} />
    </div>
  );
};

export default MusicPage;
