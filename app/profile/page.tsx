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

export default function page() {
  const { modalIsOpen, setModalIsOpen, badgeModalIsOpen, groupModalIsOpen } =
    useGlobalContext();
  const [adrModalIsOpen, setAdrModalIsOpen] = useState(false);
  const [phoneNrModalIsOpen, setPhoneNrModalIsOpen] = useState(false);
  const [changeEmailModalIsOpen, setChangeEmailModalIsOpen] = useState(false);
  const [changePWModalIsOpen, setChangePWModalIsOpen] = useState(false);
  const [user, setUser] = useState();

  useEffect(() => {
    fetchUser(setUser);
  }, []);

  return (
    <div
      className={`min-h-[calc(100vh-4rem)] bg-secondary text-primary dark:bg-primary dark:text-secondary`}
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

function NotificationSettingComponent({ user }: any) {
  const [tempNotificationLimit, setTempNotificationLimit] = useState(0);
  const [isToggled, setIsToggled] = useState<boolean>();
  const [saved, setSaved] = useState<boolean>(false);

  function handleNotoficationValue(e: string) {
    let value = Number(e);
    setTempNotificationLimit(value++);
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
      <div className="space-y-3">
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
        <div className="flex justify-between items-start">
          <div>
            <p>Send push when price is lower than selected amount</p>
            <button
              onClick={updateLimit}
              className="w-[10rem] h-[2rem] flex justify-center items-center border"
            >
              {saved ? <AiOutlineCheck /> : "Save Notifications"}
            </button>
          </div>
          <input
            type="number"
            className="text-secondary"
            value={tempNotificationLimit}
            onChange={(e) => handleNotoficationValue(e.target.value)}
          />
        </div>
      </div>
    </>
  );
}
