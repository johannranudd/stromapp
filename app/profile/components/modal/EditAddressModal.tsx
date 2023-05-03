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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await editProfile({ address });
    setAdrModalIsOpen(false);
  }

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 bg-[#000000a7] z-50">
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
  );
}
