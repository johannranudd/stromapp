"use client";
import { getElSupportPercentage } from "@/app/utils/generics";
import {
  PieChart,
  ResponsiveContainer,
  Pie,
  Tooltip,
  Cell,
  Text,
} from "recharts";
import { useGlobalContext } from "@/app/context/context";
import { useState, useEffect } from "react";
import {
  DateTimeFormatOptions,
  DonutDataItem,
  IDataFromAPI,
  IPriceAndTime,
} from "@/types";

const COLORS = [
  "#ffcd4f",
  "#6be072",
  "#b39ddb",
  "#4dd0e1",
  "#f48fb1",
  "#d500f9",
];
// const COLORS = [
//   "#ce93d8",
//   "#5c6bc0",
//   "#b39ddb",
//   "#4dd0e1",
//   "#f48fb1",
//   "#d500f9",
// ];

export default function DonutRechartsClient(dataFromAPI: IDataFromAPI) {
  const { windowWidth } = useGlobalContext();
  const now = new Date();
  const options: DateTimeFormatOptions = {
    timeZone: "Europe/Oslo",
    hour12: false,
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  let osloTime = new Intl.DateTimeFormat("en-NO", options)
    .format(now)
    .slice(0, 2);

  const { _id, dailyPriceArray, estimatedPowerSupportToDate } = dataFromAPI[0];

  const [width, setWidth] = useState(windowWidth / 1.3);
  useEffect(() => {
    if (windowWidth >= 1200) {
      setWidth(400);
    } else if (windowWidth >= 768) {
      setWidth(350);
    } else if (windowWidth >= 400) {
      setWidth(300);
    } else {
      setWidth(windowWidth / 1.6);
    }
  }, [windowWidth]);
  return (
    <div
      style={{
        width: width / 0.9,
        height: width / 0.9,
        zIndex: 1,
        margin: windowWidth >= 768 ? "0 0 0 auto" : "0 auto 0 auto",
      }}
      className="relative"
    >
      {dailyPriceArray?.map((priceInOre: number, index: number) => {
        let hour = `${index}`;
        index < 10 ? (hour = `0${index}`) : `${index}`;
        if (osloTime === "24") {
          osloTime = "00";
        }

        const priceInOreAndHour: IPriceAndTime = {
          priceInOre,
          hour,
        };

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
              name: "Din strømpris nå",
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
      <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
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
            innerRadius={width / 2.3}
            outerRadius={width / 1.9}
            fill="#82ca9d"
            label={({ cx, cy, midAngle, innerRadius, outerRadius, index }) => {
              const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
              const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
              const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
              return (
                <Text
                  x={index === 0 ? x + width / 3.2 : x - width / 3.3}
                  y={index === 0 ? y + width / 10 : y - width / 10}
                  textAnchor="middle"
                  alignmentBaseline="middle"
                  fill={COLORS[index % COLORS.length]}
                  fontSize={width / 20}
                  fontWeight={600}
                >
                  {`${data[index].name} ${data[index].value}%`}
                </Text>
              );
            }}
            labelLine={false}
          >
            {data.map((entry: DonutDataItem, index: number) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </>
  );
}
