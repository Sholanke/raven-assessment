import React from "react";
import { SvgAngleDown, SvgArrowUp } from "../../../ui/icons";
import { classNames } from "../../../../utils";
import { ORDERS } from "./constants";
import useTabs from "../../../../hooks/useTabs";

export default function OrderBookTab() {
  const { isActiveTab, activateTab } = useTabs({
    tabs: ORDERS.map(({ key }) => key),
  });

  return (
    <>
      <div className="app__trades__order-book__section">
        <div className="app__trades__order-book__header">
          <div className="app__trades__order-book__order-btns">
            {ORDERS.map((order, i) => (
              <button
                key={i}
                className={classNames({ active: isActiveTab(order.key) })}
                onClick={() => activateTab(order.key)}
              >
                {order.icon}
              </button>
            ))}
          </div>

          <button className="app__trades__order-book__count-filter">
            10 <SvgAngleDown />
          </button>
        </div>
      </div>

      <div className="app__trades__order-book__table">
        <div className="app__trades__order-book__table__row--head">
          <div>Price (USDTC)</div>
          <div>Amounts (BTC)</div>
          <div>Total</div>
        </div>

        {ORDERS_TABLE_DATA_LOSS.map(
          ({ price, amount, total, percentage }, i) => (
            <div
              className="app__trades__order-book__table__row theme-red"
              key={i}
            >
              <div>{price}</div>
              <div>{amount}</div>
              <div>{total}</div>
              <span
                className="percentage-bar"
                style={{ width: `${percentage}%` }}
              ></span>
            </div>
          )
        )}

        <div className="app__trades__order-book__table__divider">
          <p className="color-green">36,641.20</p> <SvgArrowUp />
          <p>36,641.20</p>
        </div>

        {ORDERS_TABLE_DATA_GAIN.map(
          ({ price, amount, total, percentage }, i) => (
            <div
              className="app__trades__order-book__table__row theme-green"
              key={i}
            >
              <div>{price}</div>
              <div>{amount}</div>
              <div>{total}</div>
              <span
                className="percentage-bar"
                style={{ width: `${percentage}%` }}
              ></span>
            </div>
          )
        )}
      </div>
    </>
  );
}

const ORDERS_TABLE_DATA_LOSS = [
  { price: "36920.12", amount: "36920.12", total: "36920.12", percentage: 50 },
  { price: "36920.12", amount: "36920.12", total: "36920.12", percentage: 0.5 },
  { price: "36920.12", amount: "36920.12", total: "36920.12", percentage: 55 },
  { price: "36920.12", amount: "36920.12", total: "36920.12", percentage: 0.5 },
  { price: "36920.12", amount: "36920.12", total: "36920.12", percentage: 95 },
];

const ORDERS_TABLE_DATA_GAIN = [
  { price: "36920.12", amount: "36920.12", total: "36920.12", percentage: 90 },
  { price: "36920.12", amount: "36920.12", total: "36920.12", percentage: 60 },
  { price: "36920.12", amount: "36920.12", total: "36920.12", percentage: 40 },
  { price: "36920.12", amount: "36920.12", total: "36920.12", percentage: 50 },
  { price: "36920.12", amount: "36920.12", total: "36920.12", percentage: 50 },
];
