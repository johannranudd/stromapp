"use client";
import { AiOutlineBell } from "react-icons/ai";
import { getItem } from "@/app/utils/storage/localstorage";
import { useState, useEffect } from "react";
export default function NotificationBell({ currentPrice }: any) {
  // export default function NotificationBell() {
  // let currentPrice = 98;
  const user = getItem("user");

  const [myNotifications, setMyNotifications] = useState<number>(0);
  // * If prevPrice is active in the useEffect bellow, the user will only get notifications when price drops from over notificationLimit to under. without prevPrice the notifications will come every hour due to the { next: { revalidate: 3600 } } object in getElectricityPrice
  // const [prevPrice, setPrevPrice] = useState<number>(0);

  useEffect(() => {
    if (user) {
      const { allowNotifications, notificationLimit } = user;
      if (allowNotifications) {
        if (
          currentPrice < notificationLimit
          //  && prevPrice >= notificationLimit
        ) {
          // console.log("pling you have a notification");
          setMyNotifications((prev) => prev + 1);
        }
        // setPrevPrice(currentPrice);
      }
    }
  }, [user.notificationLimit, currentPrice, user.allowNotifications]);

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
