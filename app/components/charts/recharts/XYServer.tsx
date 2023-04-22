// import { getElSupportPercentage } from "@/app/utils/generics";
import XYChart from "./XYChart";
import { getElectricityPrice } from "@/app/utils/gets";
import { use } from "react";
export default function XYServer() {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() - 1);
  const yesterdayDate = currentDate.toISOString().slice(0, 10);
  const dataFromAPI = use(getElectricityPrice(yesterdayDate, yesterdayDate, 1));

  return <XYChart {...dataFromAPI} />;
}

// const { yourExpensesFinal, elSupportFinal } = getElSupportPercentage(
//   priceInOre,
//   estimatedPowerSupportToDate
// );
// const chartGroupsArray = [
//   { name: "yourExpensesFinal", value: yourExpensesFinal },
//   { name: "elSupportFinal", value: elSupportFinal },
// ];
