"use client";
import { useEffect, useState } from "react";
import LocationAndDateForm from "./components/LocationAndDateForm";
import MainContent from "./components/MainContent";
import AreaChartDashboard from "./components/charts/areachart/AreaChartDashboard";
import { useGlobalContext } from "../context/context";
export default function page() {
  const { state } = useGlobalContext();
  const [dataFromClient, setDataFromClient] = useState();
  useEffect(() => {
    async function fetcherClient() {
      const { date, location }: any = state;
      const res = await fetch("../../../api/prices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          startDate: date,
          endDate: date,
          region: location,
        }),
      });
      const data = await res.json();

      setDataFromClient(data.data);
    }
    fetcherClient();
  }, [state]);

  if (!dataFromClient) return <div>Loading...</div>;
  return (
    <div>
      <h1 className="py-8 text-center text-2xl">Dashboard</h1>
      <LocationAndDateForm />
      <MainContent dataFromClient={dataFromClient} />
      <div className="w-full max-w-screen-lg mx-auto bg-secondary text-primary dark:bg-primary dark:text-secondary">
        <AreaChartDashboard dataFromClient={dataFromClient} />
      </div>
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
// const currentDate: Date = new Date();
// const todayStringDate: string = currentDate.toISOString().slice(0, 10);
// const dataFromAPI = use(
//   getElectricityPrice(todayStringDate, todayStringDate, 1)
// );
