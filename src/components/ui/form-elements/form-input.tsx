import React, { useState } from "react";
import { classNames } from "../../../utils";
import ToolTip from "../tool-tip";

export default function FormInput({ label, tooltip: { title } }) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <label className={classNames("form-input", { focused: isFocused })}>
      <ToolTip title={title} />

      <input
        type="text"
        placeholder="0.00"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <span>{label}</span>
    </label>
  );
}
