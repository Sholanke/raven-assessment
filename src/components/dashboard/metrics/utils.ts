import { formatPercentage, formatNumber } from "../../../utils";
import { SvgBtcUsdt } from "../../ui/icons";

export function getSymbolsTableData(symbols: Record<string, any>[]) {
  return symbols?.map?.(({ symbol, lastPrice, priceChangePercent }) => ({
    symbol: `${symbol}`,
    amount: formatNumber(lastPrice),
    percentage: formatPercentage(priceChangePercent),
    icon: SvgBtcUsdt,
  }));
}

export function filterPairsByQuoteAsset(quoteAsset) {
  return (pair) => {
    if (quoteAsset === "All") return true;
    if (pair.symbol.endsWith(quoteAsset)) return true;
    return false;
  };
}

export function filterPairBySearchTerm(searchTerm) {
  return (pair) => {
    if (!searchTerm) return true;
    return pair.symbol
      .toLocaleLowerCase()
      .includes(searchTerm.toLocaleLowerCase());
  };
}
