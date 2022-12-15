import React, { useState, useEffect, useRef, useCallback } from "react";
import { changeCurrentMusic, selectCurrentMusic } from "../../../store/currentMusic/currentMusic";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import "../../../styles/molecules/_audioPlayer.scss";
import AudioControls from "../../atoms/AudioControls";
import Library from "../../molecules/Library";
import { IMUSIC } from "../../utils/data/data";

const AudioPlayer: React.FC<{ tracks: IMUSIC[] }> = ({ tracks }) => {
  const { currentMusicIndex } = useAppSelector(selectCurrentMusic);
  const dispatch = useAppDispatch();
  const [trackProgress, setTrackProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const { name, artist, color, cover, audio } = tracks[currentMusicIndex];
  const audioRef = useRef(new Audio(audio));
  const intervalRef = useRef(setInterval(() => {}, 1000));
  const isReady = useRef(false);

  // Destructure for conciseness
  const { duration } = audioRef.current;

  const toPrevTrack = useCallback(() => {
    let index = currentMusicIndex - 1;
    if (currentMusicIndex - 1 < 0) {
      index = tracks.length - 1;
    }
    dispatch(changeCurrentMusic({ currentMusicIndex: index }));
  }, [currentMusicIndex, tracks.length, dispatch]);

  const toNextTrack = useCallback(() => {
    let index = 0;
    if (currentMusicIndex < tracks.length - 1) {
      index = currentMusicIndex + 1;
    }
    dispatch(changeCurrentMusic({ currentMusicIndex: index }));
  }, [currentMusicIndex, tracks.length, dispatch]);

  const startTimer = useCallback(() => {
    // Clear any timers already running
    clearInterval(intervalRef.current);
    if (!intervalRef.current) {
      return;
    }
    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        toNextTrack();
      } else {
        setTrackProgress(audioRef.current.currentTime);
      }
    }, 1000);
  }, [toNextTrack]);

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

  // Handle setup when changing tracks
  useEffect(() => {
    audioRef.current.pause();

    audioRef.current = new Audio(audio);
    setTrackProgress(audioRef.current.currentTime);

    if (isReady.current) {
      audioRef.current.play();
      setIsPlaying(true);
      startTimer();
    } else {
      // Set the isReady ref as true for the next pass
      isReady.current = true;
    }
  }, [currentMusicIndex, audio, startTimer]);

  const onScrub = (value: string) => {
    // Clear any timers already running
    clearInterval(intervalRef.current);
    audioRef.current.currentTime = +value;
    setTrackProgress(audioRef.current.currentTime);
  };

  const onScrubEnd = () => {
    // If not already playing, start
    if (!isPlaying) {
      setIsPlaying(true);
    }
    startTimer();
  };

  const currentPercentage = duration
    ? `${(trackProgress / duration) * 100}%`
    : "0%";
  const trackStyling = `
  -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #fff), color-stop(${currentPercentage}, #777))
`;

  return (
    <div style={{ display: "flex" }}>
      <Library musicList={tracks} />
      <div className="audio-player">
        <div className="track-info">
          <img className="artwork" src={cover} alt={`${name}/${artist}`} />
          <h2 className="name">{name}</h2>
          <h3 className="artist">{artist}</h3>
          <AudioControls
            isPlaying={isPlaying}
            onPrevClick={toPrevTrack}
            onNextClick={toNextTrack}
            onPlayPauseClick={setIsPlaying}
          />
          {trackProgress}
          <input
            type="range"
            value={trackProgress}
            step="1"
            min="0"
            max={duration ? duration : `${duration}`}
            className="progress"
            onChange={(e) => onScrub(e.target.value)}
            onMouseUp={onScrubEnd}
            onKeyUp={onScrubEnd}
            style={{ background: trackStyling }}
          />
          {duration}
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
