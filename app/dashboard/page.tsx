import { getElectricityPrice } from "../utils/gets";
import { use } from "react";
import LocationAndDateForm from "./components/LocationAndDateForm";
import MainContent from "./components/MainContent";
import XYServer from "../components/charts/recharts/XYServer";
export default function page() {
  const currentDate: Date = new Date();
  const todayStringDate: string = currentDate.toISOString().slice(0, 10);
  const dataFromAPI = use(
    getElectricityPrice(todayStringDate, todayStringDate, 1)
  );

  return (
    <div>
      <h1 className="py-8 text-center text-2xl">Dashboard</h1>
      <LocationAndDateForm />
      <MainContent {...dataFromAPI} />
      <div className="w-full max-w-screen-lg mx-auto bg-secondary text-primary dark:bg-primary dark:text-secondary">
        <XYServer />
      </div>
    </div>
  );
}
