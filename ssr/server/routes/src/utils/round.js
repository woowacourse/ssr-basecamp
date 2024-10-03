export const round = (value) => {
  const factor = 10;
  return Math.round(value * factor) / factor;
};
