// "use client";
import { getElectricityPrice } from "@/app/utils/gets";
import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Area,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Sector,
  Cell,
  Legend,
} from "recharts";
import React, { use } from "react";

export default function DonutChart() {
  const currentDate = new Date().toISOString().slice(0, 10);
  const dataFromAPI = use(getElectricityPrice(currentDate, currentDate, 1));

  const now = new Date();
  const options: any = {
    timeZone: "Europe/Oslo",
    hour12: false,
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  const osloTime = new Intl.DateTimeFormat("en-UK", options)
    .format(now)
    .slice(0, 2);

  const {
    id,
    region,
    dailyPriceArray,
    dailyPriceAverage,
    dailyPriceMax,
    dailyPriceMin,
    averagePriceMonthlyToDate,
    estimatedPowerSupportToDate,
  } = dataFromAPI[0];
  //   console.log(estimatedPowerSupportToDate);

  return (
    <div>
      <ul>
        {dailyPriceArray?.map((priceInOre: any, index: number) => {
          let hour = `${index}`;
          index < 10 ? (hour = `0${index}`) : `${index}`;

          const priceInOreAndHour = { priceInOre, hour };

          if (hour === osloTime) {
            const { yourExpensesFinal, elSupportFinal } =
              getElSupportPercentage(priceInOre, estimatedPowerSupportToDate);
            const chartGroupsArray = [
              { name: "yourExpensesFinal", value: yourExpensesFinal },
              { name: "elSupportFinal", value: elSupportFinal },
            ];
            // console.log(chartGroupsArray[1].value);
            return (
              <div>
                {/* <ResponsiveContainer width="100%" height={400}>
                  <AreaChart data={chartGroupsArray}></AreaChart>
                </ResponsiveContainer> */}
              </div>
            );
          }
        })}
      </ul>
    </div>
  );
}

function getElSupportPercentage(
  priceInOre: number,
  estimatedPowerSupportToDate: number
) {
  const total = estimatedPowerSupportToDate + priceInOre;
  const percentageElSupport = (estimatedPowerSupportToDate / total) * 100;
  const percentageYourExpenses = (priceInOre / total) * 100;
  const yourExpensesFinal = percentageElSupport.toFixed(2);
  const elSupportFinal = percentageYourExpenses.toFixed(2);
  return { yourExpensesFinal, elSupportFinal };
}

//  return (
//    <li key={id}>
//      <p>
//        <strong>{priceInOre}</strong> øre - {osloTime}
//      </p>
//    </li>
//  );
