import React from "react";
import { SvgCheck } from "../icons";

export default function FormCheckbox({ children, ...props }) {
  return (
    <label className="form-checkbox">
      <input {...props} type="checkbox" />
      <span className="form-checkbox__tick">
        <SvgCheck />
      </span>
      {children}
    </label>
  );
}
