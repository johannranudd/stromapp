"use client";
import { use, useEffect, useState } from "react";
import DonutElSupport from "./charts/elSupport/DonutElSupport";
import DonutConsumption from "./charts/consumtion/DonutConsumption";
import { useGlobalContext } from "@/app/context/context";
import { getElectricityPrice } from "@/app/utils/gets";

// import AreaChartDashboard from "./charts/areachart/AreaChartDashboard";
// import XYChart from "@/app/components/charts/recharts/XYChart";
export default function MainContent(dataFromAPI: any) {
  const [activeTab, setActiveTab]: any = useState("tab1");
  // const [dataFromClient, setDataFromClient] = useState();
  // useEffect(() => {
  // async function fetcherClient() {
  //   const res = await fetch("../../../api/prices");
  //   const data = await res.json();
  //   setDataFromClient(data.data);
  //   return data;
  // }
  //  fetcherClient();
  // }, []);

  return (
    <div>
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <PiechartsDashboard dataFromAPI={dataFromAPI} activeTab={activeTab} />
    </div>
  );
}

function Tabs({ activeTab, setActiveTab }: any) {
  return (
    <div className="flex w-full max-w-screen-lg mx-auto">
      <div
        onClick={() => setActiveTab("tab1")}
        className={`w-full flex justify-center items-center rounded-t-lg py-4 cursor-pointer border border-secondary dark:border-primary ${
          activeTab === "tab1"
            ? "bg-secondary text-primary dark:bg-primary dark:text-secondary"
            : "bg-primary text-secondary dark:bg-secondary dark:text-primary"
        }`}
      >
        <h3>Estimated usage</h3>
      </div>

      <div
        onClick={() => setActiveTab("tab2")}
        className={`w-full flex justify-center items-center rounded-t-lg py-4 cursor-pointer border border-secondary dark:border-primary ${
          activeTab === "tab1"
            ? "bg-primary text-secondary dark:bg-secondary dark:text-primary"
            : "bg-secondary text-primary dark:bg-primary dark:text-secondary"
        }`}
      >
        <h3>Categories</h3>
      </div>
    </div>
  );
}

function PiechartsDashboard({ dataFromAPI, activeTab }: any) {
  return (
    <div className="bg-secondary text-primary dark:bg-primary dark:text-secondary">
      <div className="flex w-full max-w-screen-lg mx-auto">
        <div className="w-1/2">
          <DonutConsumption
            dataFromAPI={dataFromAPI[0]}
            activeTab={activeTab}
          />
        </div>
        <div className="w-1/2">
          <DonutElSupport {...dataFromAPI} />
        </div>
      </div>
    </div>
  );
}
