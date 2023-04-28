import React from "react";
import "./index.scss";
import { classNames } from "../../../utils";

interface TabsProps {
  config: { isActive: boolean; label: string; onClick: () => void }[];
  glow?: boolean;
  widthFit?: boolean;
}

export default function Tabs({ config, glow = false, widthFit }: TabsProps) {
  return (
    <div className={classNames("base-tabs", { "w-fit": widthFit })}>
      {config?.map?.((tab, i) => (
        <button
          key={i}
          onClick={tab.onClick}
          className={classNames("base-tabs__tab", {
            glow,
            "active": tab.isActive,
          })}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
