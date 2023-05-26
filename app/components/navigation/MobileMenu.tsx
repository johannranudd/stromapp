"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useGlobalContext } from "@/app/context/context";
import { getItem } from "@/app/utils/storage/localstorage";

export default function MobileMenu() {
  const { menuIsOpen, setMenuIsOpen } = useGlobalContext();
  const jwt = getItem("jwt");

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

  function logout() {
    sessionStorage.clear();
    window.location.reload();
  }

  if (jwt.length === 0) return null;
  return (
    <div
      className={`fixed top-16 left-0 w-full z-40 flex flex-col bg-primary text-secondary dark:bg-secondary dark:text-primary border-2 rounded-b-md border-fourthClr duration-300 transform ${
        menuIsOpen ? "translate-y-0" : "-translate-y-full"
      } transition-all`}
      onClick={() => setMenuIsOpen(!menuIsOpen)}
    >
      <Link
        href={"/"}
        className="inline-block p-4 hover:shadow-[inset_0_-0px_10px_rgba(0,0,0,0.6)] hover:pl-8 duration-300"
      >
        Hjem
      </Link>
      <Link
        href={"/dashboard"}
        className="inline-block p-4 hover:shadow-[inset_0_-0px_10px_rgba(0,0,0,0.6)] hover:pl-8 duration-300"
      >
        Dashbord
      </Link>
      <Link
        href={"/profile"}
        className="inline-block p-4 hover:shadow-[inset_0_-0px_10px_rgba(0,0,0,0.6)] hover:pl-8 duration-300"
      >
        Profil
      </Link>
      <Link
        onClick={logout}
        href={"/login"}
        className="inline-block p-4 hover:shadow-[inset_0_-0px_10px_rgba(0,0,0,0.6)] hover:pl-8 duration-300"
      >
        Logg ut
      </Link>
    </div>
  );
}
