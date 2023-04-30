"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useGlobalContext } from "@/app/context/context";

export default function MobileMenu() {
  const { menuIsOpen, setMenuIsOpen } = useGlobalContext();

  function handleResize() {
    if (window.innerWidth > 768) {
      setMenuIsOpen(false);
    }
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className={`fixed top-16 left-0 w-full z-10 flex flex-col bg-secondary text-primary dark:bg-primary dark:text-secondary border-2 rounded-b-md border-fourthClr duration-300 transform ${
        menuIsOpen ? "translate-y-0" : "-translate-y-full"
      } transition-all`}
    >
      <Link
        href={"/"}
        className="inline-block p-4 hover:shadow-[inset_0_-0px_10px_rgba(0,0,0,0.6)] hover:pl-8 duration-300"
      >
        Home
      </Link>
      <Link
        href={"/dashboard"}
        className="inline-block p-4 hover:shadow-[inset_0_-0px_10px_rgba(0,0,0,0.6)] hover:pl-8 duration-300"
      >
        Dashboard
      </Link>
      <Link
        href={"/profile"}
        className="inline-block p-4 hover:shadow-[inset_0_-0px_10px_rgba(0,0,0,0.6)] hover:pl-8 duration-300"
      >
        Profile
      </Link>
      <Link
        href={"/login"}
        className="inline-block p-4 hover:shadow-[inset_0_-0px_10px_rgba(0,0,0,0.6)] hover:pl-8 duration-300"
      >
        Login
      </Link>
    </div>
  );
}
