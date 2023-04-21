// "use client";
import { getElectricityPrice } from "@/app/utils/gets";
import React, { use } from "react";
// import { Group } from "@visx/group";
// import { Pie } from "@visx/shape";
// import { Text } from "@visx/text";
import ClientChart from "./ClientChart";

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
            // const chartGroupsArray = [
            //   { name: "yourExpensesFinal", value: yourExpensesFinal },
            //   { name: "elSupportFinal", value: elSupportFinal },
            // ];
            return (
              <ClientChart
                key={index}
                priceInOreAndHour={priceInOreAndHour}
                yourExpensesFinal={yourExpensesFinal}
                elSupportFinal={elSupportFinal}
              />
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
  const yourExpensesFinal = percentageYourExpenses.toFixed(2);
  const elSupportFinal = percentageElSupport.toFixed(2);

  return { yourExpensesFinal, elSupportFinal };
}

//  return (
//    <li key={id}>
//      <p>
//        <strong>{priceInOre}</strong> øre - {osloTime}
//      </p>
//    </li>
//  );
