"use client";
import { useGlobalContext } from "@/app/context/context";

export default function OpenCategoryModalButton() {
  const { modalIsOpen, setModalIsOpen } = useGlobalContext();

  return <button onClick={() => setModalIsOpen(true)}>Edit Categories</button>;
}
