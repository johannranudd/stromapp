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
import ChangePWModal from "./components/modal/ChangePWModal";

export default function page() {
  const { modalIsOpen, setModalIsOpen, badgeModalIsOpen, groupModalIsOpen } =
    useGlobalContext();
  const [adrModalIsOpen, setAdrModalIsOpen] = useState(false);
  const [phoneNrModalIsOpen, setPhoneNrModalIsOpen] = useState(false);
  const [changeEmailModalIsOpen, setChangeEmailModalIsOpen] = useState(false);
  const [changePWModalIsOpen, setChangePWModalIsOpen] = useState(false);
  const [aModalIsOpen, setAModaalIsOpen] = useState(false);

  useEffect(() => {
    if (
      modalIsOpen ||
      adrModalIsOpen ||
      phoneNrModalIsOpen ||
      changeEmailModalIsOpen ||
      changePWModalIsOpen
    ) {
      setAModaalIsOpen(true);
    } else {
      setAModaalIsOpen(false);
    }
  }, [
    modalIsOpen,
    adrModalIsOpen,
    phoneNrModalIsOpen,
    changeEmailModalIsOpen,
    changePWModalIsOpen,
  ]);

  const [allowNotifications, setAllowNotifications] = useState(false);
  const [sendPushWhenLower, setSendPushWhenLower] = useState(false);

  useEffect(() => {
    // console.log(allowNotifications);
    // console.log(sendPushWhenLower);
  }, [allowNotifications, sendPushWhenLower]);

  return (
    <div
      className={` min-h-[calc(100vh-4rem)] bg-secondary text-primary dark:bg-primary dark:text-secondary`}
    >
      <div className={`w-[95%] max-w-screen-sm mx-auto`}>
        <ProfileInformation />
        <button
          className="bg-fourthClr text-secondary py-2 px-4 my-6"
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
        {changePWModalIsOpen && (
          <ChangePWModal setChangePWModalIsOpen={setChangePWModalIsOpen} />
        )}
        <div>
          <h2 className="text-xl mb-6">Profile Settings</h2>
          <div className="grid grid-cols-2 justify-items-start text-thirdClr mb-6">
            <button onClick={() => setAdrModalIsOpen(true)}>
              + Edit Address
            </button>
            <button onClick={() => setPhoneNrModalIsOpen(true)}>
              + Edit Phone Number
            </button>
          </div>
          <div className="grid grid-cols-2 justify-items-start text-thirdClr mb-6">
            <button onClick={() => setChangeEmailModalIsOpen(true)}>
              + Edit Email
            </button>
            <button onClick={() => setChangePWModalIsOpen(true)}>
              + Edit Password
            </button>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between">
            <p>Allow notifications</p>
            <div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={allowNotifications}
                  onChange={() => setAllowNotifications(!allowNotifications)}
                />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
          <div className="flex justify-between">
            <p>Send push when price is lower than selected amount</p>
            <div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={sendPushWhenLower}
                  onChange={() => setSendPushWhenLower(!sendPushWhenLower)}
                />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ${
//         !aModalIsOpen && "space-y-6"
//       }

//  ${aModalIsOpen && "absolute top-0 left-0 right-0 bottom-0"}
