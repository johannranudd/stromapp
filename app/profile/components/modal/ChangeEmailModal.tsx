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

  async function handleSubmit(e: any) {
    e.preventDefault();
    const emailRegex =
      /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/;
    const trimmedEmail = newEmail.replace(/\s+/g, "");
    const result = trimmedEmail.match(emailRegex);
    if (result) {
      await editProfile({ email: newEmail });
      setChangeEmailModalIsOpen(false);
    } else {
      throw new Error("error: Email must look like ....");
    }
  }
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 bg-[#000000a7] z-50">
      <div className="w-[95%] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] max-w-screen-xxs  rounded-[35px] bg-secondary text-primary">
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
            onChange={(e: any) => setNewEmail(e.target.value)}
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
