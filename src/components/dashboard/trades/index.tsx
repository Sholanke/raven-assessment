import React from "react";
import OrderBook from "./order-book";
import BuyAndSell from "./buy-and-sell";
import TradesChart from "./trades-chart";
import OpenOrders from "./open-orders";
import "./index.scss";

export default function Trades() {
  return (
    <div className="app__container app__dashboard-trades-container">
      <div className="app__dashboard-trades">
        <div className="app__dashboard-trades__grid">
          <TradesChart className="app__desktop-chart" />
          <OrderBook />
        </div>
        <OpenOrders />
      </div>
      <BuyAndSell />
    </div>
  );
}
