import { getElectricityPrice } from "../utils/gets";
import { use } from "react";
export default function page() {
  const currentDate: Date = new Date();
  const todayStringDate: string = currentDate.toISOString().slice(0, 10);
  const dataFromAPI = use(
    getElectricityPrice(todayStringDate, todayStringDate, 1)
  );
  return <div>dashboard branch first commit</div>;
}
