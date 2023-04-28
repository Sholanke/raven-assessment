import React, { useState } from "react";
import { SvgSharpAngleDown } from "../icons";
import FormSelectDropDown from "./form-select-dropdown";

export default function FormCurrencyDropdown({ options }) {
  const [selectedOption, setSelectedOption] = useState("");

  return (
    <div className="form-currency-dropdown">
      <FormSelectDropDown
        title={"Currency"}
        options={options}
        value={selectedOption}
        onChange={setSelectedOption}
      >
        <button className="form-currency-dropdown__label">
          <p>{selectedOption || "Select currency"}</p>
          <SvgSharpAngleDown />
        </button>
      </FormSelectDropDown>
    </div>
  );
}
