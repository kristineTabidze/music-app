export interface IAudioControlsProps {
  isPlaying: boolean;
  onPlayPauseClick: (val: boolean) => void;
  onPrevClick: () => void;
  onNextClick: () => void;
}
