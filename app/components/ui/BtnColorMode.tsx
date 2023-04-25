"use client";
import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import NotificationBell from "../navigation/NotificationBell";

const BtnColorMode = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, systemTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <div className="flex justify-evenly items-center">
      <div className="text-[1.7rem]">
        {currentTheme === "dark" ? (
          <div className="flex items-center">
            <button
              onClick={() => setTheme("light")}
              className="flex justify-center alight-center"
            >
              <BsFillSunFill />
            </button>
            <NotificationBell />
          </div>
        ) : (
          <div className="flex items-center">
            <button
              onClick={() => setTheme("dark")}
              className="flex justify-center alight-center"
            >
              <BsFillMoonFill />
            </button>
            <NotificationBell />
          </div>
        )}
      </div>
    </div>
  );
};

export default BtnColorMode;
