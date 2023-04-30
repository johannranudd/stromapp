import { getURL } from "./environment/environment";
import { getItem } from "./storage/localstorage";

export async function editGroup(formData: any, groupItem: any) {
  const jwt = getItem("jwt");
  const { id } = getItem("user");
  const baseURL = getURL();
  // console.log(groupItem);
  let url = `${baseURL}/groups/${groupItem.id}`;
  const { groupName, amountOfGroups, selectedBadges, color, kwh } = formData;
  // console.log(formData);
  // console.log(groupItem);
  const formatedFormData = {
    data: {
      name: groupName,
      user: id,
      badges: selectedBadges,
      color: color,
      kwh: kwh,
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
export async function editBadge(formData: any, badgeItem: any) {
  const jwt = getItem("jwt");
  const { id } = getItem("user");
  const baseURL = getURL();
  // console.log(badgeItem);
  let url = `${baseURL}/badges/${badgeItem.id}`;
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
