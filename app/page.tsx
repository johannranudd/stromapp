import DonutRechartsServer from "./components/charts/recharts/DonutRechartsServer";
import XYServer from "./components/charts/recharts/XYServer";

export default function Home() {
  return (
    <main className="w-[95%] max-w-screen-xl mx-auto">
      <DonutRechartsServer />
      <div className="my-12 py-12">
        <XYServer />
      </div>
    </main>
  );
}
