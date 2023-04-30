import React from "react";
import { classNames } from "../../../../utils";
import {
  SvgAngleDown,
  SvgCandleChart,
  SvgExpand,
  SvgRedo,
  SvgUndo,
} from "../../../ui/icons";

export default function TradesChartHeader({ interval, setInterval }) {
  return (
    <div className="app__trades-chart__header base-card">
      <p className="app__trades-chart__header__filter-label">Time</p>
      {INTERVALS.map((filter, i) => (
        <button
          className={classNames("app__trades-chart__header__filter-btn", {
            active: filter.value === interval,
          })}
          onClick={() => setInterval(filter.value)}
          key={i}
        >
          {filter.label}
        </button>
      ))}

      <button key="1m">
        <SvgAngleDown />
      </button>

      <div className="app__trades-chart__header__actions">
        <div className="app__trades-chart__header__actions__action">
          <button>
            <SvgCandleChart />
          </button>
        </div>

        <div className="app__trades-chart__header__actions__action">
          <button>Fx Indicators</button>
        </div>

        <div className="app__trades-chart__header__actions__action">
          <button>
            <SvgUndo />
          </button>
          <button>
            <SvgRedo />
          </button>
        </div>
      </div>

      <button className="app__trades-chart__header__expand-btn">
        <SvgExpand />
      </button>
    </div>
  );
}

const INTERVALS = [
  { label: "1H", value: "1h" },
  { label: "2H", value: "2h" },
  { label: "4H", value: "4h" },
  { label: "1D", value: "1d" },
  { label: "1W", value: "1w" },
  { label: "1M", value: "1m" },
];
