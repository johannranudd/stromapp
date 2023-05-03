"use client";

import { getItem } from "@/app/utils/storage/localstorage";

export default function ProfileInformation() {
  const user = getItem("user");
  const { username, email, address, phoneNumber } = user;
  return (
    <>
      <h1 className="text-center text-xl font-bold capitalize py-8">
        {username}
      </h1>
      <div className="space-y-4 sm:space-y-0 ">
        <p>
          Email: <span>{email}</span>
        </p>
        <p>
          Address: <span>{address}</span>
        </p>
        <p>
          Phone number: <span>{phoneNumber}</span>
        </p>
      </div>
    </>
  );
}
