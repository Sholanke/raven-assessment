import React, { useState } from "react";
import { classNames } from "../../../../utils";
import {
  SvgAngleDown,
  SvgCandleChart,
  SvgExpand,
  SvgRedo,
  SvgUndo,
} from "../../../ui/icons";

export default function TradesChartHeader() {
  const [activeTimeFilter, setActiveTimeFilter] = useState("4H");

  return (
    <div className="app__trades-chart__header base-card">
      <p className="app__trades-chart__header__filter-label">Time</p>
      {TIME_FILTERS.map((filter, i) => (
        <button
          className={classNames("app__trades-chart__header__filter-btn", {
            active: filter.label === activeTimeFilter,
          })}
          onClick={() => setActiveTimeFilter(filter.label)}
          key={i}
        >
          {filter.label}
        </button>
      ))}

      <button className="app__trades-chart__header__filter-btn" key="1m">
        1M <SvgAngleDown />
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

const TIME_FILTERS = [
  { label: "1H" },
  { label: "2H" },
  { label: "4H" },
  { label: "1D" },
  { label: "1W" },
];
