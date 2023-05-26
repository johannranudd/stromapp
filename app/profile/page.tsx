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
import { FiPlus, FiMinus, FiEdit2 } from "react-icons/fi";

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
    <div>
      <div className={`w-[95%] max-w-screen-sm mx-auto mb-16`}>
        <ProfileInformation />
        <div className="h-[1px] w-full bg-[#1fb5b52d] mb-6" />
        <h2 className="text-center text-2xl font-bold capitalize mb-6">
          Instillinger
        </h2>
        <button className="btnCta mb-6" onClick={() => setModalIsOpen(true)}>
          Kategorier
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
          <div className="grid grid-cols-2 justify-items-start text-thirdClrDark dark:text-thirdClr mb-6">
            <button
              onClick={() => setAdrModalIsOpen(true)}
              className="flex items-center hover:opacity-80"
            >
              <FiEdit2 /> <span className="ml-1">Rediger Adresse</span>
            </button>
            <button
              onClick={() => setPhoneNrModalIsOpen(true)}
              className="flex items-center hover:opacity-80"
            >
              <FiEdit2 /> <span className="ml-1">Rediger Telefonnummer</span>
            </button>
          </div>
          <div className="grid grid-cols-2 justify-items-start text-thirdClrDark dark:text-thirdClr mb-6">
            <button
              onClick={() => setChangeEmailModalIsOpen(true)}
              className="flex items-center hover:opacity-80"
            >
              <FiEdit2 /> <span className="ml-1">Rediger Email</span>
            </button>
            <button
              onClick={() => setChangePWModalIsOpen(true)}
              className="flex items-center hover:opacity-80"
            >
              <FiEdit2 /> <span className="ml-1">Rediger Passord</span>
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
      <div className="space-y-4 mb-8">
        <div className="flex justify-between">
          <p>Tillat varsler</p>
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
            Send varsel når prisen er lavere enn valgt beløp
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
          className="w-[10rem] flex justify-center items-center btnCta h-10"
        >
          {saved ? <AiOutlineCheck /> : "Lagre varsler"}
        </button>
      </div>
    </>
  );
}
