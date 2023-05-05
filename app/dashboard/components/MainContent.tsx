"use client";
import { useEffect, useState } from "react";
import DonutElSupport from "./charts/elSupport/DonutElSupport";
import DonutConsumption from "./charts/consumtion/DonutConsumption";
import { useGlobalContext } from "@/app/context/context";
import { FiMinus, FiPlus } from "react-icons/fi";
export default function MainContent({ dataFromClient }: any) {
  // console.log(dataFromClient);
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
        className={`w-full flex justify-center items-center rounded-t-lg py-4 cursor-pointer border border-secondary dark:border-primary border-b-0 duration-300 ${
          activeTab === "tab1"
            ? "text-thirdClr"
            : "shadow-[inset_0px_-2px_4px_rgba(0,0,0,0.6)]"
        }`}
      >
        <h3>Estimated usage</h3>
      </div>

      <div
        onClick={() => setActiveTab("tab2")}
        className={`w-full flex justify-center items-center rounded-t-lg py-4 cursor-pointer border border-secondary dark:border-primary border-b-0 duration-300 ${
          activeTab === "tab2"
            ? "text-thirdClr"
            : "shadow-[inset_0px_-2px_4px_rgba(0,0,0,0.6)]"
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

  const increment = () => {
    setkWh((prevValue) => prevValue + 1);
  };

  const decrement = () => {
    if (kWh > 0) {
      setkWh((prevValue) => prevValue - 1);
    }
  };

  function handleTotalValue(e: any) {
    setkWh(Number(e.target.value));
  }

  useEffect(() => {
    dispatch({
      type: "CHANGE_KWH",
      payload: { value: kWh },
    });
  }, [kWh]);

  return (
    <div className="relative">
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
          <div className="absolute top-[10px] left-[50%] translate-x-[-50%] z-50">
            <button
              className="bg-primary text-secondary dark:bg-secondary dark:text-primary p-2 custom-button"
              onClick={decrement}
            >
              <FiMinus />
            </button>
            <input
              type="number"
              value={kWh}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleTotalValue(e)
              }
              className="w-28 text-center bg-primary text-secondary dark:bg-secondary dark:text-primary max-w-[70px]  custom-input border-thirdClr"
            />
            <button
              className="bg-primary text-secondary dark:bg-secondary dark:text-primary p-2 custom-button"
              onClick={increment}
            >
              <FiPlus />
            </button>
          </div>
        )}
        <div className="w-1/2 mt-6">
          <DonutConsumption
            dataFromClient={dataFromClient}
            activeTab={activeTab}
          />
        </div>
        <div className="w-1/2 mt-6">
          <DonutElSupport dataFromClient={dataFromClient} />
        </div>
      </div>
    </div>
  );
}
