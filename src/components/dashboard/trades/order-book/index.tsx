import React, { useEffect, useRef, useState } from "react";
import useTabs from "../../../../hooks/useTabs";
import Tabs from "../../../ui/tabs";
import useResizeObserver from "../../../../hooks/useResizeObserver";
import OrderBookTab from "./order-book-tab";
import TradesChart from "../trades-chart";
import "./index.scss";

export default function OrderBook() {
  const [baseTabs, setBaseTabs] = useState(DESKTOP_TABS);
  const { tabs, activateTab, isActiveTab } = useTabs({ tabs: baseTabs });
  const orderBookRef = useRef(null);

  useResizeObserver(() => {
    const newTabs = window.innerWidth <= 600 ? MOBILE_TABS : DESKTOP_TABS;
    setBaseTabs(newTabs);
  }, orderBookRef);

  useEffect(() => {
    activateTab(baseTabs[0]);
  }, [baseTabs[0]]);

  return (
    <div className="base-card app__trades__order-book" ref={orderBookRef}>
      <div className="app__trades__order-book__section">
        <Tabs config={tabs} />
      </div>

      {isActiveTab("Charts") ? <TradesChart /> : null}
      {isActiveTab("Order Book") ? <OrderBookTab /> : null}
      {isActiveTab("Recent Trades") ? <OrderBookTab /> : null}
    </div>
  );
}

const DESKTOP_TABS = ["Order Book", "Recent Trades"];
const MOBILE_TABS = ["Charts", "Order Book", "Recent Trades"];
