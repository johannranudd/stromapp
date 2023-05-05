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
  const {
    state,
    modalIsOpen,
    badgeModalIsOpen,
    groupModalIsOpen,
    setDisableScrollbar,
  } = useGlobalContext();
  const { date, location }: any = state;

  const [dataFromClient, setDataFromClient] = useState();

  useEffect(() => {
    fetcherClient(state, setDataFromClient);
  }, []);

  useEffect(() => {
    const { startFetch }: any = state;
    if (startFetch) fetcherClient(state, setDataFromClient);
  }, [date, location]);

  useEffect(() => {
    if (modalIsOpen) {
      setDisableScrollbar(true);
    } else {
      setDisableScrollbar(false);
    }
  }, [modalIsOpen]);

  if (!dataFromClient) return <div>Loading...</div>;

  return (
    <div className="h-screen min-h-screen flex flex-col">
      {modalIsOpen && <CategoriesModal />}
      {badgeModalIsOpen && <CreateBadgeModal />}
      {groupModalIsOpen && <CreateGroupModal />}

      <div>
        <h1 className="mt-16 py-6 text-center text-2xl">Dashboard</h1>
        <LocationAndDateForm />
        <MainContent dataFromClient={dataFromClient} />
        <div className="w-full max-w-screen-lg mx-auto">
          <AreaChartDashboard dataFromClient={dataFromClient} />
        </div>
      </div>
    </div>
  );
}
