import { getURL } from "./environment/environment";
import { getItem } from "./storage/localstorage";

export async function deleteItem(itemName: string, itemId: any) {
  const jwt = getItem("jwt");
  const baseURL = getURL();
  let url = `${baseURL}/${itemName}/${itemId}`;

  try {
    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    });
    if (res.ok) {
      return res;
    } else {
      console.error(
        res.status,
        "An error occured in puts.ts/deleteItem() res not OK"
      );
      return await res.json();
    }
  } catch (error) {
    console.log(error, "An error occured in puts.ts/deleteItem()/ catch block");
  }
}
