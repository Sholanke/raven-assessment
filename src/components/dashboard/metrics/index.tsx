import React from "react";
import { SvgArrowDown, SvgArrowUp, SvgChart, SvgClock } from "../../ui/icons";
import { classNames } from "../../../utils";
import CoinDropdown from "./coin-dropdown";
import "./index.scss";

export default function DashboardMetrics() {
  return (
    <div className="app__container">
      <div className="app__dashboard-metrics base-card">
        <div className="app__dashboard-metrics__coin-dropdown-container">
          <CoinDropdown />
          <div className="app__dashboard-metrics__price">$20,634</div>
        </div>

        <div className="app__dashboard-metrics__changes">
          {METRICS.map((metric, i) => (
            <div
              className={classNames("app__dashboard-metrics__metric", {
                highlight: metric.highlight,
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

const METRICS = [
  {
    label: "24h change",
    value: "520.80 +1.25%",
    icon: SvgClock,
    highlight: true,
  },
  {
    label: "24h high",
    value: "520.80 +1.25%",
    icon: SvgArrowUp,
  },
  {
    label: "24h low",
    value: "520.80 +1.25%",
    icon: SvgArrowDown,
  },
  {
    label: "24h volume",
    value: "520.80 +1.25%",
    icon: SvgChart,
  },
];
