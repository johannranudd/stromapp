"use client";
import { Group } from "@visx/group";
import { Pie } from "@visx/shape";
import { Text } from "@visx/text";
import { useState, useEffect } from "react";
import { useGlobalContext } from "@/app/context/context";
import { useTheme } from "next-themes";

export default function ClientChart({
  yourExpensesFinal,
  elSupportFinal,
  priceInOreAndHour,
}: any) {
  const { windowWidth } = useGlobalContext();
  const { theme } = useTheme();
  const [active, setActive]: any = useState(null);
  const data = [
    {
      symbol: "yourExpensesFinal",
      name: "Dine Utgifter",
      value: yourExpensesFinal,
      color: "#C9D34E",
    },
    {
      symbol: "elSupportFinal",
      name: "Strømstøtte",
      value: elSupportFinal,
      color: "#DFAD62",
    },
  ];
  const [width, setWidth] = useState(windowWidth / 1.3);
  const half = width / 2;
  useEffect(() => {
    if (windowWidth >= 500) {
      setWidth(400);
    } else {
      setWidth(windowWidth / 1.3);
    }
  }, [windowWidth]);

  const oneHourAhead = Number(priceInOreAndHour.hour) + 1;
  const oneHourAheadToString = `${oneHourAhead < 10 ? "0" : ""}${oneHourAhead}`;
  const timeFrameForCurrentPrice = `${priceInOreAndHour.hour} - ${oneHourAheadToString}`;
  //
  //
  //
  //
  return (
    <div>
      <svg className="ml-auto" width={width} height={width}>
        <Group top={half} left={half}>
          <Pie
            data={data}
            pieValue={(data: any) => data.value}
            outerRadius={half}
            // innerRadius={half - 15}
            innerRadius={({ data }: any) => {
              const size = active && active.symbol == data.symbol ? 25 : 15;
              return half - size;
            }}
            padAngle={0.01}
          >
            {(pie: any) => {
              return pie.arcs.map((arc: any) => {
                return (
                  <g
                    key={arc.data.symbol}
                    onMouseEnter={() => setActive(arc.data)}
                    onMouseLeave={() => setActive(null)}
                  >
                    <path
                      className="duration-300"
                      d={pie.path(arc)}
                      fill={arc.data.color}
                    ></path>
                  </g>
                );
              });
            }}
          </Pie>
          <Group>
            <Text
              x={-width / 9}
              y={-70}
              fontSize={width / 10}
              textAnchor="middle"
              className="font-bold"
              fill={theme === "light" ? "#242431" : "#fbf5f5"}
            >
              {priceInOreAndHour.priceInOre}
            </Text>
            <Text
              x={width / 9}
              y={-70}
              fontSize={width / 10}
              textAnchor="middle"
              className="duration-300"
              fill={theme === "light" ? "#242431" : "#fbf5f5"}
            >
              Øre
            </Text>
          </Group>
          <Text
            // x={width / 9}
            y={-30}
            fontSize={width / 15}
            textAnchor="middle"
            className="duration-300"
            fill={theme === "light" ? "#242431" : "#fbf5f5"}
          >
            {timeFrameForCurrentPrice}
          </Text>
          {data.map((item: any, index: number) => {
            return (
              <Group key={index}>
                <Text
                  x={0}
                  y={index === 0 ? 40 : 10}
                  fontSize={width / 18}
                  textAnchor="end"
                  fill={item.color}
                  className="duration-300"
                >
                  {data && data[index].name}
                </Text>
                <Text
                  x={50}
                  y={index === 0 ? 40 : 10}
                  fontSize={width / 18}
                  fill={item.color}
                  className="duration-300 "
                >
                  {`${item.value}%`}
                </Text>
              </Group>
            );
          })}
        </Group>
      </svg>
    </div>
  );
}

//
//
//
//
//
//

{
  /* <Circle
                  //   cx={index === 0 ? windowWidth / 18 : -windowWidth / 18}
                  cx={50}
                  cy={-5}
                  r={10}
                  fill={item.color}
                /> */
}
//
//
//
//
//
// let fSize = 16;
// if (active && active.symbol === item.symbol) {
//   fSize = 20;
// }
// console.log(item);
//
//
//
//
{
  /* <Circle cx={170} cy={-5} r={10} fill={data.color} />
<Text x={50} y={0} textAnchor="start" fill="#0037ff">
  {data && data[0].name}
</Text>
<Circle cx={-30} cy={-5} r={10} fill="#0037ff" />
<Text x={-50} y={0} textAnchor="end" fill="#0037ff">
  {data && data[1].name}
</Text> */
}
