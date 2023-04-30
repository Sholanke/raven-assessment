import { SvgBtcUsdt } from "../../ui/icons";

export function getSymbolsTableData(symbols: Record<string, any>[]) {
  return symbols?.map?.(({ symbol, lastPrice, priceChangePercent }) => ({
    symbol: `${symbol}`,
    amount: formatPrice(lastPrice),
    percentage: formatPercentage(priceChangePercent),
    icon: SvgBtcUsdt,
  }));
}

export function formatPercentage(priceChangePercent: number) {
  return +priceChangePercent > 0
    ? `+${priceChangePercent}`
    : priceChangePercent;
}

export function formatPrice(price: string | number) {
  return !price || price == 0 ? "0.00" : Number(price).toLocaleString("en-US");
}
