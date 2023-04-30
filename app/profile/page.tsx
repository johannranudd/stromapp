"use client";
import CategoriesModal from "../components/modal/CategoriesModal";
import CreateBadgeModal from "../components/modal/CreateBadgeModal";
import CreateGroupModal from "@/app/components/modal/CreateGroupModal";
import { useGlobalContext } from "../context/context";
import ModalStage from "./components/ModalStage";
import OpenCategoryModalButton from "./components/OpenCategoryModalButton";
import ProfileInformation from "./components/ProfileInformation";
// import ProfileSettings from "./components/ProfileSettings";
import { useEffect, useState } from "react";
import EditAddressModal from "./components/modal/EditAddressModal";
import EditPhoneNrModal from "./components/modal/EditPhoneNrModal";
import ForgotEmailModal from "./components/modal/ChangeEmailModal";
import ChangeEmailModal from "./components/modal/ChangeEmailModal";

export default function page() {
  const { modalIsOpen, setModalIsOpen, badgeModalIsOpen, groupModalIsOpen } =
    useGlobalContext();
  const [adrModalIsOpen, setAdrModalIsOpen] = useState(false);
  const [phoneNrModalIsOpen, setPhoneNrModalIsOpen] = useState(false);
  const [changeEmailModalIsOpen, setChangeEmailModalIsOpen] = useState(false);
  const [aModalIsOpen, setAModaalIsOpen] = useState(false);

  useEffect(() => {
    if (modalIsOpen || adrModalIsOpen || phoneNrModalIsOpen) {
      setAModaalIsOpen(true);
    } else {
      setAModaalIsOpen(false);
    }
  }, [modalIsOpen, adrModalIsOpen, phoneNrModalIsOpen]);
  // test
  return (
    <div
      className={`min-h-screen bg-secondary text-primary dark:bg-primary dark:text-secondary
      ${aModalIsOpen && "absolute top-0 left-0 right-0 bottom-0"}
      `}
    >
      <div
        className={`w-[95%] max-w-screen-sm mx-auto ${
          !aModalIsOpen && "space-y-6"
        }`}
      >
        <ProfileInformation />
        <button
          className="border border-thirdClr py-2 px-4"
          onClick={() => setModalIsOpen(true)}
        >
          Category settings
        </button>

        {modalIsOpen && <CategoriesModal />}
        {badgeModalIsOpen && <CreateBadgeModal />}
        {groupModalIsOpen && <CreateGroupModal />}
        {adrModalIsOpen && (
          <EditAddressModal setAdrModalIsOpen={setAdrModalIsOpen} />
        )}
        {phoneNrModalIsOpen && (
          <EditPhoneNrModal setPhoneNrModalIsOpen={setPhoneNrModalIsOpen} />
        )}
        {changeEmailModalIsOpen && (
          <ChangeEmailModal
            setChangeEmailModalIsOpen={setChangeEmailModalIsOpen}
          />
        )}
        {/* {changeEmailModalIsOpen && (
          <ChangePWModal
            setChangeEmailModalIsOpen={setChangeEmailModalIsOpen}
          />
        )} */}
        <div>
          <button onClick={() => setAdrModalIsOpen(true)}>
            + Edit Address
          </button>
          <button onClick={() => setPhoneNrModalIsOpen(true)}>
            + Edit Phone Number
          </button>
        </div>
      </div>
    </div>
  );
}
