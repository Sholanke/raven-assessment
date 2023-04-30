export const formatCandleStickData = (chartData) => {
  return chartData.map((data) => {
    const [openTime, open, high, low, close, volume] = data;
    return {
      time: +openTime / 1000,
      open: parseFloat(open),
      high: parseFloat(high),
      low: parseFloat(low),
      close: parseFloat(close),
      value: parseFloat(volume),
      color: open < close ? "#00C076" : "#FF6838",
    };
  });
};
