import DashboardMetrics from "./components/dashboard/metrics";
import Trades from "./components/dashboard/trades";
import NavBar from "./components/ui/nav-bar";
import CoinContextProvider from "./context/coinContext";

export default function App() {
  return (
    <CoinContextProvider>
      <NavBar />
      <DashboardMetrics />
      <Trades />
    </CoinContextProvider>
  );
}
