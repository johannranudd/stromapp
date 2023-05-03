"use client";
import { useEffect, useState } from "react";
import DonutElSupport from "./charts/elSupport/DonutElSupport";
import DonutConsumption from "./charts/consumtion/DonutConsumption";
import { useGlobalContext } from "@/app/context/context";
export default function MainContent({ dataFromClient }: any) {
  const [activeTab, setActiveTab] = useState("tab1");

  if (!dataFromClient) return <div>Loading</div>;
  return (
    <div>
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <PiechartsDashboard
        dataFromClient={dataFromClient}
        activeTab={activeTab}
      />
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

function PiechartsDashboard({ activeTab, dataFromClient }: any) {
  const { state, dispatch, setModalIsOpen } = useGlobalContext();
  const { totalKWHArray }: any = state;
  const [kWh, setkWh] = useState(0);

  function handleTotalValue(e: any) {
    setkWh(Number(e.target.value));
    dispatch({
      type: "CHANGE_KWH",
      payload: { value: Number(e.target.value) },
    });
  }

  return (
    <div className="relative bg-secondary text-primary dark:bg-primary dark:text-secondary">
      {activeTab === "tab2" && (
        <div className="w-[95%] mx-auto max-w-screen-lg">
          <ul className="flex flex-wrap mb-2">
            {totalKWHArray.length >= 1 &&
              totalKWHArray.map((item: any) => {
                return (
                  <button
                    onClick={() =>
                      dispatch({ type: "REMOVE_FROM_ARRAY", payload: item })
                    }
                    style={{ backgroundColor: item.color }}
                    className={`rounded-md m-1`}
                  >
                    {item.name} <span>X</span>&nbsp;
                  </button>
                );
              })}
          </ul>
          <button
            onClick={() => setModalIsOpen(true)}
            className="bg-green-500 rounded-md"
          >
            Add categories +
          </button>
        </div>
      )}

      <div className="flex w-full max-w-screen-lg mx-auto pt-6">
        {activeTab === "tab1" && (
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
        )}
        <div className="w-1/2">
          <DonutConsumption
            dataFromClient={dataFromClient}
            activeTab={activeTab}
          />
        </div>
        <div className="w-1/2">
          <DonutElSupport dataFromClient={dataFromClient} />
        </div>
      </div>
    </div>
  );
}
