"use client";
import { useEffect, useRef, useState } from "react";
import LocationAndDateForm from "./components/LocationAndDateForm";
import MainContent from "./components/MainContent";
import AreaChartDashboard from "./components/charts/areachart/AreaChartDashboard";
import { useGlobalContext } from "../context/context";
import CategoriesModal from "../components/modal/CategoriesModal";
import CreateBadgeModal from "../components/modal/CreateBadgeModal";
import CreateGroupModal from "../components/modal/CreateGroupModal";
import { fetcherClient } from "../utils/gets";
export default function page() {
  const {
    state,
    dispatch,
    modalIsOpen,
    setModalIsOpen,
    badgeModalIsOpen,
    setBadgeModalIsOpen,
    groupModalIsOpen,
    setGroupModalIsOpen,
  } = useGlobalContext();

  const [dataFromClient, setDataFromClient] = useState();

  useEffect(() => {
    fetcherClient(state, setDataFromClient);
  }, []);

  useEffect(() => {
    const { startFetch }: any = state;
    if (startFetch) fetcherClient(state, setDataFromClient);
  }, [state]);

  if (!dataFromClient) return <div>Loading...</div>;
  return (
    <>
      {modalIsOpen && <CategoriesModal />}
      {badgeModalIsOpen && <CreateBadgeModal />}
      {groupModalIsOpen && <CreateGroupModal />}

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
