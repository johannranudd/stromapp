"use client";
import { validateForm } from "@/app/utils/generics";
import { changePassword } from "@/app/utils/posts";
import { useState } from "react";

interface ChangePWModalProps {
  setChangePWModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ChangePWModal({
  setChangePWModalIsOpen,
}: ChangePWModalProps) {
  const [currentPW, setCurrentPW] = useState("");
  const [newPW, setNewPW] = useState("");
  const [confirmNewPW, setConfirNewPW] = useState("");
  const [warning, setWarning] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = {
      currentPassword: currentPW,
      password: newPW,
      passwordConfirmation: confirmNewPW,
    };
    const isValid = validateForm(formData);
    if (isValid) {
      const res = await changePassword(formData);
      if (res.error) {
        setWarning(res.error.message);
        setTimeout(() => {
          setWarning("");
        }, 3000);
      } else {
        setSuccess("Password has been changed successfully");
        setTimeout(() => {
          setSuccess("");
          setChangePWModalIsOpen(false);
        }, 3000);
      }
    }
  }

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 bg-[#000000a7] z-50">
      <div className="w-[95%] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] max-w-screen-xxs  rounded-[35px] bg-secondary text-primary">
        {warning && (
          <div className="absolute top-[-25%] z-50 bg-red-500 h-20 w-full flex justify-center items-center">
            <p>{warning}</p>
          </div>
        )}
        {success && (
          <div className="absolute top-[-25%] z-50 bg-green-500 h-20 w-full flex justify-center items-center">
            <p>{success}</p>
          </div>
        )}
        <button
          onClick={() => setChangePWModalIsOpen(false)}
          className="absolute top-4 right-8"
        >
          X
        </button>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col mx-auto space-y-4 p-8"
        >
          <label htmlFor="oldPassword" className="text-primary text-center">
            Enter Old Password
          </label>
          <input
            type="password"
            id="oldPassword"
            value={currentPW}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCurrentPW(e.target.value)
            }
            className="text-secondary p-2"
          />
          <label htmlFor="newPassword" className="text-primary text-center">
            Enter New Password
          </label>
          <input
            type="password"
            id="newPassword"
            value={newPW}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNewPW(e.target.value)
            }
            className="text-secondary p-2"
          />
          <label htmlFor="confirmNewPW" className="text-primary text-center">
            Confirm New Password
          </label>
          <input
            type="password"
            id="confirmNewPW"
            value={confirmNewPW}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setConfirNewPW(e.target.value)
            }
            className="text-secondary p-2"
          />
          <button type="submit" className="border border-thirdClr p-2">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
