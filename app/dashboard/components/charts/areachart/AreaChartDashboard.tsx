"use client";
import { useState } from "react";
import { useGlobalContext } from "@/app/context/context";
import * as Recharts from "recharts";
import { CustomTooltipProps, IPriceAndTime } from "@/types";

export default function AreaChartDashboard({ dataFromClient }: any) {
  const { dispatch } = useGlobalContext();
  // TODO replace date with hour and value with priceInOre
  const data: Array<IPriceAndTime> = [];
  const { dailyPriceArray } = dataFromClient[0];

  dailyPriceArray.map((priceInOre: any, index: number) => {
    let hour = `${index}`;
    index < 10 ? (hour = `0${index}`) : `${index}`;
    const priceInOreAndHour = { priceInOre, hour };
    data.push(priceInOreAndHour);
  });
  const currentDate: Date = new Date();
  const todayStringDate: string = currentDate.toISOString().slice(0, 10);
  const [isMoving, setIsMoving] = useState(false);
  const [refAreaLeft, setRefAreaLeft] = useState("");
  const [refAreaRight, setRefAreaRight] = useState("");

  const handleMouseDown = (e: any) => {
    if (e === null) {
      return;
    } else {
      setIsMoving(true);
      setRefAreaLeft(e.activeLabel);
      dispatch({ type: "START_FETCH", payload: false });
    }
  };
  const handleMouseMove = (e: any) => {
    if (e === null) {
      return;
    } else if (isMoving) {
      setRefAreaRight(e.activeLabel);
      const start = Number(refAreaLeft);
      const end = Number(refAreaRight);
      dispatch({ type: "SET_SELECTED_HOURS", payload: [start, end] });
      dispatch({ type: "START_FETCH", payload: false });
    }
  };
  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsMoving(false);
    dispatch({ type: "START_FETCH", payload: true });
  };

  function handleReset() {
    setIsMoving(false);
    setRefAreaLeft("");
    setRefAreaRight("");
    dispatch({ type: "SET_SELECTED_HOURS", payload: [0, 24] });
    dispatch({ type: "START_FETCH", payload: true });
  }

  return (
    <>
      <div className="w-[95%] mx-auto flex justify-between">
        <button onClick={handleReset}>Reset Time</button>
        <h2>{todayStringDate}</h2>
      </div>
      <Recharts.ResponsiveContainer width="100%" height={400}>
        <Recharts.AreaChart
          data={data}
          onMouseDown={(e: any) => handleMouseDown(e)}
          onMouseMove={(e: any) => handleMouseMove(e)}
          onMouseUp={(e: any) => handleMouseUp(e)}
        >
          <defs>
            <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2451B7" stopOpacity={0.4} />
              <stop offset="75%" stopColor="#2451B7" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <Recharts.Line
            yAxisId="1"
            type="natural"
            dataKey="cost"
            stroke="#8884d8"
            animationDuration={300}
          />
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

          {refAreaLeft && refAreaRight ? (
            <Recharts.ReferenceArea
              yAxisId="0"
              fill="#b00b69"
              x1={refAreaLeft}
              x2={refAreaRight}
              strokeOpacity={0.1}
            />
          ) : null}

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
      // todo style here
      <div className="rounded-lg bg-[#26313c] text-white p-[1rem] shadow-2xl text-center">
        <h4>{modifiedLabel}</h4>
        <p>${payload[0].value} Øre</p>
      </div>
    );
  }
  return null;
};
