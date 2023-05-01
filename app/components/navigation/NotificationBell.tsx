"use client";
import { AiOutlineBell } from "react-icons/ai";
import { useGlobalContext } from "@/app/context/context";
import { getItem } from "@/app/utils/storage/localstorage";
import { useState, useEffect } from "react";
export default function NotificationBell({ currentPrice }: any) {
  const {
    allowNotifications,
    setAllowNotifications,
    sendPushWhenLower,
    setSendPushWhenLower,
  } = useGlobalContext();
  const user = getItem("user");

  const [myNotifications, setMyNotifications] = useState<number>(0);
  const [prevPrice, setPrevPrice] = useState<number>(0);
  const [isBelow, setIsBellow] = useState<boolean>(false);
  useEffect(() => {
    if (allowNotifications) {
      console.log(sendPushWhenLower);
      if (currentPrice < sendPushWhenLower && prevPrice >= sendPushWhenLower) {
        console.log("pling");
        setMyNotifications((prev) => prev + 1);
      }
      setPrevPrice(currentPrice);
    }
  }, [sendPushWhenLower, currentPrice, allowNotifications]);

  if (user.length === 0) return null;
  return (
    <button
      onClick={() => setMyNotifications(0)}
      className="relative px-4 text-3xl"
    >
      <AiOutlineBell />
      <p className="absolute top-0 right-3 h-4 w-4 bg-green-500 rounded-full text-sm flex justify-center items-center">
        <span>{myNotifications}</span>
      </p>
    </button>
  );
}
