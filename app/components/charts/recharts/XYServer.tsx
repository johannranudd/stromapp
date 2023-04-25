// import { getElSupportPercentage } from "@/app/utils/generics";
import XYChart from "./XYChart";
import { getElectricityPrice } from "@/app/utils/gets";
import { use } from "react";
export default function XYServer() {
  const currentDate: Date = new Date();
  // TODO controll the date with inputs here
  // const currentDate: Date = new Date("2023-04-19");
  // console.log(currentDate.setDate(currentDate.getDate() + 1));
  // TODO add: Vis priser med nettleie, avgifter og mva (like on vg.no)
  const todayStringDate: string = currentDate.toISOString().slice(0, 10);
  const dataFromAPI = use(
    getElectricityPrice(todayStringDate, todayStringDate, 1)
  );
  return <XYChart {...dataFromAPI} />;
}

// OLSO DATE
//  const currentDate: Date = new Date();
//  const options: Intl.DateTimeFormatOptions = {
//    timeZone: "Europe/Oslo",
//    year: "numeric",
//    month: "2-digit",
//    day: "2-digit",
//  };
//  const formatter: Intl.DateTimeFormat = new Intl.DateTimeFormat(
//    "no-NO",
//    options
//  );
//  const osloDateString: string = formatter.format(currentDate);
//  const todayStringDate: string = osloDateString.slice(0, 10);
//  const officialDateOslo = todayStringDate.split(".").reverse().join("-");
//  const dataFromAPI = use(
//    getElectricityPrice(officialDateOslo, officialDateOslo, 1)
//  );
