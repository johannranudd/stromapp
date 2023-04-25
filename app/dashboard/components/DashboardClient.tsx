"use client";
import LocationAndDateForm from "./LocationAndDateForm";

export default function DashboardClient(dataFromAPI: any) {
  const data: any = [];
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
      <h1>Dashboard</h1>
      {/* inputs */}
      <LocationAndDateForm />
      {/* send inputs to a state? */}
      {/* tabs */}
      {/* left Donut */}
      {/* KWH accumulator */}
      {/* right Donut */}
    </div>
  );
}
