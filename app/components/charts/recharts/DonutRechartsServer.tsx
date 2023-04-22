import DonutRechartsClient from "./DonutRechartsClient";
import { getElectricityPrice } from "@/app/utils/gets";
import { use } from "react";

export default function DonutRechartsServer() {
  const currentDate: Date = new Date();
  const todayStringDate: string = currentDate.toISOString().slice(0, 10);
  const dataFromAPI = use(
    getElectricityPrice(todayStringDate, todayStringDate, 1)
  );
  return (
    // <div className="ml-auto md:w-[70%] bg-red-500">
    <DonutRechartsClient {...dataFromAPI} />
    // </div>
  );
}
