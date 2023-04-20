import { getElectricityPrice } from "@/app/utils/gets";
import { Suspense, use } from "react";
export default function DonutChart() {
  const currentDate = new Date().toISOString().slice(0, 10);
  const data = use(getElectricityPrice(currentDate, currentDate, 1));

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
  } = data[0];
  //   console.log(estimatedPowerSupportToDate);

  return (
    <div>
      <ul>
        {dailyPriceArray?.map((priceInOre: any, index: number) => {
          let hour = `${index}`;
          index < 10 ? (hour = `0${index}`) : `${index}`;

          //   const priceInOreAndHour = { priceInOre, osloTime };

          if (hour === osloTime) {
            const { yourExpensesFinal, electricitySupportFinal } =
              getElectricitySupport(priceInOre, estimatedPowerSupportToDate);
            // console.log(yourExpensesFinal);
            // console.log(electricitySupportFinal);
            return (
              <li key={id}>
                <p>
                  <strong>{priceInOre}</strong> øre - {osloTime}
                </p>
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
}

function getElectricitySupport(
  priceInOre: number,
  estimatedPowerSupportToDate: number
) {
  //  const powerSupport = estimatedPowerSupportToDate;
  //   const hourlyPrice = 111;
  const total = estimatedPowerSupportToDate + priceInOre;

  const percentageElSupport = (estimatedPowerSupportToDate / total) * 100;
  //   console.log(
  //     `The percentage of ${estimatedPowerSupportToDate} relative to the sum of ${estimatedPowerSupportToDate} and ${priceInOre} is ${percentageElSupport.toFixed(
  //       2
  //     )}%`
  //   );

  const percentageYourExpenses = (priceInOre / total) * 100;
  //   console.log(
  //     `The percentage of ${priceInOre} relative to the sum of ${estimatedPowerSupportToDate} and ${priceInOre} is ${percentageYourExpenses.toFixed(
  //       2
  //     )}%`
  //   );

  const yourExpensesFinal = percentageElSupport.toFixed(2);
  const electricitySupportFinal = percentageYourExpenses.toFixed(2);

  return { yourExpensesFinal, electricitySupportFinal };
}
