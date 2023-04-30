import React, { createContext, useContext, useMemo, useState } from "react";
import useRequest from "../hooks/useRequest";
import { BASE_URL } from "../constants";
import { getAssetsBySymbol } from "../utils";

interface CoinContext {
  coin: { symbol: string };
  allPairs: Record<string, any>[];
  selectedPair: Record<string, any> | null;
  baseAsset: string;
  quoteAsset: string;
  fetchingTradingPairs: boolean;
  updateCoinContext: (update: Record<string, any>) => void;
}

const coinContext = createContext<CoinContext>({
  coin: { symbol: "" },
  allPairs: [],
  selectedPair: null,
  baseAsset: "",
  quoteAsset: "",
  fetchingTradingPairs: false,
  updateCoinContext: () => {},
});

export default function CoinContextProvider({ children }) {
  const [data, setData] = useState({ symbol: "BTCUSDT" });
  const { response, isLoading } = useRequest(`${BASE_URL}/ticker/24hr`, {
    Method: "POST",
  });

  const allPairs = useMemo(() => {
    return response?.map((pair) => ({
      ...pair,
      ...getAssetsBySymbol(pair.symbol),
    }));
  }, [response]);

  const selectedPair = useMemo(() => {
    return allPairs?.find?.((pair) => pair.symbol === data.symbol);
  }, [data.symbol, allPairs]);

  const { baseAsset, quoteAsset } = getAssetsBySymbol(data.symbol);

  const updateCoinContext = (update: Record<string, any>) => {
    setData((prev) => ({ ...prev, ...update }));
  };

  return (
    <coinContext.Provider
      value={{
        coin: data,
        allPairs,
        selectedPair,
        baseAsset,
        quoteAsset,
        fetchingTradingPairs: isLoading,
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
