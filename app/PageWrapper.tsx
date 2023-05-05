"use client";
import { useGlobalContext } from "./context/context";
import { useEffect } from "react";
export default function PageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { modalIsOpen, disableScrollbar } = useGlobalContext();
  // useEffect(() => {
  //   setDisableScrollbar(true);
  // }, [modalIsOpen]);
  // console.log(disableScrollbar);

  return (
    <div
      className={`overflow-y-hidden h-[0%]  ${
        !modalIsOpen && "h-screen min-h-screen flex flex-col"
      }`}
    >
      <div
        className={`relative flex-grow overflow-y-scroll overflow-x-hidden mt-16`}
      >
        {children}
      </div>
    </div>
  );
}
