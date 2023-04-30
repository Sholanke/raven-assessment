import React, { createContext, useContext, useMemo, useState } from "react";
import useRequest from "../hooks/useRequest";

interface CoinContext {
  coin: { symbol: string };
  allPairs: Record<string, any>[];
  selectedPair: Record<string, any> | null;
  updateCoinContext: (update: Record<string, any>) => void;
}

const coinContext = createContext<CoinContext>({
  coin: { symbol: "" },
  allPairs: [],
  selectedPair: null,
  updateCoinContext: () => {},
});

const EXCHANGE_INFO_URL = "https://api.binance.com/api/v3/ticker/24hr";

export default function CoinContextProvider({ children }) {
  const [data, setData] = useState({ symbol: "BTCUSDT" });
  const { response: allPairs } = useRequest(EXCHANGE_INFO_URL, {
    Method: "POST",
  });

  const selectedPair = useMemo(() => {
    return allPairs?.find?.((pair) => pair.symbol === data.symbol);
  }, [data.symbol, allPairs]);

  const updateCoinContext = (update: Record<string, any>) => {
    setData((prev) => ({ ...prev, ...update }));
  };

  return (
    <coinContext.Provider
      value={{
        coin: data,
        allPairs,
        selectedPair,
        updateCoinContext,
      }}
    >
      {children}
    </coinContext.Provider>
  );
}

export function useCoinContext() {
  return useContext(coinContext);
}
