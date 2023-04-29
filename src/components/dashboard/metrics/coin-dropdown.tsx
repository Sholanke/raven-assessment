import React, { useRef, useState } from "react";
import { SvgBtcUsdt, SvgSearchIcon, SvgSharpAngleDown } from "../../ui/icons";
import { classNames } from "../../../utils";
import useTabs from "../../../hooks/useTabs";
import useClickOutside from "../../../hooks/useClickOutside";

export default function CoinDropdown() {
  const [showCoinDropdown, setCoinDropdownVisibility] = useState(false);
  const { tabs } = useTabs({ tabs: ["All", "USD", "BTC"] });
  const dropdownRef = useRef(null);

  useClickOutside(() => setCoinDropdownVisibility(false), dropdownRef?.current);

  return (
    <div className="form-select-dropdown" ref={dropdownRef}>
      <button
        className="app__dashboard-metrics__coin-dropdown"
        onClick={() => setCoinDropdownVisibility(!showCoinDropdown)}
      >
        <SvgBtcUsdt className="app__dashboard-metrics__coin-dropdown__coin-icon" />
        <p>BTC/USDT</p>
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

        <div>
          {MOCK_TABLE_DATA.map(
            ({ label, amount, percentage, icon: Icon }, i) => (
              <div
                className="app__dashboard-metrics__coin-dropdown__table-row"
                key={i}
              >
                <div>
                  <Icon /> <p>{label}</p>
                </div>
                <div className="app__dashboard-metrics__coin-dropdown__table-row__value">
                  <p>{amount}</p>
                  <p className="percentage">{percentage}</p>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

const MOCK_TABLE_DATA = [
  {
    label: "BTC - USDT",
    amount: "$23,234.6",
    percentage: "+0.005%",
    icon: SvgBtcUsdt,
  },
  {
    label: "BTC - USDT",
    amount: "$23,234.6",
    percentage: "+0.005%",
    icon: SvgBtcUsdt,
  },
  {
    label: "BTC - USDT",
    amount: "$23,234.6",
    percentage: "+0.005%",
    icon: SvgBtcUsdt,
  },
  {
    label: "BTC - USDT",
    amount: "$23,234.6",
    percentage: "+0.005%",
    icon: SvgBtcUsdt,
  },
  {
    label: "BTC - USDT",
    amount: "$23,234.6",
    percentage: "+0.005%",
    icon: SvgBtcUsdt,
  },
];
