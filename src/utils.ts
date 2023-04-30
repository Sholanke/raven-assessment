export function classNames(...props: (string | Record<string, any>)[]) {
  const className: string[] = [];

  props.map((c) => {
    // === if prop is a string ===
    if (typeof c === "string") return className.push(c);

    // === if prop is an object ===
    Object.keys(c).map((key) => {
      if (c[key]) className.push(key);
    });
  });

  return className.join(" ");
}

export function getAssetsBySymbol(symbol) {
  const baseCurrencies = /(\w+)((BNB)|(ETH)|(BTC)|(USDT))$/g;
  const [_, baseAsset, quoteAsset] = baseCurrencies.exec(symbol) || [];
  return { baseAsset, quoteAsset };
}

export function formatPercentage(priceChangePercent: number) {
  return +priceChangePercent > 0
    ? `+${priceChangePercent}`
    : priceChangePercent;
}

export function formatNumber(price: string | number) {
  const n =
    !price || price == 0 ? "0.00" : Number(price).toLocaleString("en-US");
  return n === "0" ? price : n;
}
