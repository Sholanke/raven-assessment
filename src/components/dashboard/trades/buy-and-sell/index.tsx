import React from "react";
import useTabs from "../../../../hooks/useTabs";
import Tabs from "../../../ui/tabs";
import FormInput from "../../../ui/form-elements/form-input";
import FormSelect from "../../../ui/form-elements/form-select";
import FormCheckbox from "../../../ui/form-elements/form-checkbox";
import ToolTip from "../../../ui/tool-tip";
import Button from "../../../ui/button";
import FormCurrencyDropdown from "../../../ui/form-elements/form-currency-dropdown";
import { classNames } from "../../../../utils";
import "./index.scss";

export default function BuyAndSell() {
  const { tabs } = useTabs({
    tabs: ["Buy", "Sell"],
  });

  const { tabs: secondaryTabs, isActiveTab: isActiveSecondaryTab } = useTabs({
    tabs: ["Limit", "Default", "Stop-limit"],
  });

  return (
    <div className="base-card app__buy-and-sell">
      <Tabs config={tabs} glow />

      <div className="app__buy-and-sell__secondary-tabs">
        {secondaryTabs.map((tab, i) => (
          <button
            className={classNames({ active: tab.isActive })}
            onClick={tab.onClick}
            key={i}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {isActiveSecondaryTab("Stop-limit") && (
        <FormInput label="USD" tooltip={{ title: "Trigger price" }} />
      )}

      {isActiveSecondaryTab(["Limit", "Stop-limit"]) && (
        <FormInput label="USD" tooltip={{ title: "Limit price" }} />
      )}

      <FormInput label="USD" tooltip={{ title: "Amount" }} />

      {isActiveSecondaryTab(["Limit", "Stop-limit"]) && (
        <FormSelect tooltip={{ title: "Type" }} options={TYPE_OPTIONS} />
      )}

      {isActiveSecondaryTab("Limit") && (
        <FormCheckbox>
          <ToolTip title="Post Only" />
        </FormCheckbox>
      )}

      <div className="app__buy-and-sell__total">
        <p>Total</p>
        <p>0.00</p>
      </div>

      <Button variant="gradient" full>
        Buy BTC
      </Button>

      <div>
        <div className="app__buy-and-sell__total-available">
          <div>
            <span className="app__buy-and-sell__total-available__key">
              Total account value
            </span>
            <p className="app__buy-and-sell__total-available__value">0.00</p>
          </div>

          <FormCurrencyDropdown options={CURRENCY_OPTIONS} />
        </div>

        <div className="app__buy-and-sell__total-available">
          <div>
            <span className="app__buy-and-sell__total-available__key">
              Open Orders
            </span>
            <p className="app__buy-and-sell__total-available__value">0.00</p>
          </div>

          <div>
            <span className="app__buy-and-sell__total-available__key">
              Available
            </span>
            <p className="app__buy-and-sell__total-available__value">0.00</p>
          </div>
        </div>
      </div>

      <Button>Deposit</Button>
    </div>
  );
}

const CURRENCY_OPTIONS = [
  {
    label: "Nigerian Naira",
    value: "NGN",
    icon: "/assets/images/NGN.png",
  },
  {
    label: "British Pounds",
    value: "GBP",
    icon: "/assets/images/GBP.png",
  },
  {
    label: "US Dollars",
    value: "USD",
    icon: "/assets/images/USD.png",
  },
];

const TYPE_OPTIONS = [
  {
    label: "Fill or kill",
    value: "Fill or kill",
  },
  {
    label: "Good till cancelled",
    value: "Good till cancelled",
  },
  {
    label: "Good till date",
    value: "Good till date",
  },
  {
    label: "Immediate or cancel",
    value: "Immediate or cancel",
  },
];
