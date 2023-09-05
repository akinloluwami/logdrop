export const formatTimeTaken = (ms: number) => {
  if (ms === 0) return "<1ms";

  if (ms > 1000) {
    const secondsValue = ms / 1000;
    return secondsValue.toFixed(2) + "s";
  }
  return ms + "ms";
};
