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
  "#f48fb1",
  "#4dd0e1",
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
      {activeTab === "tab1" && (
        <Donut data={totalNumber} width={width} state={state} />
      )}
      {activeTab === "tab2" && (
        <Donut data={totalKWHArray} width={width} state={state} />
      )}
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
  state,
}: any) {
  // console.log(data);
  let tempData: any = [];
  let isEmpty = true;
  if ((Array.isArray(data) && data.length === 0) || data.value <= 0) {
    // TODO: tell user to input data and show time + kwh as 24 and 0
    isEmpty = true;
    tempData = [{ value: 100 }];
    return (
      <>
        <ChartComponentHTML
          data={tempData}
          width={width}
          isEmpty={isEmpty}
          hours={state.hours}
        />
        <ChartComponent
          data={tempData}
          width={width}
          isEmpty={isEmpty}
          hours={state.hours}
        />
      </>
    );
  } else {
    isEmpty = false;
    tempData = data;
  }

  return (
    <>
      <div>not empty</div>
    </>
  );
}

function ChartComponentHTML({ data, width, isEmpty, hours }: any) {
  // console.log(data);
  let kwh = data[0].value;
  if (isEmpty) kwh = 0;
  // function getTotalPrice(kwh: any, hours: any) {
  //   const power = kwh / hours; // calculate power in kW
  //   const cost = power * hours * pricePerKwh; // calculate cost
  //   return cost;
  // }
  return (
    <div className="absolute top-[35%] left-1/2 translate-x-[-50%] translate-y-[-50%]">
      <p className="text-center" style={{ fontSize: width / 10 }}>
        {`${kwh} kwh / ${hours}`}
      </p>
      <p className="text-center">price</p>
    </div>
  );
}

function ChartComponent({ data, width, isEmpty }: any) {
  return (
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
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
  );
}

// <div className="absolute top-[35%] left-1/2 translate-x-[-50%] translate-y-[-50%]">
// <p className="text-center" style={{ fontSize: width / 10 }}>
// {/* {isEmpty ? "00": } */}
//</p>
//<p className="text-center">hours</p>
//</div>;

// !chart
{
  /* {tempData.map((item: any) => {
        let kwh = "00";
        let overHours = "00";
        // if (!isEmpty) {
        // console.log("isEmpty is false");
        // console.log(item);
        // }

        return (
          <div className="absolute top-[35%] left-1/2 translate-x-[-50%] translate-y-[-50%]">
            <p className="text-center" style={{ fontSize: width / 15 }}>
              {`${kwh} kwh / ${overHours} hours`}
            </p>
            <p className="text-center">24 hours</p>
          </div>
        );
      })} */
}
//  <ResponsiveContainer>
//         <PieChart>
//           <Pie
//             dataKey="value"
//             // data={tempData}
//             innerRadius={width / 2.5}
//             outerRadius={width / 2.1}
//             fill="#d500f9"
//             cy="35%"
//             labelLine={false}
//           >
//             {data.map((entry: any, index: number) => (
//               <Cell
//                 key={`cell-${index}`}
//                 fill={COLORS[index % COLORS.length]}
//               />
//             ))}
//           </Pie>
//           {data.map((entry: any, index: number) => {
//             return (
//               <text
//                 key={index}
//                 x={index === 0 ? "50%" : "50%"}
//                 y={index === 0 ? "77%" : "87%"}
//                 style={{
//                   fontSize: width / 13,
//                   fontWeight: "bold",
//                 }}
//                 fill={COLORS[index % COLORS.length]}
//                 textAnchor="middle"
//               >
//                 {entry.name}
//               </text>
//             );
//           })}
//           <Tooltip />
//         </PieChart>
//       </ResponsiveContainer>

// !chart
