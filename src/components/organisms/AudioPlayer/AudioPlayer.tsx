import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  changeCurrentMusic,
  selectCurrentMusic,
} from "../../../store/currentMusic/currentMusic";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import "../../../styles/molecules/_audioPlayer.scss";
import AudioControls from "../../atoms/AudioControls";
import Library from "../../molecules/Library";
import { IMUSIC } from "../../utils/data/data";
import { formatTime } from "./utils";
import Image from "../../primitives/Image";
import Typography from "../../primitives/Typography";

const AudioPlayer: React.FC<{ tracks: IMUSIC[] }> = ({ tracks }) => {
  const { currentMusicIndex } = useAppSelector(selectCurrentMusic);
  const dispatch = useAppDispatch();
  const [trackProgress, setTrackProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const { name, artist, color, cover, audio } = tracks[currentMusicIndex];
  const audioRef = useRef(new Audio(audio));
  const intervalRef = useRef(setInterval(() => {}, 1000));
  const isReady = useRef(false);

  const onPreviousTrackClick = useCallback(() => {
    let index = currentMusicIndex - 1;
    if (currentMusicIndex - 1 < 0) {
      index = tracks.length - 1;
    }
    dispatch(changeCurrentMusic({ currentMusicIndex: index }));
  }, [currentMusicIndex, tracks.length, dispatch]);

  const onNextTrackClick = useCallback(() => {
    let index = 0;
    if (currentMusicIndex < tracks.length - 1) {
      index = currentMusicIndex + 1;
    }
    dispatch(changeCurrentMusic({ currentMusicIndex: index }));
  }, [currentMusicIndex, tracks.length, dispatch]);

  const startTimer = useCallback(() => {
    clearInterval(intervalRef.current);
    if (!intervalRef.current) {
      return;
    }
    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        onNextTrackClick();
      } else {
        setTrackProgress(audioRef.current.currentTime);
      }
    }, 1000);
  }, [onNextTrackClick]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
      startTimer();
    } else {
      clearInterval(intervalRef.current);

      audioRef.current.pause();
    }
    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    };
  }, [isPlaying, startTimer]);

  useEffect(() => {
    audioRef.current.pause();

    audioRef.current = new Audio(audio);
    setTrackProgress(audioRef.current.currentTime);

    if (isReady.current) {
      audioRef.current.play();
      setIsPlaying(true);
      startTimer();
    } else {
      isReady.current = true;
    }
  }, [currentMusicIndex, audio, startTimer]);

  const onAudioRangeChange = (value: string) => {
    clearInterval(intervalRef.current);
    audioRef.current.currentTime = +value;
    setTrackProgress(audioRef.current.currentTime);
  };

  const onKeyUp = useCallback(() => {
    if (!isPlaying) {
      setIsPlaying(true);
    }
    startTimer();
  }, [isPlaying, startTimer]);

  const { duration } = audioRef.current;
  const currentPercentage = duration
    ? `${(trackProgress / duration) * 100}%`
    : "0%";
  const trackStyling = `
  -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, ${color[0]}), color-stop(${currentPercentage}, #e7e7e7))
`;

  return (
    <div className="audio-player">
      <Image src={cover} alt={name} isRound className="audio-player__cover" />
      <Typography className="audio-player__artist" variant="h2">
        {artist}
      </Typography>
      <Typography className="audio-player__name">{name}</Typography>
      <div className="audio-player__progress">
        {formatTime(trackProgress)}
        <input
          type="range"
          value={trackProgress}
          step="1"
          min="0"
          max={duration || 0}
          className="audio-player__progress-slider"
          onChange={(e) => onAudioRangeChange(e.target.value)}
          onMouseUp={onKeyUp}
          onKeyUp={onKeyUp}
          style={{ background: trackStyling }}
        />
        {formatTime(duration || 0)}
      </div>
      <AudioControls
        isPlaying={isPlaying}
        onPreviousTrackClick={onPreviousTrackClick}
        onNextTrackClick={onNextTrackClick}
        onClick={setIsPlaying}
      />
    </div>
  );
};

export default AudioPlayer;
