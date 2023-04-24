// "use client";
import { getElectricityPrice } from "@/app/utils/gets";
import React, { use } from "react";
// import { Group } from "@visx/group";
// import { Pie } from "@visx/shape";
// import { Text } from "@visx/text";
import ClientChart from "./ClientChart";
import { getElSupportPercentage } from "@/app/utils/generics";

export default function DonutChart() {
  // TODO: sometimes current date doesnt work. find out why and correct. Currently using yesterday. probalby an exiration problem
  // const currentDate = new Date().toISOString().slice(0, 10);
  // const dataFromAPI = use(getElectricityPrice("2023-04-19", "2023-04-19", 1));
  // const dataFromAPI = use(getElectricityPrice(currentDate, currentDate, 1));

  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() - 1);
  const yesterdayDate = currentDate.toISOString().slice(0, 10);
  const dataFromAPI = use(getElectricityPrice(yesterdayDate, yesterdayDate, 1));

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
    _id,
    region,
    dailyPriceArray,
    dailyPriceAverage,
    dailyPriceMax,
    dailyPriceMin,
    averagePriceMonthlyToDate,
    estimatedPowerSupportToDate,
  } = dataFromAPI[0];
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

            return (
              <ClientChart
                key={_id}
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

//  return (
//    <li key={id}>
//      <p>
//        <strong>{priceInOre}</strong> øre - {osloTime}
//      </p>
//    </li>
//  );
