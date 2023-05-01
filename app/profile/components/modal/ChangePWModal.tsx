"use client";
import { useState } from "react";

interface ChangePWModalProps {
  setChangePWModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ChangePWModal({
  setChangePWModalIsOpen,
}: ChangePWModalProps) {
  const [oldPW, setOldPW] = useState("");
  const [newPW, setNewPW] = useState("");
  const [confirmNewPW, setConfirNewPW] = useState("");

  async function handleSubmit(e: any) {
    e.preventDefault();

    // TODO: come back and solve reset password problem

    //  const emailRegex =
    //    /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/;
    //  const trimmedEmail = newEmail.replace(/\s+/g, "");
    //  const result = trimmedEmail.match(emailRegex);

    //  if (result) {

    //  } else {
    //    throw new Error("error: Email must look like ....");
    //  }
    // await editProfile({ email: newEmail });
    // setChangeEmailModalIsOpen(false);
  }

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 bg-[#000000a7] z-50">
      <div className="w-[95%] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] max-w-screen-xxs  rounded-[35px] bg-secondary text-primary">
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
            value={oldPW}
            onChange={(e: any) => setOldPW(e.target.value)}
            className="text-secondary p-2"
          />
          <label htmlFor="newPassword" className="text-primary text-center">
            Enter New Password
          </label>
          <input
            type="password"
            id="newPassword"
            value={newPW}
            onChange={(e: any) => setNewPW(e.target.value)}
            className="text-secondary p-2"
          />
          <label htmlFor="confirmNewPW" className="text-primary text-center">
            Confirm New Password
          </label>
          <input
            type="password"
            id="confirmNewPW"
            value={confirmNewPW}
            onChange={(e: any) => setConfirNewPW(e.target.value)}
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
