"use client";
import CategoriesModal from "../components/modal/CategoriesModal";
import CreateBadgeModal from "../components/modal/CreateBadgeModal";
import CreateGroupModal from "@/app/components/modal/CreateGroupModal";
import { useGlobalContext } from "../context/context";
import ProfileInformation from "./components/ProfileInformation";
import { useEffect, useState } from "react";
import EditAddressModal from "./components/modal/EditAddressModal";
import EditPhoneNrModal from "./components/modal/EditPhoneNrModal";
import ChangeEmailModal from "./components/modal/ChangeEmailModal";
import ChangePWModal from "./components/modal/ChangePWModal";
import { fetchUser } from "../utils/gets";
import { editProfile } from "../utils/puts";
import { AiOutlineCheck } from "react-icons/ai";
import { IUser } from "@/types";
import { FiPlus, FiMinus } from "react-icons/fi";

export default function page() {
  const {
    modalIsOpen,
    setModalIsOpen,
    badgeModalIsOpen,
    groupModalIsOpen,
    setDisableScrollbar,
    disableScrollbar,
  } = useGlobalContext();
  const [adrModalIsOpen, setAdrModalIsOpen] = useState(false);
  const [phoneNrModalIsOpen, setPhoneNrModalIsOpen] = useState(false);
  const [changeEmailModalIsOpen, setChangeEmailModalIsOpen] = useState(false);
  const [changePWModalIsOpen, setChangePWModalIsOpen] = useState(false);
  const [user, setUser] = useState();

  useEffect(() => {
    fetchUser(setUser);
  }, []);
  useEffect(() => {
    if (
      adrModalIsOpen ||
      phoneNrModalIsOpen ||
      changeEmailModalIsOpen ||
      changePWModalIsOpen
    ) {
      setDisableScrollbar(true);
    } else {
      setDisableScrollbar(false);
    }
  }, [
    adrModalIsOpen,
    phoneNrModalIsOpen,
    changeEmailModalIsOpen,
    changePWModalIsOpen,
  ]);

  return (
    <div
    //  className={`h-screen min-h-screen flex flex-col`}
    >
      <div className={`w-[95%] max-w-screen-sm mx-auto`}>
        <ProfileInformation />
        <button className="btnCta mb-6" onClick={() => setModalIsOpen(true)}>
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
          <h2 className="text-xl mb-6">Profile Setting</h2>
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
        <NotificationSettingComponent user={user} />
      </div>
    </div>
  );
}

function NotificationSettingComponent({ user }: { user?: IUser }) {
  const [tempNotificationLimit, setTempNotificationLimit] = useState(0);
  const [isToggled, setIsToggled] = useState<boolean>();
  const [saved, setSaved] = useState<boolean>(false);

  const increment = () => {
    setTempNotificationLimit((prevValue) => prevValue + 1);
  };

  const decrement = () => {
    if (tempNotificationLimit > 0) {
      setTempNotificationLimit((prevValue) => prevValue - 1);
    }
  };

  function handleNotoficationValue(e: string) {
    let value = Number(e);
    setTempNotificationLimit(value);
  }
  async function updateLimit() {
    setSaved(true);
    await editProfile({ notificationLimit: tempNotificationLimit });
    setTimeout(() => {
      setSaved(false);
    }, 1000);
  }
  async function updateAllowNotifications() {
    await editProfile({ allowNotifications: isToggled });
  }

  useEffect(() => {
    if (user && user.hasOwnProperty("allowNotifications")) {
      setIsToggled(user.allowNotifications);
    }
    if (user && user.hasOwnProperty("notificationLimit")) {
      setTempNotificationLimit(user.notificationLimit);
    }
  }, [user]);

  useEffect(() => {
    updateAllowNotifications();
  }, [isToggled]);

  if (!user) return null;
  return (
    <>
      <div className="space-y-6 mb-8">
        <h2 className="text-xl mb-6">Notification Settings</h2>
        <div className="flex justify-between">
          <p>Allow notifications</p>
          <div>
            <label className="switch">
              <input
                type="checkbox"
                checked={isToggled}
                onChange={() => setIsToggled(!isToggled)}
              />
              <span className="slider round"></span>
            </label>
          </div>
        </div>
        <div className="flex flex-col justify-between items-start xxs:flex-row space-y-3">
          <p className="w-1/2">
            Send notification when price is lower than selected amount
          </p>
          <div className="flex items-center">
            <button
              className="bg-primary text-secondary dark:bg-secondary dark:text-primary p-2 custom-button"
              onClick={decrement}
            >
              <FiMinus />
            </button>
            <input
              type="number"
              value={tempNotificationLimit}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleNotoficationValue(e.target.value)
              }
              className="w-28 text-center bg-primary text-secondary dark:bg-secondary dark:text-primary custom-input"
            />
            <button
              className="bg-primary text-secondary dark:bg-secondary dark:text-primary p-2 custom-button"
              onClick={increment}
            >
              <FiPlus />
            </button>
          </div>
        </div>
        <button
          onClick={updateLimit}
          className="w-[10rem] flex justify-center items-center btnCta "
        >
          {saved ? <AiOutlineCheck /> : "Save Notifications"}
        </button>
      </div>
    </>
  );
}
