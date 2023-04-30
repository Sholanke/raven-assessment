import React from "react";
import { classNames, getCoinIconSrc } from "../../../utils";
import { useCoinContext } from "../../../context/coinContext";

export default function TradingPairRow({
  symbol,
  amount,
  percentage,
  onClick,
  assets,
}) {
  const { coin } = useCoinContext();

  return (
    <button
      onClick={onClick}
      className={classNames(
        "app__dashboard-metrics__coin-dropdown__table-row",
        { active: symbol === coin.symbol }
      )}
    >
      <div>
        <div className="base-pair-icon">
          <img src={getCoinIconSrc(assets.baseAsset)} alt={assets.baseAsset} />
          <img src={getCoinIconSrc(assets?.quoteAsset)} alt={assets.quoteAsset}
          />
        </div>
        <p>{symbol}</p>
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
  );
}