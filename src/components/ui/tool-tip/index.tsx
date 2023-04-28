import React from "react";
import { SvgInfo } from "../icons";
import "./index.scss";

export default function ToolTip({ title }) {
  return (
    <p className="base-tool-tip">
      {title} <SvgInfo />
    </p>
  );
}
