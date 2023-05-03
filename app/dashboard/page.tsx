"use client";
import { useEffect, useState } from "react";
import LocationAndDateForm from "./components/LocationAndDateForm";
import MainContent from "./components/MainContent";
import AreaChartDashboard from "./components/charts/areachart/AreaChartDashboard";
import { useGlobalContext } from "../context/context";
import CategoriesModal from "../components/modal/CategoriesModal";
import CreateBadgeModal from "../components/modal/CreateBadgeModal";
import CreateGroupModal from "../components/modal/CreateGroupModal";
import { fetcherClient } from "../utils/gets";
export default function page() {
  const { state, modalIsOpen, badgeModalIsOpen, groupModalIsOpen } =
    useGlobalContext();

  const [dataFromClient, setDataFromClient] = useState();
  // const [invalidData, setInvalidData] = useState(false);

  useEffect(() => {
    fetcherClient(state, setDataFromClient);
  }, []);

  useEffect(() => {
    const { startFetch }: any = state;
    if (startFetch) fetcherClient(state, setDataFromClient);
    console.log(dataFromClient);
  }, [state]);

  if (!dataFromClient) return <div>Loading...</div>;
  return (
    <div
      className={` ${
        modalIsOpen &&
        "absolute top-0 overflow-hidden max-h-screen scrollbar-hide w-screen"
      }`}
    >
      {modalIsOpen && <CategoriesModal />}
      {badgeModalIsOpen && <CreateBadgeModal />}
      {groupModalIsOpen && <CreateGroupModal />}

      {/* <div>
        <h1 className="py-8 text-center text-2xl">Dashboard</h1>
        <LocationAndDateForm />
        <MainContent dataFromClient={dataFromClient} />
        <div className="w-full max-w-screen-lg mx-auto bg-secondary text-primary dark:bg-primary dark:text-secondary">
          <AreaChartDashboard dataFromClient={dataFromClient} />
        </div>
      </div> */}
    </div>
  );
}
