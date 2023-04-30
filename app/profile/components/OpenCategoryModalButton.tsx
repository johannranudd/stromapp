"use client";
import { useGlobalContext } from "@/app/context/context";

export default function OpenCategoryModalButton() {
  const { modalIsOpen, setModalIsOpen } = useGlobalContext();

  return (
    <button
      className="border border-thirdClr py-2 px-4"
      onClick={() => setModalIsOpen(true)}
    >
      Category settings
    </button>
  );
}
