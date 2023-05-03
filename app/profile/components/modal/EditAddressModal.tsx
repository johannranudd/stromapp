"use client";
import { editProfile } from "@/app/utils/puts";
import { useState } from "react";

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
      if (res.error) {
        setErrors(res.error.message);
        setTimeout(() => {
          setErrors([]);
        }, 3000);
      } else {
        setAdrModalIsOpen(false);
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
        <div className="absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]  w-full max-w-[400px] z-50 flex flex-col items-center py-6 bg-red-500">
          {errors.map((item: any) => {
            return <p>{item}</p>;
          })}
        </div>
      )}
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-[#000000a7] ">
        <div className="w-[95%] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] max-w-screen-xxs  rounded-[35px] bg-secondary text-primary">
          <button
            onClick={() => setAdrModalIsOpen(false)}
            className="absolute top-4 right-8"
          >
            X
          </button>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col mx-auto space-y-4 p-8"
          >
            <label htmlFor="address" className="text-primary text-center">
              Enter New Address
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
            <button type="submit" className="border border-thirdClr p-2">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
