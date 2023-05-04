import DonutRechartsClient from "./components/charts/recharts/DonutRechartsClient";
import XYChart from "./components/charts/recharts/XYChart";
import { getElectricityPrice } from "@/app/utils/gets";
import { use } from "react";
import BtnCta from "./components/ui/BtnCta";
import HeroVector from "../assets/images/verctor-hero.svg";
import Image from "next/image";

export default function Home() {
  const currentDate: Date = new Date();
  const todayStringDate: string = currentDate.toISOString().slice(0, 10);
  const dataFromAPI = use(
    getElectricityPrice(todayStringDate, todayStringDate, 1)
  );
  // top[calc(50%-4rem)]
  return (
    <main className="relative w-[95%] max-w-screen-xl mx-auto overflow-x-hidden">
      <Image
        src={HeroVector}
        alt="logo"
        className="absolute top-[calc(40%-4rem)] md:top-[calc(30%-4rem)] "
      />
      <div className="md:flex md:justify-between md:items-center">
        <div className="text-center mt-3 space-y-3 max-w-[400px] mx-auto md:text-left md:m-0 md:max-w-[600px]">
          <h1 className="text-2xl md:text-4xl mlg:text-5xl">
            Sjekk strømprisene
          </h1>
          <p className="md:text-xl mlg:text-2xl">
            Lorem ipsum habackllkcnalxc SSDA sssdf some randome words her and
            then jist write more in done vare if i write wrong more in done vare
            if i write wrong
          </p>
        </div>
        <div className="mt-3">
          <DonutRechartsClient {...dataFromAPI} />
          <BtnCta />
        </div>
      </div>
      <div className="mt-3">
        <XYChart {...dataFromAPI} />
      </div>
    </main>
  );
}
