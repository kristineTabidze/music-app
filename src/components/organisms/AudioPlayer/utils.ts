export const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time - minutes * 60);
  const secondsString = seconds < 10 ? `0${seconds}` : seconds;
  return `${minutes}:${secondsString}`;
};
