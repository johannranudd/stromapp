"use client";
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
    date,
  } = dataFromAPI[0];

  return (
    <div>
      <h1>Dashboard</h1>
      {/* inputs */}
      {/* send inputs to a state? */}
      {/* tabs */}
      {/* left Donut */}
      {/* KWH accumulator */}
      {/* right Donut */}
    </div>
  );
}
