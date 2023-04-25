import { getElectricityPrice } from "../utils/gets";
import DashboardClient from "./components/DashboardClient";
import { use } from "react";
export default function page() {
  const currentDate: Date = new Date();
  const todayStringDate: string = currentDate.toISOString().slice(0, 10);
  const dataFromAPI = use(
    getElectricityPrice(todayStringDate, todayStringDate, 1)
  );

  return (
    <div>
      <h1 className="py-8 text-center text-2xl">Dashboard</h1>
      <DashboardClient {...dataFromAPI} />
    </div>
  );
}
