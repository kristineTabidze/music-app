import React from "react";
import { IAudioControlsProps } from "./types";
import { ReactComponent as Play } from "../../../assets/svg/play.svg";
import { ReactComponent as Pause } from "../../../assets/svg/pause.svg";
import { ReactComponent as ArrowLeft } from "../../../assets/svg/arrow-left.svg";
import "../../../styles/atoms/_audioControls.scss";

const AudioControls: React.FC<IAudioControlsProps> = ({
  isPlaying,
  onClick: onPlayPauseClick,
  onPreviousTrackClick: onPrevClick,
  onNextTrackClick: onNextClick,
}) => {
  return (
    <div className="audio-controls">
      <button
        type="button"
        className="audio-controls__prev"
        aria-label="Previous"
        onClick={onPrevClick}
      >
        <ArrowLeft />
      </button>
      {isPlaying ? (
        <button
          type="button"
          className="audio-controls__pause"
          onClick={() => onPlayPauseClick(false)}
          aria-label="Pause"
        >
          <Pause />
        </button>
      ) : (
        <button
          type="button"
          className="audio-controls__play"
          onClick={() => onPlayPauseClick(true)}
          aria-label="Play"
        >
          <Play />
        </button>
      )}
      <button
        type="button"
        className="audio-controls__next"
        aria-label="Next"
        onClick={onNextClick}
      >
        <ArrowLeft />
      </button>
    </div>
  );
};

export default AudioControls;
