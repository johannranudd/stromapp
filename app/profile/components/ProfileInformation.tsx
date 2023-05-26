"use client";

import { getItem } from "@/app/utils/storage/localstorage";

export default function ProfileInformation() {
  const user = getItem("user");
  const { username, email, address, phoneNumber } = user;
  return (
    <div className="mt-16 mb-6">
      <h1 className="text-center text-2xl font-bold capitalize py-8">Profil</h1>
      <div className="space-y-4">
        <p>
          Brukernavn: <span>{username}</span>
        </p>
        <p>
          Email: <span>{email}</span>
        </p>
        <p>
          Adresse: <span>{address}</span>
        </p>
        <p>
          Telefonnummer: <span>{phoneNumber}</span>
        </p>
      </div>
    </div>
  );
}
