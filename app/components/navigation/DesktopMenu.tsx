"use client";
import { getItem } from "@/app/utils/storage/localstorage";
import Link from "next/link";

export default function DesktopMenu() {
  const jwt = getItem("jwt");

  function logout() {
    sessionStorage.clear();
    window.location.reload();
  }

  if (jwt.length === 0)
    return (
      <Link
        href={"/login"}
        className="group ml-auto flex flex-col items-center"
      >
        Logg inn
        <span className="h-[2px] w-0 group-hover:w-full duration-300 bg-thirdClrDark dark:bg-thirdClr"></span>
      </Link>
    );
  return (
    <div className="hidden md:inline md:space-x-3 md:ml-auto md:flex md:items-center mlg:space-x-6">
      <Link href={"/"} className="group flex flex-col items-center">
        Hjem
        <span className="h-[2px] w-0 group-hover:w-full duration-300 bg-thirdClrDark dark:bg-thirdClr"></span>
      </Link>
      <Link href={"/dashboard"} className="group flex flex-col items-center">
        Dashbord
        <span className="h-[2px] w-0 group-hover:w-full duration-300 bg-thirdClrDark dark:bg-thirdClr"></span>
      </Link>
      <Link href={"/profile"} className="group flex flex-col items-center">
        Profil
        <span className="h-[2px] w-0 group-hover:w-full duration-300 bg-thirdClrDark dark:bg-thirdClr"></span>
      </Link>
      <Link
        onClick={logout}
        href={"/login"}
        className="group flex flex-col items-center"
      >
        Logg ut
        <span className="h-[2px] w-0 group-hover:w-full duration-300 bg-thirdClrDark dark:bg-thirdClr"></span>
      </Link>
    </div>
  );
}
