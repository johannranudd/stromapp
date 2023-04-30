"use client";
import { useGlobalContext } from "@/app/context/context";
import CategoriesModal from "@/app/components/modal/CategoriesModal";
import CreateBadgeModal from "@/app/components/modal/CreateBadgeModal";
import CreateGroupModal from "@/app/components/modal/CreateGroupModal";

export default function ModalStage() {
  const { modalIsOpen, setModalIsOpen, badgeModalIsOpen, groupModalIsOpen } =
    useGlobalContext();

  return (
    <>
      {modalIsOpen && <CategoriesModal />}
      {badgeModalIsOpen && <CreateBadgeModal />}
      {groupModalIsOpen && <CreateGroupModal />}
    </>
  );
}
