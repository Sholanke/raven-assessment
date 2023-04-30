import { formatNumber } from "../../../../utils";

export function formatOrderBookData(
  data: [string, string][] = [],
  isAsks = false
) {
  return data.map(([price, amount], i) => {
    const total = data
      .slice(...(isAsks ? [i] : [0, i + 1]))
      .map(([_, amount]) => +amount)
      .reduce((acc, curr) => {
        return +acc + +curr;
      });

    return {
      price: formatNumber(price),
      amount: formatNumber(amount),
      percentage: 90,
      total: formatNumber(total),
    };
  });
}
