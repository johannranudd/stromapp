"use client";
import { getElSupportPercentage } from "@/app/utils/generics";
import { PieChart, ResponsiveContainer, Pie, Tooltip, Cell } from "recharts";
import { useGlobalContext } from "@/app/context/context";
import { useState, useEffect } from "react";
import { DateTimeFormatOptions, DonutDataItem, IPriceAndTime } from "@/types";

const COLORS = ["#ffcd4f", "#6be072"];

export default function DonutElSupport({ dataFromClient }: any) {
  const { windowWidth } = useGlobalContext();
  const now = new Date();
  const options: DateTimeFormatOptions = {
    timeZone: "Europe/Oslo",
    hour12: false,
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  const osloTime = new Intl.DateTimeFormat("en-UK", options)
    .format(now)
    .slice(0, 2);

  const { _id, dailyPriceArray, estimatedPowerSupportToDate } =
    dataFromClient[0];

  const [width, setWidth] = useState(windowWidth / 1.3);
  useEffect(() => {
    if (windowWidth >= 640) {
      setWidth(300);
    } else {
      setWidth(windowWidth / 2.3);
    }
  }, [windowWidth]);

  return (
    <div
      style={{
        width: width / 0.9,
        height: width / 0.7,
        zIndex: 1,
        margin: "auto",
      }}
      className="relative"
    >
      {dailyPriceArray?.map((priceInOre: number, index: number) => {
        let hour = `${index}`;
        index < 10 ? (hour = `0${index}`) : `${index}`;

        const priceInOreAndHour: any = { priceInOre, hour };

        const oneHourAhead = Number(priceInOreAndHour.hour) + 1;
        const oneHourAheadToString = `${
          oneHourAhead < 10 ? "0" : ""
        }${oneHourAhead}`;
        const timeFrameForCurrentPrice = `${priceInOreAndHour.hour} - ${oneHourAheadToString}`;

        if (hour === osloTime) {
          const { yourExpensesFinal, elSupportFinal } = getElSupportPercentage(
            priceInOre,
            estimatedPowerSupportToDate
          );
          const data: Array<DonutDataItem> = [
            {
              name: "Dine Utgifter",
              value: Number(yourExpensesFinal),
            },
            {
              name: "Strømstøtte",
              value: Number(elSupportFinal),
            },
          ];

          return (
            <Donut
              key={_id}
              priceInOreAndHour={priceInOreAndHour}
              data={data}
              width={width}
              timeFrameForCurrentPrice={timeFrameForCurrentPrice}
            />
          );
        }
      })}
    </div>
  );
}

function Donut({
  data,
  priceInOreAndHour,
  timeFrameForCurrentPrice,
  width,
}: {
  data: Array<DonutDataItem>;
  priceInOreAndHour: IPriceAndTime;
  timeFrameForCurrentPrice: string;
  width: number;
}) {
  return (
    <>
      <div className="absolute top-[35%] left-1/2 translate-x-[-50%] translate-y-[-50%]">
        <h2 className="text-center" style={{ fontSize: width / 10 }}>
          <strong>{priceInOreAndHour.priceInOre}</strong> Øre
        </h2>
        <p className="text-center">{timeFrameForCurrentPrice}</p>
      </div>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            dataKey="value"
            data={data}
            innerRadius={width / 2.5}
            outerRadius={width / 2.1}
            fill="#ffcd4f"
            cy="35%"
            labelLine={false}
          >
            {data.map((entry: any, index: number) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          {data.map((entry: any, index: number) => {
            return (
              <text
                key={index}
                x={index === 0 ? "50%" : "50%"}
                y={index === 0 ? "77%" : "87%"}
                style={{
                  fontSize: width / 13,
                  fontWeight: "bold",
                }}
                fill={COLORS[index % COLORS.length]}
                textAnchor="middle"
              >
                {entry.name}
              </text>
            );
          })}
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </>
  );
}
