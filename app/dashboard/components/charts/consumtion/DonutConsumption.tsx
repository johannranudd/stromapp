"use client";
import { getElSupportPercentage } from "@/app/utils/generics";
import { PieChart, ResponsiveContainer, Pie, Tooltip, Cell } from "recharts";
import { useGlobalContext } from "@/app/context/context";
import { useState, useEffect } from "react";
import { IState } from "../../../../context/reducer/reducer";

const COLORS = [
  "#ce93d8",
  "#5c6bc0",
  "#b39ddb",
  "#d500f9",
  //   "#4dd0e1",
  "#f48fb1",
];

export default function DonutConsumption({ dataFromAPI, activeTab }: any) {
  const { state, windowWidth } = useGlobalContext();
  const [width, setWidth] = useState(windowWidth / 1.3);
  useEffect(() => {
    if (windowWidth >= 640) {
      setWidth(300);
    } else {
      setWidth(windowWidth / 2.3);
    }
  }, [windowWidth]);
  const { totalKWHArray, totalNumber }: any = state;
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
      {activeTab === "tab1" && <Donut data={totalNumber} width={width} />}
      {activeTab === "tab2" && <Donut data={totalKWHArray} width={width} />}
    </div>
  );
}

function Donut({
  data,
  priceInOreAndHour,
  timeFrameForCurrentPrice,
  width,
  yourExpensesFinal,
  elSupportFinal,
}: any) {
  console.log(data.length);
  if (Array.isArray(data) && data.length === 0) {
    console.log("The array is empty");
  } else {
    console.log("The array is not empty");
  }
  return (
    <>
      <div className="absolute top-[35%] left-1/2 translate-x-[-50%] translate-y-[-50%]">
        <h2 className="text-center" style={{ fontSize: width / 10 }}>
          <strong>text</strong> Øre
        </h2>
        <p className="text-center">text</p>
      </div>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            dataKey="value"
            data={data}
            innerRadius={width / 2.5}
            outerRadius={width / 2.1}
            fill="#d500f9"
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
