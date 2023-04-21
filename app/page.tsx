import XYChart from "./components/charts/recharts/XYChart";
import DonutChart from "./components/charts/visx/DonutChart";

export default function Home() {
  return (
    <main className="w-[95%] max-w-screen-xl mx-auto">
      <DonutChart />
      <XYChart />
    </main>
  );
}
