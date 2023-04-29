import { getURL } from "./environment/environment";
import { getItem } from "./storage/localstorage";

export async function deleteBadge(badgeId: any) {
  const jwt = getItem("jwt");
  const baseURL = getURL();
  let url = `${baseURL}/badges/${badgeId}`;

  try {
    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    });
    if (res.ok) {
      const data = await res.json();
      return await data;
    } else {
      console.error(
        res.status,
        "An error occured in puts.ts/deleteBadge() res not OK"
      );
      return await res.json();
    }
  } catch (error) {
    console.log(
      error,
      "An error occured in puts.ts/deleteBadge()/ catch block"
    );
  }
}
