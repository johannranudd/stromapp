"use client";

import { getItem } from "@/app/utils/storage/localstorage";

export default function CheckIfLogedIn({
  children,
}: {
  children: React.ReactNode;
}) {
  const jwt = getItem("jwt");
  if (jwt) {
    console.log("yes");
  } else {
    console.log("no");
  }
  return <>{children}</>;
}
