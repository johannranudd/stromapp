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
  const { date, location }: any = state;

  const [dataFromClient, setDataFromClient] = useState();

  useEffect(() => {
    fetcherClient(state, setDataFromClient);
  }, []);

  useEffect(() => {
    fetcherClient(state, setDataFromClient);
  }, [date, location]);

  if (!dataFromClient) return <div>Loading...</div>;

  return (
    <div>
      {modalIsOpen && <CategoriesModal />}
      {badgeModalIsOpen && <CreateBadgeModal />}
      {groupModalIsOpen && <CreateGroupModal />}

      <div>
        <h1 className="mt-16 py-6 text-center text-2xl">Dashbord</h1>
        <LocationAndDateForm />
        <MainContent dataFromClient={dataFromClient} />
        <div className="w-full max-w-screen-lg mx-auto">
          <AreaChartDashboard dataFromClient={dataFromClient} date={date} />
        </div>
      </div>
    </div>
  );
}
