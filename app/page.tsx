import DonutRechartsClient from "./components/charts/recharts/DonutRechartsClient";
import XYChart from "./components/charts/recharts/XYChart";
import { getElectricityPrice } from "@/app/utils/gets";
import { use } from "react";
import BtnCta from "./components/ui/BtnCta";
import HeroVector from "../assets/images/verctor-hero.svg";
import Image from "next/image";
import Link from "next/link";
// netlify-1 branch, api works from 06/25

export default function Home() {
  const currentDate: Date = new Date();
  const todayStringDate: string = currentDate.toISOString().slice(0, 10);
  const dataFromAPI = use(
    getElectricityPrice(todayStringDate, todayStringDate, 1)
  );
  return (
    <>
      <main className="relative w-[95%] max-w-screen-xl mx-auto overflow-x-hidden">
        <Image
          src={HeroVector}
          alt="logo"
          className="absolute top-[calc(40%-4rem)] md:top-[calc(30%-4rem)] left-0 right-0 z-[-50]"
        />
        <div className="md:flex md:justify-between md:items-center mt-16">
          <div className="text-center space-y-3 max-w-[400px] mx-auto md:text-left md:m-0 md:max-w-[600px]">
            <h1 className="text-2xl md:text-4xl mlg:text-5xl">
              Sjekk strømprisene
            </h1>
            <p className="md:text-lg mlg:text-xl">
              På denne nettsiden kan du se, måle og beregne ditt strømforbruk.
              Grafene du ser her er dagens strømpris og strømstøtte i Oslo.
              <br />
              <Link href={"/login"} className="text-fourthClr hover:underline">
                {" "}
                Logg inn
              </Link>{" "}
              for å planlegge, kategorisere og måle ditt strømforbruk i din
              region
            </p>
            <BtnCta props={"hidden md:block"} />
          </div>
          <div className="mt-4">
            <DonutRechartsClient {...dataFromAPI} />
          </div>
        </div>
        <BtnCta props={"flex justify-center mt-2 md:hidden"} />
        <div className="mt-4 mb-20">
          <h2 className="text-center text-xl">Dagens Stømpriser i Oslo</h2>
          <XYChart {...dataFromAPI} />
        </div>
      </main>
    </>
  );
}
