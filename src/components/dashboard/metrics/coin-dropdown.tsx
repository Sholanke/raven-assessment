import React, { useRef, useState } from "react";
import { SvgBtcUsdt, SvgSearchIcon, SvgSharpAngleDown } from "../../ui/icons";
import { classNames } from "../../../utils";
import useTabs from "../../../hooks/useTabs";
import useClickOutside from "../../../hooks/useClickOutside";
import { getSymbolsTableData } from "./utils";
import { useCoinContext } from "../../../context/coinContext";

export default function CoinDropdown() {
  const dropdownRef = useRef(null);
  const { coin, allPairs, updateCoinContext } = useCoinContext();
  const [showCoinDropdown, setCoinDropdownVisibility] = useState(false);
  const { tabs, activeTab } = useTabs({ tabs: ["All", "USDT", "BTC", "ETH"] });
  const tradingPairs = getSymbolsTableData(allPairs);

  const filteredTradingPairs = tradingPairs?.filter?.((pair) => {
    if (activeTab === "All") return true;
    if (pair.symbol.endsWith(activeTab)) return true;
    return false;
  });

  const selectPair = (symbol: string) => {
    updateCoinContext({ symbol });
    setCoinDropdownVisibility(false);
  };

  useClickOutside(() => setCoinDropdownVisibility(false), dropdownRef?.current);

  return (
    <div className="form-select-dropdown" ref={dropdownRef}>
      <button
        className="app__dashboard-metrics__coin-dropdown"
        onClick={() => setCoinDropdownVisibility(!showCoinDropdown)}
      >
        <SvgBtcUsdt className="app__dashboard-metrics__coin-dropdown__coin-icon" />
        <p>{coin.symbol}</p>
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
          <input type="text" placeholder="Search" />
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
          {filteredTradingPairs?.map(
            ({ symbol, amount, percentage, icon: Icon }, i) => (
              <button
                className={classNames(
                  "app__dashboard-metrics__coin-dropdown__table-row",
                  { active: symbol === coin.symbol }
                )}
                onClick={() => selectPair(symbol)}
                key={i}
              >
                <div>
                  <Icon /> <p>{symbol}</p>
                </div>
                <div className="app__dashboard-metrics__coin-dropdown__table-row__value">
                  <p>${amount === "0" ? "0.00" : amount}</p>
                  <p
                    className={classNames("percentage", {
                      decrease: +percentage < 0,
                    })}
                  >
                    {percentage}%
                  </p>
                </div>
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}
