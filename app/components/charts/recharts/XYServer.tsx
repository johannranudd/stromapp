import XYChart from "./XYChart";
import { getElectricityPrice } from "@/app/utils/gets";
import { use } from "react";
export default function XYServer() {
  const currentDate: Date = new Date();
  const todayStringDate: string = currentDate.toISOString().slice(0, 10);
  const dataFromAPI = use(
    getElectricityPrice(todayStringDate, todayStringDate, 1)
  );
  return <XYChart {...dataFromAPI} />;
}
