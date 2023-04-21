"use client";
import { Group } from "@visx/group";
import { Circle, Pie } from "@visx/shape";
import { Text } from "@visx/text";
import { useState, useRef, useEffect } from "react";

export default function ClientChart({
  yourExpensesFinal,
  elSupportFinal,
}: any) {
  const [active, setActive]: any = useState(null);
  const data = [
    {
      symbol: "yourExpensesFinal",
      name: "Dine Utgifter",
      value: yourExpensesFinal,
      color: "#cf0000",
    },
    {
      symbol: "elSupportFinal",
      name: "Strømstøtte",
      value: elSupportFinal,
      color: "#a1a100",
    },
  ];

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [width, setWidth] = useState(windowWidth / 1.3);
  const half = width / 2;
  function handleResize() {
    setWindowWidth(window.innerWidth);
    if (windowWidth >= 500) {
      setWidth(400);
    } else {
      setWidth(windowWidth / 1.3);
    }
  }
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [windowWidth]);

  //
  //
  //
  //
  return (
    <div>
      <svg width={width} height={width}>
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
          {data.map((item: any, index: number) => {
            return (
              <>
                <Circle
                  cx={index === 0 ? windowWidth / 18 : -windowWidth / 18}
                  cy={-5}
                  r={10}
                  fill={item.color}
                />
                <Text
                  x={index === 0 ? windowWidth / 10 : -windowWidth / 10}
                  y={0}
                  fontSize={width / 18}
                  textAnchor={index === 0 ? "start" : "end"}
                  fill={item.color}
                  className="duration-300"
                >
                  {data && data[index].name}
                </Text>
                <Text
                  x={index === 0 ? windowWidth / 10 : -windowWidth / 10}
                  y={20}
                  fontSize={width / 18}
                  textAnchor={index === 0 ? "start" : "end"}
                  fill={item.color}
                  className="duration-300 "
                >
                  {`${item.value}%`}
                </Text>
              </>
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
