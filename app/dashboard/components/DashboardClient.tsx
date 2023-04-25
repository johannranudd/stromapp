"use client";
import LocationAndDateForm from "./LocationAndDateForm";
import MainContent from "./MainContent";

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
      <LocationAndDateForm />
      {/* tabs */}
      <MainContent />
      {/* left Donut */}
      {/* KWH accumulator */}
      {/* right Donut */}
    </div>
  );
}
