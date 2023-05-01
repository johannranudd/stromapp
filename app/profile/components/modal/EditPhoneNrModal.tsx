"use client";
import { useState } from "react";

interface EditPhoneNrModalProps {
  setPhoneNrModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EditPhoneNrModal({
  setPhoneNrModalIsOpen,
}: EditPhoneNrModalProps) {
  const [phoneNr, setPhoneNr] = useState("");
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 bg-[#000000a7] z-50">
      <div className="w-[95%] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] max-w-screen-xxs  rounded-[35px] bg-secondary text-primary">
        <button
          onClick={() => setPhoneNrModalIsOpen(false)}
          className="absolute top-4 right-8"
        >
          X
        </button>

        <form className="flex flex-col mx-auto space-y-4 p-8">
          <label htmlFor="phoneNumber" className="text-primary text-center">
            Enter New Phone Number
          </label>
          <input
            type="text"
            id="phoneNumber"
            value={phoneNr}
            onChange={(e: any) => setPhoneNr(e.target.value)}
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
