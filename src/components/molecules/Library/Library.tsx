import React from "react";
import MusicListItem from "../../atoms/MusicListItem";
import Typography from "../../primitives/Typography";
import { ILibraryProps } from "./types";
import "../../../styles/molecules/_library.scss";

const Library: React.FC<ILibraryProps> = ({ musicList }) => {
  return (
    <nav className="library">
      <Typography className="library__title">Library</Typography>
      <ul>
        {musicList.map((music, key) => (
          <li key={music.id}>
            <MusicListItem music={music} index={key} />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Library;
