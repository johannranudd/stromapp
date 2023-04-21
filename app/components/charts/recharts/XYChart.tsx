"use client";
// import {
//   ResponsiveContainer,
//   AreaChart,
//   XAxis,
//   YAxis,
//   Area,
//   Tooltip,
//   CartesianGrid,
// } from "recharts";
import * as Recharts from "recharts";
import { format, parseISO, subDays } from "date-fns";

const data: any = [];
for (let num = 30; num >= 0; num--) {
  data.push({
    date: subDays(new Date(), num).toISOString().slice(0, 10),
    value: 1 + Math.random(),
  });
}

export default function XYChart() {
  return (
    <Recharts.ResponsiveContainer width="100%" height={400}>
      <Recharts.AreaChart data={data}>
        <defs>
          <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2451B7" stopOpacity={0.4} />
            <stop offset="75%" stopColor="#2451B7" stopOpacity={0.05} />
          </linearGradient>
        </defs>

        <Recharts.Area dataKey="value" stroke="#2451B7" fill="url(#color)" />

        <Recharts.XAxis
          dataKey="date"
          axisLine={false}
          tickLine={false}
          tickFormatter={(str: any) => {
            const date = parseISO(str);
            if (date.getDate() % 7 === 0) {
              return format(date, "MMM, d");
            }
            return "";
          }}
        />

        <Recharts.YAxis
          dataKey="value"
          axisLine={false}
          tickLine={false}
          tickCount={8}
          tickFormatter={(number: any) => `$${number.toFixed(2)}`}
        />

        <Recharts.Tooltip content={<CustomTooltip />} />

        <Recharts.CartesianGrid opacity={0.1} vertical={false} />
      </Recharts.AreaChart>
    </Recharts.ResponsiveContainer>
  );
}

function CustomTooltip({ active, payload, label }: any) {
  if (active) {
    return (
      <div className="tooltip">
        <h4>{format(parseISO(label), "eeee, d MMM, yyyy")}</h4>
        <p>${payload[0].value.toFixed(2)} CAD</p>
      </div>
    );
  }
  return null;
}
