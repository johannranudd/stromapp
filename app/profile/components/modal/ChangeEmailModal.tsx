"use client";
import { editProfile } from "@/app/utils/puts";
import { useState } from "react";

interface ChangeEmailModalProps {
  setChangeEmailModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ChangeEmailModal({
  setChangeEmailModalIsOpen,
}: ChangeEmailModalProps) {
  const [newEmail, setNewEmail] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const emailRegex =
      /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/;
    const trimmedEmail = newEmail.replace(/\s+/g, "");
    const result = trimmedEmail.match(emailRegex);
    if (!newEmail) {
      setErrors(["Email can not be empty"]);
      setTimeout(() => {
        setErrors([]);
      }, 3000);
    }
    if (result) {
      const res = await editProfile({ email: newEmail });
      if (res) {
        setErrors(res.error.message);
        setTimeout(() => {
          setErrors([]);
        }, 3000);
      } else {
        setChangeEmailModalIsOpen(false);
      }
    } else {
      setErrors([`${newEmail} is not a valid phone number`]);
      setTimeout(() => {
        setErrors([]);
      }, 3000);
    }
  }
  return (
    <>
      {errors.length > 0 && (
        <div className="absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]  w-full max-w-[400px] z-50 flex flex-col items-center py-6 bg-red-500">
          {errors.map((item: any) => {
            return <p>{item}</p>;
          })}
        </div>
      )}
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-[#000000a7] z-50">
        <div className="w-[95%] absolute top-[calc(50%-4rem)] left-[50%] translate-x-[-50%] translate-y-[-50%] max-w-screen-xxs  rounded-[35px] bg-secondary text-primary">
          <button
            onClick={() => setChangeEmailModalIsOpen(false)}
            className="absolute top-4 right-8"
          >
            X
          </button>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col mx-auto space-y-4 p-8"
          >
            <label htmlFor="email" className="text-primary text-center">
              Enter New Email
            </label>
            <input
              type="email"
              id="email"
              value={newEmail}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewEmail(e.target.value)
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
