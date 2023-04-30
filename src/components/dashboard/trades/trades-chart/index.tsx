import React, { useEffect, useRef, useState } from "react";
import TradesChartHeader from "./trades-chart-header";
import { ColorType, createChart } from "lightweight-charts";
import { SvgSquaredArrowDown } from "../../../ui/icons";
import { classNames } from "../../../../utils";
import useResizeObserver from "../../../../hooks/useResizeObserver";
import useRequest from "../../../../hooks/useRequest";
import { useCoinContext } from "../../../../context/coinContext";
import { formatCandleStickData } from "./utils";
import "./index.scss";

interface TradesChartProps {
  className?: string;
}

export default function TradesChart({ className = "" }: TradesChartProps) {
  const [interval, setInterval] = useState("4h");
  const { coin } = useCoinContext();
  const { response } = useRequest(
    `https://api.binance.com/api/v3/klines?symbol=${coin.symbol}&interval=${interval}`,
    { method: "GET" },
    [coin.symbol, interval]
  );
  const tradingData = response ? formatCandleStickData(response) : [];

  const chartRef = useRef<any>();
  const chart = useRef<any>();
  const candlestickSeriesRef = useRef<any>();
  const histogramChartRef = useRef<any>();

  useEffect(() => {
    candlestickSeriesRef.current?.setData(tradingData);
    histogramChartRef.current?.setData(tradingData);
  }, [tradingData]);

  useEffect(() => {
    if (chart.current) return;

    chart.current = createChart(chartRef.current, {
      width: chartRef.current.clientWidth,
      height: chartRef.current.clientHeight,
      ...CHART_CONFIG.CHART_LAYOUT,
    });

    candlestickSeriesRef.current = chart.current.addCandlestickSeries(
      CHART_CONFIG.CANDLE_STICK_CONFIG
    );
    histogramChartRef.current = chart.current.addHistogramSeries(
      CHART_CONFIG.HISTOGRAM_CONFIG
    );
  }, []);

  useResizeObserver((entries) => {
    const { width, height } = entries[0].contentRect;
    chart.current.applyOptions({ width, height });
  }, chartRef);

  return (
    <div className={classNames("app__trades-chart", className)}>
      <TradesChartHeader interval={interval} setInterval={setInterval} />
      <div className="app__trades-chart__content base-card">
        <div className="app__trades-chart__content__chart">
          <div className="app__trades-chart__content__chart__metrics">
            <button>
              <SvgSquaredArrowDown />
            </button>
            <p>
              O <span>36,641.54</span>
            </p>
            <p>
              H <span>36,641.54</span>
            </p>
            <p>
              L <span>36,641.54</span>
            </p>
            <p>
              C <span>36,641.54</span>
            </p>
            <p>
              Change: <span>2.33%</span>
            </p>
            <p>
              Amplitude <span>6.59%</span>
            </p>
          </div>

          <div className="app__trades-chart__content__chart__volume-metrics">
            <p>
              Vol(BTC): <span>65.254K</span>
            </p>
            <p>
              Vol(USDT): <span>2.418B</span>
            </p>
          </div>

          <div className="chart-container" ref={chartRef}>
            {/* === trades chart === */}
          </div>
        </div>
      </div>
    </div>
  );
}

const CHART_CONFIG = {
  CHART_LAYOUT: {
    layout: {
      background: {
        type: ColorType.Solid,
        color: "transparent",
      },
      textColor: "#A7B1BC",
    },
    grid: {
      vertLines: {
        color: "#1C2127",
      },
      horzLines: {
        color: "#1C2127",
      },
    },
    priceScale: {
      borderColor: "#555C63",
    },
    timeScale: {
      borderColor: "#485c7b",
      timeVisible: true,
      secondsVisible: false,
    },
  },
  CANDLE_STICK_CONFIG: {
    borderDownColor: "#FF6838",
    borderUpColor: "#00C076",
    wickDownColor: "#FF6838",
    wickUpColor: "#00C076",
  },
  HISTOGRAM_CONFIG: {
    base: 0,
    priceFormat: {
      type: "volume",
    },
    overlay: true,
    scaleMargins: {
      top: 0.8,
      bottom: 0,
    },
  },
};
