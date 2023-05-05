import MenuIcon from "./MenuIcon";
import MobileMenu from "./MobileMenu";
import DesktopMenu from "./DesktopMenu";
import BtnColorMode from "../ui/BtnColorMode";
import LogoComponent from "./LogoComponent";
import NotificationBell from "./NotificationBell";
import { use } from "react";
import { getElectricityPrice } from "@/app/utils/gets";
import { DateTimeFormatOptions } from "@/types";

export default function Navbar() {
  const currentDate: Date = new Date();
  const todayStringDate: string = currentDate.toISOString().slice(0, 10);
  const dataFromAPI = use(
    getElectricityPrice(todayStringDate, todayStringDate, 1)
  );
  const { dailyPriceArray } = dataFromAPI[0];
  let currentPrice = 0;

  const now = new Date();
  const options: DateTimeFormatOptions = {
    timeZone: "Europe/Oslo",
    hour12: false,
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  const osloTime = new Intl.DateTimeFormat("en-UK", options)
    .format(now)
    .slice(0, 2);

  dailyPriceArray?.map((priceInOre: number, index: number) => {
    let hour = `${index}`;
    index < 10 ? (hour = `0${index}`) : `${index}`;

    if (hour === osloTime) {
      currentPrice = priceInOre;
    }
  });

  return (
    <header className="relative z-40 ">
      <nav className="fixed w-full z-40 bg-primary text-secondary dark:bg-secondary dark:text-primary">
        <div className="w-[95%] max-w-screen-xl mx-auto grid z-40 grid-cols-3 items-center h-16">
          <LogoComponent />
          <div className="flex justify-center items-center">
            <BtnColorMode />
            <NotificationBell currentPrice={currentPrice} />
          </div>
          <MenuIcon />
          <DesktopMenu />
        </div>
      </nav>
      <MobileMenu />
    </header>
  );
}
