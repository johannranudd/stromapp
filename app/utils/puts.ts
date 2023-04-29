import { getURL } from "./environment/environment";
import { getItem } from "./storage/localstorage";

export async function editBadge(formData: any, badgeId: number) {
  const jwt = getItem("jwt");
  const { id } = getItem("user");
  const baseURL = getURL();
  let url = `${baseURL}/badges/${badgeId}`;
  const { badgeName, category, color, kwh } = formData;
  const formatedFormData = {
    data: {
      name: badgeName,
      category: category,
      color: color,
      kwh: kwh,
      user: id,
    },
  };

  try {
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(formatedFormData),
    });
    if (res.ok) {
      const data = await res.json();
      return await data;
    } else {
      console.error(
        res.status,
        "An error occured in puts.ts/editBadge() res not OK"
      );
      return await res.json();
    }
  } catch (error) {
    console.log(error, "An error occured in puts.ts/editBadge()/ catch block");
  }
}
