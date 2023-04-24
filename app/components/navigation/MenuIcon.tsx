"use client";
import React from "react";
import { useGlobalContext } from "@/app/context/context";
import NotificationBell from "./NotificationBell";

export default function MenuIcon() {
  const { menuIsOpen, setMenuIsOpen } = useGlobalContext();

  function handleClick() {
    setMenuIsOpen(!menuIsOpen);
  }

  return (
    <div className="ml-auto flex items-center">
      <NotificationBell />
      <div
        onClick={handleClick}
        className="cursor-pointer pr-2 space-y-1.5 md:hidden"
      >
        <div
          className={`w-8 h-[3px] duration-300 rounded-md bg-primary dark:bg-secondary ${
            menuIsOpen && "rotate-45 translate-y-[9px]"
          }`}
        ></div>
        <div
          className={`w-8 h-[3px] duration-300 rounded-md bg-primary ${
            menuIsOpen ? "bg-transparent" : "dark:bg-secondary"
          }`}
        ></div>
        <div
          className={`w-8 h-[3px] duration-300 rounded-md bg-primary dark:bg-secondary ${
            menuIsOpen && "-rotate-45 translate-y-[-9px]"
          }`}
        ></div>
      </div>
    </div>
  );
}

// return (
//   <>
//     <div
//       onClick={handleClick}
//       className="ml-auto cursor-pointer pr-2 space-y-1.5 md:hidden"
//     >
//       <div
//         className={`w-8 h-[3px] duration-300 rounded-md bg-primary dark:bg-secondary ${
//           menuIsOpen && "rotate-45 translate-y-[9px]"
//         }`}
//       ></div>
//       <div
//         className={`w-8 h-[3px] duration-300 rounded-md bg-primary ${
//           menuIsOpen ? "bg-transparent" : "dark:bg-secondary"
//         }`}
//       ></div>
//       <div
//         className={`w-8 h-[3px] duration-300 rounded-md bg-primary dark:bg-secondary ${
//           menuIsOpen && "-rotate-45 translate-y-[-9px]"
//         }`}
//       ></div>
//     </div>
//   </>
// );
