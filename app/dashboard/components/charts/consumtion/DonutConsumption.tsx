"use client";
import { getElSupportPercentage } from "@/app/utils/generics";
import { PieChart, ResponsiveContainer, Pie, Tooltip, Cell } from "recharts";
import { useGlobalContext } from "@/app/context/context";
import { useState, useEffect } from "react";
// import { IState } from "../../../../context/reducer/reducer";

const COLORS = [
  "#ce93d8",
  "#5c6bc0",
  "#b39ddb",
  "#d500f9",
  "#f48fb1",
  "#4dd0e1",
];

export default function DonutConsumption({ dataFromClient, activeTab }: any) {
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
      <Donut
        data={activeTab === "tab1" ? totalNumber : totalKWHArray}
        dataFromClient={dataFromClient}
        width={width}
        state={state}
        activeTab={activeTab}
      />
    </div>
  );
}

function Donut({
  data,
  dataFromClient,
  priceInOreAndHour,
  timeFrameForCurrentPrice,
  width,
  yourExpensesFinal,
  elSupportFinal,
  state,
  activeTab,
}: any) {
  // console.log(data);
  let tempData: any = [];
  let isEmpty = true;
  // console.log(activeTab);

  if (activeTab === "tab1") {
    if ((Array.isArray(data) && data.length === 0) || data[0].value <= 0) {
      // console.log("HERE");
      // TODO: tell user to input data and show time + kwh as 24 and 0
      // starting point / empty pie chart
      isEmpty = true;
      tempData = [{ value: 100 }];
      // console.log(data);
      // console.log(tempData);
      return (
        <>
          <ChartComponentHTML
            data={tempData}
            dataFromClient={dataFromClient}
            width={width}
            isEmpty={isEmpty}
            selectedHours={state.selectedHours}
          />
          <ChartComponent
            data={tempData}
            dataFromClient={dataFromClient}
            width={width}
            isEmpty={isEmpty}
            selectedHours={state.selectedHours}
          />
        </>
      );
    } else {
      // console.log("HERE");
      // calculate with NUMBER
      isEmpty = false;
      // console.log(data);
      tempData = [...data];
      // console.log(tempData);
      return (
        <>
          <ChartComponentHTML
            data={tempData}
            dataFromClient={dataFromClient}
            width={width}
            isEmpty={isEmpty}
            selectedHours={state.selectedHours}
          />
          <ChartComponent
            data={tempData}
            dataFromClient={dataFromClient}
            width={width}
            isEmpty={isEmpty}
            selectedHours={state.selectedHours}
          />
        </>
      );
    }
  } else {
    return <div>categories</div>;
  }
}

function ChartComponentHTML({
  data,
  dataFromClient,
  width,
  isEmpty,
  selectedHours,
}: any) {
  // console.log(data);
  const start = selectedHours[0];
  const end = selectedHours[1];
  let hoursOfUse = 24;
  if (start < end) {
    hoursOfUse = end - start;
  } else {
    hoursOfUse = start - end;
  }

  let kwh = data[0].value;
  if (isEmpty) kwh = 0;

  getTotalPrice(selectedHours, kwh, dataFromClient);
  return (
    <div className="absolute top-[35%] left-1/2 translate-x-[-50%] translate-y-[-50%]">
      <p className="text-center" style={{ fontSize: width / 10 }}>
        {`${kwh} kwh / ${hoursOfUse}`}
      </p>
      <p className="text-center">price</p>
    </div>
  );
}

function getTotalPrice(selectedHours: any, kwh: number, dataFromClient: any) {
  const { dailyPriceArray } = dataFromClient[0];
  let newArray = [];
  for (let i = selectedHours[0]; i <= selectedHours[1]; i++) {
    newArray.push(i);
  }
  // console.log(newArray);
}

function ChartComponent({ data, dataFromClient, width, isEmpty }: any) {
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
//<p className="text-center">selectedHours</p>
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
              {`${kwh} kwh / ${overHours} selectedHours`}
            </p>
            <p className="text-center">24 selectedHours</p>
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
