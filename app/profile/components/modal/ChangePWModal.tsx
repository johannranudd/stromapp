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
  const [success, setSuccess] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

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
        setErrors(res.error.message);
        setTimeout(() => {
          setErrors([]);
        }, 3000);
      } else {
        setSuccess("Password has been changed successfully");
        setTimeout(() => {
          setSuccess("");
          setChangePWModalIsOpen(false);
        }, 3000);
      }
    } else {
      setErrors(["All fields must be filled out"]);
      setTimeout(() => {
        setErrors([]);
      }, 3000);
    }
  }

  return (
    <>
      {errors.length > 0 && (
        <div className="absolute top-[calc(50%-4rem)] left-[50%] translate-y-[-50%] translate-x-[-50%]  w-full max-w-[400px] z-[99] flex flex-col items-center py-6 bg-red-500">
          <p>{errors}</p>
        </div>
      )}
      {success && (
        <div className="absolute top-[calc(50%-4rem)] left-[50%] translate-y-[-50%] translate-x-[-50%]  w-full max-w-[400px] z-[99] flex flex-col items-center py-6 bg-green-500">
          <p>{success}</p>
        </div>
      )}
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-[#000000a7] z-50">
        <div className="w-[95%] absolute top-[calc(50%-4rem)] left-[50%] translate-x-[-50%] translate-y-[-50%] max-w-screen-xxs  rounded-[35px] bg-secondary text-primary">
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
            <button type="submit" className="btnCtaWide2">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
