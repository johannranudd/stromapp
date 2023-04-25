"use client";
import { useState } from "react";
import DonutElSupport from "./charts/elSupport/DonutElSupport";

export default function MainContent(dataFromAPI: any) {
  const [activeTab, setActiveTab] = useState("tab1");

  return (
    <div>
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <PiechartsDashboard {...dataFromAPI} />
    </div>
  );
}

function Tabs({ activeTab, setActiveTab }: any) {
  return (
    <div className="flex w-full max-w-screen-lg mx-auto">
      <div
        onClick={() => setActiveTab("tab1")}
        className={`w-full flex justify-center items-center rounded-t-lg py-4 ${
          activeTab === "tab1"
            ? "bg-secondary text-primary dark:bg-primary dark:text-secondary"
            : "bg-primary text-secondary dark:bg-secondary dark:text-primary"
        }`}
      >
        <h3>Estimated usage</h3>
      </div>

      <div
        onClick={() => setActiveTab("tab2")}
        className={`w-full flex justify-center items-center rounded-t-lg py-4 ${
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

function PiechartsDashboard(dataFromAPI: any) {
  // TODO: add other pie chart
  return (
    <div className="flex h-screen w-full max-w-screen-lg mx-auto bg-secondary text-primary dark:bg-primary dark:text-secondary">
      <div className="w-1/2 bg-[#64189a]">Consumption chart</div>
      <div className="w-1/2 bg-[#03a9a6]">
        <DonutElSupport {...dataFromAPI} />
      </div>
    </div>
  );
}
