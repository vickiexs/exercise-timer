export const formatTime = (totalSeconds: number) => {
  if (totalSeconds >= 3600) {
    const hh = Math.floor(totalSeconds / 3600);
    const remaining = totalSeconds % 3600;
    const mm = Math.floor(remaining / 60);
    const ss = remaining % 60;
    return `${hh.toString().padStart(2, "0")}:${mm
      .toString()
      .padStart(2, "0")}:${ss.toString().padStart(2, "0")}`;
  }

  const mm = Math.floor(totalSeconds / 60);
  const ss = totalSeconds % 60;
  return `${mm}:${ss.toString().padStart(2, "0")}`;
};
