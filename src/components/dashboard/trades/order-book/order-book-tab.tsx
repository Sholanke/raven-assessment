import React from "react";
import { SvgAngleDown, SvgArrowUp } from "../../../ui/icons";
import { classNames } from "../../../../utils";
import { ORDERS } from "./constants";
import useTabs from "../../../../hooks/useTabs";
import useRequest from "../../../../hooks/useRequest";
import { BASE_URL } from "../../../../constants";
import { useCoinContext } from "../../../../context/coinContext";
import { formatOrderBookData } from "./utils";

export default function OrderBookTab() {
  const { coin, baseAsset, quoteAsset } = useCoinContext();
  const { isActiveTab, activateTab } = useTabs({
    tabs: ORDERS.map(({ key }) => key),
  });

  const { response, isLoading } = useRequest(
    `${BASE_URL}/depth?symbol=${coin.symbol}&limit=6`,
    { method: "GET" },
    [coin.symbol]
  );

  const asks = response
    ? formatOrderBookData(response.asks?.slice(0, 5), true)
    : [];
  const bids = response ? formatOrderBookData(response.bids) : [];
  const lowestAsk = asks[asks.length - 1]?.price;
  const highestBid = bids[0]?.price;

  const getContext = () => {
    if (isLoading && !response) {
      return <p className="base-empty">Fetching order book...</p>;
    }
    return (
      <>
        {/* ASKS */}
        {asks.map(({ price, amount, total, percentage }, i) => (
          <Order {...{ price, amount, total, percentage }} ask key={i} />
        ))}
        {asks.length === 0 ? (
          <p className="base-empty">"No asks found"</p>
        ) : null}

        <div className="app__trades__order-book__table__divider">
          <p
            className={classNames({
              "color-green": highestBid >= lowestAsk,
              "color-red": lowestAsk > highestBid,
            })}
          >
            {highestBid || "0.00"}
          </p>
          <SvgArrowUp />
          <p>{lowestAsk || "0.00"}</p>
        </div>

        {/* BIDS */}
        {bids.map(({ price, amount, total, percentage }, i) => (
          <Order {...{ price, amount, total, percentage }} key={i} />
        ))}
        {bids.length === 0 ? (
          <p className="base-empty">"No bids found</p>
        ) : null}
      </>
    );
  };

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
            5 <SvgAngleDown />
          </button>
        </div>
      </div>

      <div className="app__trades__order-book__table">
        <div className="app__trades__order-book__table__row--head">
          <div>Price ({quoteAsset})</div>
          <div>Amounts ({baseAsset})</div>
          <div>Total</div>
        </div>

        {getContext()}
      </div>
    </>
  );
}

function Order({ price, amount, total, percentage, ask = false }) {
  return (
    <div
      className={classNames("app__trades__order-book__table__row", {
        "theme-green": !ask,
        "theme-red": ask,
      })}
    >
      <div>{price}</div>
      <div>{amount}</div>
      <div>{total}</div>
      <span
        className="percentage-bar"
        style={{ width: `${percentage}%` }}
      ></span>
    </div>
  );
}
