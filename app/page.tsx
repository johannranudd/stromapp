import DonutRechartsClient from "./components/charts/recharts/DonutRechartsClient";
import XYChart from "./components/charts/recharts/XYChart";
import { getElectricityPrice } from "@/app/utils/gets";
import { use } from "react";
import BtnCta from "./components/ui/BtnCta";
import HeroVector from "../assets/images/verctor-hero.svg";
import Image from "next/image";
// moment

export default function Home() {
  const currentDate: Date = new Date();
  const todayStringDate: string = currentDate.toISOString().slice(0, 10);
  const dataFromAPI = use(
    getElectricityPrice(todayStringDate, todayStringDate, 1)
  );

  if (dataFromAPI.length === 0) return null;

  return (
    <>
      <Image
        src={HeroVector}
        alt="logo"
        className="absolute top-[calc(40%-4rem)] md:top-[calc(30%-4rem)] z-[-50]"
      />
      <main className="w-[95%] max-w-screen-xl mx-auto overflow-x-hidden   ">
        <div className="md:flex md:justify-between md:items-center mt-16">
          <div className="text-center space-y-3 max-w-[400px] mx-auto md:text-left md:m-0 md:max-w-[600px]">
            <h1 className="text-2xl md:text-4xl mlg:text-5xl">
              Sjekk strømprisene
            </h1>
            <p className="md:text-lg mlg:text-xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
              necessitatibus voluptatibus temporibus tempore reiciendis earum
              mollitia explicabo non sequi dolorum.
            </p>
            <BtnCta props={"hidden md:block"} />
          </div>
          <div className="mt-3">
            <DonutRechartsClient {...dataFromAPI} />
          </div>
        </div>
        <BtnCta props={"flex justify-center mt-2 md:hidden"} />
        <div className="mt-3">
          <XYChart {...dataFromAPI} />
        </div>
      </main>
    </>
  );
}
