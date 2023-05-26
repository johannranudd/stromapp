"use client";
import { useState } from "react";
import { useGlobalContext } from "@/app/context/context";
import * as Recharts from "recharts";
import { CustomTooltipProps, IPriceAndTime } from "@/types";

export default function AreaChartDashboard({ dataFromClient }: any) {
  const { dispatch } = useGlobalContext();
  const data: Array<IPriceAndTime> = [];
  const { dailyPriceArray, date } = dataFromClient[0];

  dailyPriceArray.map((priceInOre: any, index: number) => {
    let hour = `${index}`;
    index < 10 ? (hour = `0${index}`) : `${index}`;
    const priceInOreAndHour = { priceInOre, hour };
    data.push(priceInOreAndHour);
  });
  const [isResetable, setIsResetable] = useState(false);
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
    setIsResetable(true);
  };

  function handleReset() {
    setIsMoving(false);
    setRefAreaLeft("");
    setRefAreaRight("");
    dispatch({ type: "SET_SELECTED_HOURS", payload: [0, 24] });
    dispatch({ type: "START_FETCH", payload: true });
    setIsResetable(false);
  }

  return (
    <>
      <div className="w-[95%] mx-auto flex justify-between items-end h-32">
        {isResetable && (
          <button
            onClick={handleReset}
            className="btnCta flex items-center dark:bg-secondary dark:border dark:border-thirdClr dark:text-thirdClr dark:hover:bg-thirdClr dark:hover:text-secondary"
          >
            Tilbakestill Tid
          </button>
        )}
        <h2 className="w-[90%] absolute translate-y-[-60px] left-1/2 -translate-x-1/2 mx-auto text-center mlg:translate-y-[-0px] z-[-10]">
          Trykk og dra over grafen for å velge tidspunkt, Se utregnet resultat i
          venstre smultring
        </h2>
        <h3 className="ml-auto">{date.slice(0, 10)}</h3>
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
        <p>{payload[0].value} Øre</p>
      </div>
    );
  }
  return null;
};
