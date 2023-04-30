"use client";

import { getItem } from "@/app/utils/storage/localstorage";

export default function ProfileInformation() {
  const user = getItem("user");
  const { id, username, email, address, phoneNumber } = user;
  return (
    <div>
      <h1 className="text-center text-xl font-bold capitalize py-8">
        {username}
      </h1>
      <div className="space-y-4 sm:space-y-0 sm:flex sm:justify-between">
        <p className="sm:flex sm:flex-col">
          Email: <span>{email}</span>
        </p>
        <p className="sm:flex sm:flex-col">
          Address: <span>{address}</span>
        </p>
        <p className="sm:flex sm:flex-col">
          Phone number: <span>{phoneNumber}</span>
        </p>
      </div>
    </div>
  );
}
