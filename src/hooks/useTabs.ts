import { useState } from "react";
import { useMemo } from "react";

interface UseTabsProps {
  tabs: string[];
}

export default function useTabs({ tabs }: UseTabsProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const isActiveTab = (slug: string | string[]) => {
    return Array.isArray(slug) ? slug.includes(activeTab) : activeTab === slug;
  };

  const modifiedTabs = useMemo(() => {
    return tabs.map((tab, i) => ({
      label: tab,
      onClick: () => setActiveTab(tab),
      isActive: isActiveTab(tab),
    }));
  }, [tabs]);

  return {
    tabs: modifiedTabs,
    activeTab,
    isActiveTab,
    activateTab: setActiveTab,
  };
}
