import { getURL } from "./environment/environment";
import { getItem, setItem } from "./storage/localstorage";

export async function editProfile(formData: any) {
  const jwt = getItem("jwt");
  const user = getItem("user");
  const baseURL = getURL();
  let url = `${baseURL}/user/me`;
  try {
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      const data = await res.text();
      setItem("user", { ...user, ...formData });
      return data;
    } else {
      console.error(
        res.status,
        "An error occured in puts.ts/editProfile() res not OK"
      );
      const data = await res.json();
      return data;
    }
  } catch (error) {
    console.log(
      error,
      "An error occured in puts.ts/editProfile()/ catch block"
    );
  }
}
//
//
//
export async function editGroup(formData: any, groupItem: any) {
  const jwt = getItem("jwt");
  const { id } = getItem("user");
  const baseURL = getURL();
  let url = `${baseURL}/groups/${groupItem.id}`;
  const { groupName, selectedBadges, color, kwh } = formData;
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
      return data;
    } else {
      console.error(
        res.status,
        "An error occured in puts.ts/editGroup() res not OK"
      );
      return await res.json();
    }
  } catch (error) {
    console.log(error, "An error occured in puts.ts/editGroup()/ catch block");
  }
}
//
//
//
export async function editBadge(formData: any, badgeItem: any) {
  const jwt = getItem("jwt");
  const { id } = getItem("user");
  const baseURL = getURL();
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
      return data;
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
