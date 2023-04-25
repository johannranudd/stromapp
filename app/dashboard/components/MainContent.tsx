"use client";
import { useState } from "react";

export default function MainContent() {
  const [activeTab, setActiveTab] = useState("tab1");
  return (
    <div>
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <PiechartsDashboard />
    </div>
  );
}

function PiechartsDashboard() {
  return (
    <div className="h-screen bg-secondary text-primary dark:bg-primary dark:text-secondary">
      asdasd
    </div>
  );
}

function Tabs({ activeTab, setActiveTab }: any) {
  return (
    <div className="flex">
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
