export const formatTimeTaken = (ms: number) => {
  if (ms > 1000) {
    const secondsValue = ms / 1000;
    return secondsValue.toFixed(2) + "s";
  } else {
    return ms + "ms";
  }
};
