"use client";
import { CustomTooltipProps, IDataFromAPI, IPriceAndTime } from "@/types";
import * as Recharts from "recharts";

export default function XYChart(dataFromAPI: IDataFromAPI) {
  const data: Array<IPriceAndTime> = [];
  const { dailyPriceArray } = dataFromAPI[0];

  dailyPriceArray.map((priceInOre: number, index: number) => {
    let hour = `${index}`;
    index < 10 ? (hour = `0${index}`) : `${index}`;
    const priceInOreAndHour = { priceInOre, hour };
    data.push(priceInOreAndHour);
  });

  const currentDate: Date = new Date();
  const todayStringDate: string = currentDate.toISOString().slice(0, 10);

  return (
    <>
      <div className="flex justify-between">
        <p>Pris I øre</p>
        <p className="">{todayStringDate}</p>
      </div>
      <Recharts.ResponsiveContainer width="100%" height={350}>
        <Recharts.AreaChart data={data}>
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
            tickFormatter={(str: string) => {
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
            tickFormatter={(number: number) => `${number}`}
            width={20}
          />

          <Recharts.Tooltip content={<CustomTooltip />} />

          <Recharts.CartesianGrid opacity={0.1} vertical={false} />
        </Recharts.AreaChart>
      </Recharts.ResponsiveContainer>
    </>
  );
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  label,
  payload,
}) => {
  const modifiedLabel = `${label}:00`;
  if (active && payload && payload[0]?.value !== undefined) {
    return (
      <div className="rounded-lg bg-[#26313c] text-white p-[1rem] shadow-2xl text-center">
        <h4>{modifiedLabel}</h4>
        <p>${payload[0].value} Øre</p>
      </div>
    );
  }
  return null;
};
