"use client";
import { editProfile } from "@/app/utils/puts";
import { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

interface EditPhoneNrModalProps {
  setPhoneNrModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EditPhoneNrModal({
  setPhoneNrModalIsOpen,
}: EditPhoneNrModalProps) {
  const [phoneNr, setPhoneNr] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const phoneRegex = /^\+?[0-9]\d{1,20}$/;
    const trimmedPhoneNumber = phoneNr.replace(/\s+/g, "");
    const result = trimmedPhoneNumber.match(phoneRegex);
    if (!phoneNr) {
      setErrors(["Phone number can not be empty"]);
      setTimeout(() => {
        setErrors([]);
      }, 3000);
    }
    if (result) {
      const res = await editProfile({ phoneNumber: phoneNr });
      if (res === "OK") {
        setPhoneNrModalIsOpen(false);
      } else if (res.error) {
        setErrors(res.error.message);
        setTimeout(() => {
          setErrors([]);
        }, 3000);
      }
    } else {
      setErrors([`${phoneNr} is not a valid phone number`]);
      setTimeout(() => {
        setErrors([]);
      }, 3000);
    }
  }
  return (
    <>
      {errors.length > 0 && (
        <div className="fixed top-[calc(50%-4rem)] left-[50%] translate-y-[-50%] translate-x-[-50%]  w-full max-w-[400px] z-[99] flex flex-col items-center py-6 bg-red-500">
          <p>{errors}</p>
        </div>
      )}

      <div className="fixed top-0 left-0 right-0 bottom-0 bg-[#000000a7] z-50">
        <div className="w-[95%] fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] max-w-screen-xxs  rounded-[35px] bg-secondary text-primary">
          <button
            onClick={() => setPhoneNrModalIsOpen(false)}
            className="absolute top-4 right-8"
          >
            <AiOutlineCloseCircle className="text-3xl" />
          </button>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col mx-auto space-y-4 p-8"
          >
            <label htmlFor="phoneNumber" className="text-primary text-center">
              Skriv inn nytt telefonnummer
            </label>
            <input
              type="text"
              id="phoneNumber"
              value={phoneNr}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPhoneNr(e.target.value)
              }
              className="text-secondary p-2"
            />
            <button type="submit" className="btnCtaWide2">
              Endre
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
