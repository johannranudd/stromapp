"use client";
import { PieChart, ResponsiveContainer, Pie, Tooltip, Cell } from "recharts";
import { useGlobalContext } from "@/app/context/context";
import { useState, useEffect } from "react";
import { DonutDataItem, IDataFromAPI, IPriceAndTime, TDispatch } from "@/types";

const COLORS = ["#ffcd4f", "#6be072"];

export default function DonutConsumption({ dataFromClient, activeTab }: any) {
  const { state, windowWidth, dispatch } = useGlobalContext();
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
        dispatch={dispatch}
      />
    </div>
  );
}

function Donut({
  data,
  dataFromClient,
  width,
  state,
  activeTab,
  dispatch,
}: {
  data: Array<DonutDataItem>;
  dataFromClient?: IDataFromAPI;
  priceInOreAndHour?: IPriceAndTime;
  timeFrameForCurrentPrice?: any;
  width: number;
  state?: any;
  activeTab: string;
  dispatch: TDispatch;
}) {
  let tempData: any = [];
  let isEmpty = true;
  let useCategories = false;
  const { average } = state;

  if ((Array.isArray(data) && data.length === 0) || data[0].value <= 0) {
    isEmpty = true;
    useCategories = false;
    tempData = [{ value: 100 }];
    return (
      <>
        <ChartComponentHTML
          data={tempData}
          dataFromClient={dataFromClient}
          width={width}
          isEmpty={isEmpty}
          selectedHours={state.selectedHours}
          useCategories={useCategories}
          dispatch={dispatch}
        />
        <ChartComponent
          data={tempData}
          width={width}
          isEmpty={isEmpty}
          activeTab={activeTab}
          average={average}
        />
      </>
    );
  } else {
    if (activeTab === "tab1") {
      isEmpty = false;
      tempData = [...data];
      return (
        <>
          <ChartComponentHTML
            data={tempData}
            dataFromClient={dataFromClient}
            width={width}
            isEmpty={isEmpty}
            selectedHours={state.selectedHours}
            useCategories={useCategories}
            dispatch={dispatch}
          />
          <ChartComponent
            data={tempData}
            width={width}
            isEmpty={isEmpty}
            activeTab={activeTab}
            average={average}
          />
        </>
      );
    } else {
      isEmpty = false;
      useCategories = true;
      tempData = [...data];
      return (
        <>
          <ChartComponentHTML
            data={tempData}
            dataFromClient={dataFromClient}
            width={width}
            isEmpty={isEmpty}
            selectedHours={state.selectedHours}
            useCategories={useCategories}
            dispatch={dispatch}
          />
          <ChartComponent
            data={tempData}
            width={width}
            isEmpty={isEmpty}
            activeTab={activeTab}
            average={average}
          />
        </>
      );
    }
  }
}

function ChartComponentHTML({
  data,
  dataFromClient,
  width,
  isEmpty,
  selectedHours,
  useCategories,
  dispatch,
}: {
  data: Array<any>;
  dataFromClient: any;
  width: number;
  isEmpty: boolean;
  selectedHours: Array<number>;
  useCategories: boolean;
  dispatch: TDispatch;
}) {
  const start = selectedHours[0];
  const end = selectedHours[1];
  let hoursOfUse = 24;
  if (start < end) {
    hoursOfUse = end - start;
  } else {
    hoursOfUse = start - end;
  }
  let kwh = 0;
  if (!useCategories) {
    kwh = data[0].value;
  } else {
    data.forEach((item: DonutDataItem) => {
      kwh += item.value;
    });
  }
  if (isEmpty) kwh = 0;

  const { priceInNOK, average } = getTotalPrice(
    selectedHours,
    kwh,
    dataFromClient
  );

  useEffect(() => {
    dispatch({ type: "SET_AVERAGE", payload: average });
  }, [average]);

  return (
    <div className="absolute top-[35%] left-1/2 translate-x-[-50%] translate-y-[-50%]">
      <div>
        <p
          className="text-center mb-2 whitespace-nowrap"
          style={{ fontSize: width / 14 }}
        >
          {`${kwh.toFixed(1)} kwh / ${hoursOfUse} Timer`}
        </p>
        <p className="text-center">
          <strong className="text-xl" style={{ fontSize: width / 10 }}>
            {priceInNOK}
          </strong>{" "}
          NOK
        </p>
      </div>
    </div>
  );
}

function getTotalPrice(
  selectedHours: Array<number>,
  kwh: number,
  dataFromClient: Array<IDataFromAPI>
) {
  const { dailyPriceArray }: any = dataFromClient[0];
  if (selectedHours[0] > selectedHours[1]) {
    selectedHours.reverse();
  }
  let newArray = [];
  if (selectedHours[1] === 24) {
    newArray = dailyPriceArray;
  } else {
    for (let i = selectedHours[0]; i < selectedHours[1]; i++) {
      newArray.push(dailyPriceArray[i]);
    }
  }

  const sum = newArray.reduce((a: number, b: number) => a + b, 0);
  let average = sum / newArray.length;
  if (isNaN(average)) {
    average = 0;
  }

  const pricepPerHour = kwh * average;
  const priceInOre = pricepPerHour * newArray.length;
  const priceInNOK = priceInOre / 100;
  return { priceInNOK: priceInNOK.toFixed(0), average };
}

function ChartComponent({
  data,
  width,
  isEmpty,
  activeTab,
  average,
}: {
  data: any;
  width: number;
  isEmpty: boolean;
  activeTab: string;
  average: number;
}) {
  return (
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
          {!isEmpty ? (
            data.map((entry: any, index: number) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  activeTab === "tab1"
                    ? COLORS[index % COLORS.length]
                    : entry.color
                }
              />
            ))
          ) : (
            <Cell key={`empty-cell`} fill="#ffcd4f" />
          )}
        </Pie>
        <text
          key={Math.random()}
          x={"50%"}
          y={"77%"}
          style={{
            fontSize: width / 13,
            fontWeight: "bold",
          }}
          fill="#ffcd4f"
          textAnchor="middle"
        >
          <tspan x="50%" dy="0">
            Gjennomsnittspris for
          </tspan>
          <tspan x="35%" y="87%">
            valgte timer:
          </tspan>
          <tspan x="72%" fill="#6be072">
            {average.toFixed(0)} Øre
          </tspan>
        </text>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
