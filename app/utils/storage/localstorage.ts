export function getItem(key: string) {
  if (typeof window !== "undefined") {
    const locStor = JSON.parse(localStorage.getItem(key) || "[]");
    if (locStor != null || locStor != undefined) {
      return locStor;
    }
  }
}

export function setItem(key: string, value: any) {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  } else {
    return getItem("cart");
  }
}

// export function getItem(key: string) {
//   if (typeof window !== "undefined") {
//     const locStor: string = JSON.parse(localStorage.getItem(key) || "[]");
//     if (locStor != null || locStor != undefined) {
//       return locStor;
//     }
//     // else {
//     //   return [];
//     // }
//   }
//   // else {
//   //   return [];
//   // }
// }
