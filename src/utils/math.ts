export const movingAverage = (data: number[], windowSize: number): number[] => {
  return data.map((_, index, arr) => {
    const start = Math.max(0, index - windowSize + 1);
    const subset = arr.slice(start, index + 1);
    const sum = subset.reduce((a, b) => a + b, 0);
    return sum / subset.length;
  });
};
