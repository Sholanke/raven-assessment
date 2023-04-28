import DashboardMetrics from "./components/dashboard/metrics";
import Trades from "./components/dashboard/trades";
import NavBar from "./components/ui/nav-bar";

export default function App() {
  return (
    <>
      <NavBar />
      <DashboardMetrics />
      <Trades />
    </>
  );
}
