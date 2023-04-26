"use client";
import { use, useEffect, useState } from "react";
import DonutElSupport from "./charts/elSupport/DonutElSupport";
import DonutConsumption from "./charts/consumtion/DonutConsumption";
import { useGlobalContext } from "@/app/context/context";
import { getElectricityPrice } from "@/app/utils/gets";

// import AreaChartDashboard from "./charts/areachart/AreaChartDashboard";
// import XYChart from "@/app/components/charts/recharts/XYChart";
export default function MainContent(dataFromAPI: any) {
  const { state } = useGlobalContext();
  const [activeTab, setActiveTab]: any = useState("tab1");
  const [dataFromClient, setDataFromClient] = useState();
  useEffect(() => {
    async function fetcherClient() {
      const res = await fetch("../../../api/prices");
      const data = await res.json();
      setDataFromClient(data.data);
      // return data;
    }
    fetcherClient();
  }, [state]);

  // console.log(dataFromAPI);
  // console.log({ ...dataFromAPI });
  // console.log(dataFromAPI[0]);
  // console.log([dataFromAPI[0]]);
  // console.log(dataFromClient);
  // return null;
  // if (dataFromClient)

  return (
    <div>
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <PiechartsDashboard
        dataFromAPI={[dataFromAPI[0]]}
        dataFromClient={dataFromClient && dataFromClient}
        activeTab={activeTab}
      />
      {/* <Tabs activeTab={activeTab} setActiveTab={setActiveTab} /> */}
      {/* <PiechartsDashboard dataFromAPI={dataFromClient} activeTab={activeTab} /> */}
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

function PiechartsDashboard({ dataFromAPI, activeTab, dataFromClient }: any) {
  // console.log(dataFromClient);
  const { state, dispatch } = useGlobalContext();
  // const { totalNumber }: any = state;
  const [kWh, setkWh] = useState(0);

  function handleTotalValue(e: any) {
    setkWh(Number(e.target.value));
    // dispatch({ type: "CHANGE_KWH", payload: Number(e.target.value) });
    dispatch({
      type: "CHANGE_KWH",
      payload: { value: Number(e.target.value) },
    });
  }

  // useEffect(() => {
  //   console.log(totalNumber);
  // }, [totalNumber]);

  return (
    <div className="relative bg-secondary text-primary dark:bg-primary dark:text-secondary">
      <div className="flex w-full max-w-screen-lg mx-auto pt-12">
        <div className="w-1/2">
          <form className="absolute top-0 left-[50%] translate-x-[-50%]">
            <input
              type="number"
              id="kWh"
              name="kWh"
              value={kWh}
              onChange={(e) => handleTotalValue(e)}
              className="text-red-500 w-[50px]"
            />
            <label htmlFor="kWh">kWh:</label>
          </form>
          <DonutConsumption
            dataFromClient={dataFromClient}
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
