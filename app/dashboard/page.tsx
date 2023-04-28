"use client";
import { useEffect, useRef, useState } from "react";
import LocationAndDateForm from "./components/LocationAndDateForm";
import MainContent from "./components/MainContent";
import AreaChartDashboard from "./components/charts/areachart/AreaChartDashboard";
import { useGlobalContext } from "../context/context";
import CategoriesModal from "../components/modal/CategoriesModal";
export default function page() {
  const { state } = useGlobalContext();

  const [dataFromClient, setDataFromClient] = useState();
  async function fetcherClient() {
    console.log("FETCHING !!!!!!!!!!!!!!!!!!!!!!!!!!");
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
      // body: JSON.stringify({
      //   startDate: "2023-04-21",
      //   endDate: "2023-04-21",
      //   region: 1,
      // }),
    });
    const data = await res.json();

    setDataFromClient(data.data);
  }
  useEffect(() => {
    const { startFetch }: any = state;
    if (startFetch) fetcherClient();
  }, [state]);
  useEffect(() => {
    fetcherClient();
  }, []);
  // console.log(dataFromClient);
  // const [isMoving, setIsMoving] = useState(false);
  // const componentRef: any = useRef();

  // useEffect(() => {
  //   document.addEventListener("click", handleClick);
  //   return () => document.removeEventListener("click", handleClick);
  //   function handleClick(e: any) {
  //     if (componentRef && componentRef.current) {
  //       const ref: any = componentRef.current;
  //       if (!ref.contains(e.target)) {
  //         setIsMoving(false);
  //       } else {
  //         setIsMoving(true);
  //       }
  //     }
  //   }
  // }, []);

  if (!dataFromClient) return <div>Loading...</div>;
  return (
    <>
      <CategoriesModal />
      <div>
        <h1 className="py-8 text-center text-2xl">Dashboard</h1>
        <LocationAndDateForm />
        <MainContent dataFromClient={dataFromClient} />
        <div className="w-full max-w-screen-lg mx-auto bg-secondary text-primary dark:bg-primary dark:text-secondary">
          <AreaChartDashboard dataFromClient={dataFromClient} />
        </div>
      </div>
    </>
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
