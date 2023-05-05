"use client";
import { useGlobalContext } from "@/app/context/context";
import { getItem } from "@/app/utils/storage/localstorage";

export default function MenuIcon() {
  const { menuIsOpen, setMenuIsOpen } = useGlobalContext();
  const jwt = getItem("jwt");

  if (jwt.length === 0) return null;
  return (
    <div className="md:hidden ml-auto flex items-center">
      <div
        onClick={() => setMenuIsOpen(!menuIsOpen)}
        className="cursor-pointer pr-2 space-y-1.5"
      >
        <div
          className={`w-8 h-[3px] duration-300 rounded-md bg-secondary dark:bg-primary ${
            menuIsOpen && "rotate-45 translate-y-[9px]"
          }`}
        ></div>
        <div
          className={`w-8 h-[3px] duration-300 rounded-md bg-secondary ${
            menuIsOpen ? "bg-transparent" : "dark:bg-primary"
          }`}
        ></div>
        <div
          className={`w-8 h-[3px] duration-300 rounded-md bg-secondary dark:bg-primary ${
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
