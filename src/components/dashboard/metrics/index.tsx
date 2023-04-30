import React from "react";
import { SvgArrowDown, SvgArrowUp, SvgChart, SvgClock } from "../../ui/icons";
import { classNames, formatPercentage, formatNumber } from "../../../utils";
import CoinDropdown from "./coin-dropdown";
import { useCoinContext } from "../../../context/coinContext";
import "./index.scss";

export default function DashboardMetrics() {
  const { selectedPair } = useCoinContext();

  const getPercentageChange = (price = 0) => {
    const percent =
      (+price - +selectedPair?.lastPrice) / +selectedPair?.lastPrice;
    return parseFloat(percent.toFixed(5));
  };

  const metaData = {
    price: formatNumber(selectedPair?.lastPrice || 0),
    metrics: [
      {
        label: "24h change",
        value: `$${formatNumber(Math.abs(+selectedPair?.priceChange))} ${
          formatPercentage(selectedPair?.priceChangePercent) || "0"
        }%`,
        icon: SvgClock,
        highlight: true,
        decrease: selectedPair?.priceChange < 0,
      },
      {
        label: "24h high",
        value: `$${formatNumber(selectedPair?.highPrice)} ${
          formatPercentage(getPercentageChange(selectedPair?.highPrice)) || "0"
        }%`,
        icon: SvgArrowUp,
      },
      {
        label: "24h low",
        value: `$${formatNumber(selectedPair?.lowPrice)} ${
          formatPercentage(getPercentageChange(selectedPair?.lowPrice)) || "0"
        }%`,
        icon: SvgArrowDown,
      },
      {
        label: "24h volume",
        value: `${formatNumber(selectedPair?.volume)}`,
        icon: SvgChart,
      },
    ],
  };

  return (
    <div className="app__container">
      <div className="app__dashboard-metrics base-card">
        <div className="app__dashboard-metrics__coin-dropdown-container">
          <CoinDropdown />
          <div className="app__dashboard-metrics__price">${metaData.price}</div>
        </div>

        <div className="app__dashboard-metrics__changes">
          {metaData.metrics.map((metric, i) => (
            <div
              className={classNames("app__dashboard-metrics__metric", {
                highlight: metric.highlight,
                decrease: metric.decrease,
              })}
              key={i}
            >
              <span>
                <metric.icon />
                {metric.label}
              </span>
              <p>{metric.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
