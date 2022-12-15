import React from "react";
import Typography from "../../primitives/Typography";
import Image from "../../primitives/Image";
import "../../../styles/atoms/_musicListITem.scss";
import { IMUSIC } from "../../utils/data/data";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  changeCurrentMusic,
  selectCurrentMusic,
} from "../../../store/currentMusic/currentMusic";

const MusicListItem: React.FC<{ music: IMUSIC, index: number }> = ({ music, index }) => {
  const { currentMusicIndex } = useAppSelector(selectCurrentMusic);
  const dispatch = useAppDispatch();
  const { id, cover, name, artist } = music;
  const isCurrentMusic = currentMusicIndex === index;

  return (
    <div
      className={`music-list-item ${
        isCurrentMusic ? "music-list-item--active" : ""
      }`}
      onClick={() => dispatch(changeCurrentMusic({ currentMusicIndex: index}))}
    >
      <Image src={cover} className="music-list-item__image" />
      <div className="music-list-item__typography-list">
        <Typography className="music-list-item__title" variant="h2">
          {name}
        </Typography>
        <Typography className="music-list-item__artist" variant="p">
          {artist}
        </Typography>
      </div>
    </div>
  );
};

export default MusicListItem;
