export function getItem(key: string) {
  if (typeof window !== "undefined") {
    const locStor = JSON.parse(sessionStorage.getItem(key) || "[]");
    if (locStor != null || locStor != undefined) {
      return locStor;
    }
  }
}

export function setItem(key: string, value: any) {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(key, JSON.stringify(value));
  } else {
    return getItem("cart");
  }
}
