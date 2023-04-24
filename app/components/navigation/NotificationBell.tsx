"use client";
import { AiOutlineBell } from "react-icons/ai";
export default function NotificationBell() {
  return (
    <button className="relative px-4 text-3xl">
      <AiOutlineBell />
      <p className="absolute top-0 right-3 h-4 w-4 bg-green-500 rounded-full text-sm flex justify-center items-center">
        <span>4</span>
      </p>
    </button>
  );
}
