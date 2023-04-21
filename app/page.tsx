import DonutChart from "./components/charts/DonutChart";
import OuterChartComponent from "./components/charts/XYChart/OuterChartComponent";

export default function Home() {
  return (
    <main className="w-[95%] max-w-screen-xl mx-auto">
      {/* <DonutChart /> */}
      <OuterChartComponent />
    </main>
  );
}
