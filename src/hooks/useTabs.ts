import { useCallback, useState } from "react";
import { useMemo } from "react";

interface UseTabsProps {
  tabs: string[];
}

export default function useTabs({ tabs }: UseTabsProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const isActiveTab = useCallback(
    (slug: string | string[]) =>
      Array.isArray(slug) ? slug.includes(activeTab) : activeTab === slug,
    [activeTab]
  );

  const modifiedTabs = useMemo(() => {
    return tabs.map((tab) => ({
      label: tab,
      onClick: () => setActiveTab(tab),
      isActive: isActiveTab(tab),
    }));
  }, [tabs, isActiveTab]);

  return {
    tabs: modifiedTabs,
    activeTab,
    isActiveTab,
    activateTab: setActiveTab,
  };
}
