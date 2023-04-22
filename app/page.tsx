import XYServer from "./components/charts/recharts/XYServer";
import DonutChart from "./components/charts/visx/DonutChart";

export default function Home() {
  return (
    <main className="w-[95%] max-w-screen-xl mx-auto">
      <DonutChart />
      <div className="my-12 py-12">
        <XYServer />
      </div>
    </main>
  );
}
