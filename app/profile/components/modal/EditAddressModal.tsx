"use client";
import { editProfile } from "@/app/utils/puts";
import { useState } from "react";
import { AiOutlineClose, AiOutlineCloseCircle } from "react-icons/ai";

interface EditPhoneNrModalProps {
  setAdrModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EditAddressModal({
  setAdrModalIsOpen,
}: EditPhoneNrModalProps) {
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (address) {
      const res = await editProfile({ address });
      if (res === "OK") {
        setAdrModalIsOpen(false);
      } else if (res.error) {
        setErrors(res.error.message);
        setTimeout(() => {
          setErrors([]);
        }, 3000);
      }
    } else {
      setErrors(["Address can not be empty"]);
      setTimeout(() => {
        setErrors([]);
      }, 3000);
    }
  }

  return (
    <>
      {errors.length > 0 && (
        <div className="fixed top-[calc(50%-4rem)] left-[50%] translate-y-[-50%] translate-x-[-50%]  w-full max-w-[400px] z-[99] flex flex-col items-center py-6 bg-red-500">
          {errors}
        </div>
      )}
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-[#000000a7] z-50">
        <div className="w-[95%] fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] max-w-screen-xxs  rounded-[35px] bg-secondary text-primary">
          <button
            onClick={() => setAdrModalIsOpen(false)}
            className="absolute top-4 right-8"
          >
            <AiOutlineCloseCircle className="text-3xl" />
          </button>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col mx-auto space-y-4 p-8"
          >
            <label htmlFor="address" className="text-primary text-center">
              Skriv inn ny adresse
            </label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setAddress(e.target.value)
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
