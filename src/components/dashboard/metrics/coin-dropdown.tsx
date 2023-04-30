import React, { useCallback, useRef, useState } from "react";
import { SvgBtcUsdt, SvgSearchIcon, SvgSharpAngleDown } from "../../ui/icons";
import { classNames, getCoinIconSrc } from "../../../utils";
import useTabs from "../../../hooks/useTabs";
import useClickOutside from "../../../hooks/useClickOutside";
import {
  filterPairBySearchTerm,
  filterPairsByQuoteAsset,
  getSymbolsTableData,
} from "./utils";
import { useCoinContext } from "../../../context/coinContext";
import debounce from "lodash.debounce";
import TradingPairRow from "./trading-pair-row";

export default function CoinDropdown() {
  const dropdownRef = useRef(null);
  const {
    allPairs,
    fetchingTradingPairs,
    baseAsset,
    quoteAsset,
    updateCoinContext,
  } = useCoinContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [showCoinDropdown, setCoinDropdownVisibility] = useState(false);
  const { tabs, activeTab } = useTabs({
    tabs: ["All", "USDT", "BTC", "ETH", "BNB"],
  });
  const tradingPairs = getSymbolsTableData(allPairs);

  const filteredTradingPairs = tradingPairs
    ?.filter?.(filterPairsByQuoteAsset(activeTab))
    .filter(filterPairBySearchTerm(searchTerm));

  const selectPair = (symbol: string) => {
    updateCoinContext({ symbol });
    setCoinDropdownVisibility(false);
  };

  useClickOutside(() => setCoinDropdownVisibility(false), dropdownRef?.current);

  const search = useCallback(
    debounce((term) => {
      setSearchTerm(term);
    }, 400),
    []
  );

  const handleTermChange = ({ currentTarget: { name, value } }) => {
    search(value);
  };

  const getContent = () => {
    if (fetchingTradingPairs) {
      return (
        <p className="base-empty">Fetching trading pairs, please wait...</p>
      );
    }
    if (filteredTradingPairs?.length === 0) {
      return <p className="base-empty">No trading pair found</p>;
    }
    return (
      <>
        {filteredTradingPairs?.map(
          ({ symbol, amount, percentage, assets }, i) => (
            <TradingPairRow
              {...{ symbol, amount, percentage, assets }}
              onClick={() => selectPair(symbol)}
              key={i}
            />
          )
        )}
      </>
    );
  };

  return (
    <div className="form-select-dropdown" ref={dropdownRef}>
      <button
        className="app__dashboard-metrics__coin-dropdown"
        onClick={() => setCoinDropdownVisibility(!showCoinDropdown)}
      >
        <div className="base-pair-icon">
          <img src={getCoinIconSrc(baseAsset)} alt={baseAsset} />
          <img src={getCoinIconSrc(quoteAsset)} alt={quoteAsset} />
        </div>
        <p>
          {baseAsset}/{quoteAsset}
        </p>
        <SvgSharpAngleDown />
      </button>

      <div
        className={classNames(
          "app__dashboard-metrics__coin-dropdown__dropdown form-select-dropdown__dropdown",
          { active: showCoinDropdown }
        )}
      >
        <p>Select Market</p>

        <div className="app__dashboard-metrics__coin-dropdown__search">
          <SvgSearchIcon />
          <input type="text" placeholder="Search" onChange={handleTermChange} />
        </div>

        <div className="app__dashboard-metrics__coin-dropdown__tabs">
          {tabs.map((tab, i) => (
            <button
              className={classNames({ active: tab.isActive })}
              onClick={tab.onClick}
              key={i}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="app__dashboard-metrics__coin-dropdown__table">
          {getContent()}
        </div>
      </div>
    </div>
  );
}
