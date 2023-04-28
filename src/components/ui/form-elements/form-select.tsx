import React, { useState } from "react";
import ToolTip from "../tool-tip";
import FormSelectDropDown from "./form-select-dropdown";

export default function FormSelect({ tooltip: { title }, options }) {
  const [selectedOption, setSelectedOption] = useState("");

  return (
    <div className="form-input-container">
      <div className="form-input">
        <ToolTip title={title} />
        <FormSelectDropDown
          title={title}
          options={options}
          value={selectedOption}
          onChange={setSelectedOption}
        />
      </div>
    </div>
  );
}
