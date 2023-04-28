"use client";
import { useGlobalContext } from "@/app/context/context";

export default function CreateGroupModal() {
  const { groupModalIsOpen, setGroupModalIsOpen } = useGlobalContext();
  if (!groupModalIsOpen) return null;
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 bg-[#000000a7] z-50">
      <div className="w-[95%] h-[95vh] mt-[2.5vh] mx-auto max-w-screen-md flex flex-col justify-between rounded-[35px] bg-primary dark:bg-secondary">
        <div className="p-4 flex rounded-full justify-between bg-secondary text-primary">
          <h2>Create Group</h2>
          <button onClick={() => setGroupModalIsOpen(false)}>X</button>
        </div>
        CreateGroupeModal
      </div>
    </div>
  );
}
