import React from "react";
import useTabs from "../../../../hooks/useTabs";
import Tabs from "../../../ui/tabs";
import "./index.scss";

export default function OpenOrders() {
  const { tabs, activeTab } = useTabs({
    tabs: ["Open Orders", "Positions", "Order History", "Trade History"],
  });

  return (
    <div className="app__open-orders base-card">
      <div className="app__open-orders__tabs-container">
        <Tabs config={tabs} widthFit />
      </div>

      <div className="app__open-orders__empty-state">
        <h4>No {activeTab}</h4>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id pulvinar
          nullam sit imperdiet pulvinar.
        </p>
      </div>
    </div>
  );
}
