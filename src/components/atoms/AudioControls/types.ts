export interface IAudioControlsProps {
  isPlaying: boolean;
  onClick: (val: boolean) => void;
  onPreviousTrackClick: () => void;
  onNextTrackClick: () => void;
}
