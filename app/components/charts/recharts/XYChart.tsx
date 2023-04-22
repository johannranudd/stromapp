"use client";
import * as Recharts from "recharts";

export default function XYChart(dataFromAPI: any) {
  // TODO replace date with hour and value with priceInOre
  const tempData: any = [];
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

  dailyPriceArray.map((priceInOre: any, index: number) => {
    let hour = `${index}`;
    index < 10 ? (hour = `0${index}`) : `${index}`;
    const priceInOreAndHour = { priceInOre, hour };
    // console.log(priceInOreAndHour);
    tempData.push(priceInOreAndHour);
  });
  // console.log(tempData);
  // console.log(data);

  return (
    <Recharts.ResponsiveContainer width="100%" height={400}>
      <Recharts.AreaChart data={tempData}>
        <defs>
          <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2451B7" stopOpacity={0.4} />
            <stop offset="75%" stopColor="#2451B7" stopOpacity={0.05} />
          </linearGradient>
        </defs>

        <Recharts.Area
          dataKey="priceInOre"
          stroke="#2451B7"
          fill="url(#color)"
        />

        <Recharts.XAxis
          dataKey="hour"
          axisLine={false}
          tickLine={false}
          tickFormatter={(str: any) => {
            const num = Number(str);
            if (num % 5 === 0) {
              return `${str}:00`;
            }
            return "";
          }}
        />

        <Recharts.YAxis
          dataKey="priceInOre"
          axisLine={false}
          tickLine={false}
          tickCount={8}
          tickFormatter={(number: any) => `${number} Øre`}
        />

        <Recharts.Tooltip content={<CustomTooltip />} />

        <Recharts.CartesianGrid opacity={0.1} vertical={false} />
      </Recharts.AreaChart>
    </Recharts.ResponsiveContainer>
  );
}

function CustomTooltip({ active, payload, label }: any) {
  const modifiedLabel = `${label}:00`;
  if (active) {
    return (
      // todo style here
      <div className="rounded-lg bg-[#26313c] text-white p-[1rem] shadow-2xl text-center">
        <h4>{modifiedLabel}</h4>
        <p>${payload[0].value} Øre</p>
      </div>
    );
  }
  return null;
}
