import { getURL } from "./environment/environment";
import { getItem, setItem } from "./storage/localstorage";

export async function changePassword(formData: any) {
  const jwt = getItem("jwt");
  // const { id } = getItem("user");
  const baseURL = getURL();
  let url = `${baseURL}/auth/change-password`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      const data = await res.json();
      const {
        id,
        username,
        email,
        address,
        phoneNumber,
        allowNotifications,
        notificationLimit,
      } = data.user;
      await setItem("jwt", data.jwt);
      await setItem("user", {
        id,
        username,
        email,
        address,
        phoneNumber,
        allowNotifications,
        notificationLimit,
      });
      return data;
    } else {
      console.error(
        res.status,
        "An error occured in posts.ts/changePassword() res not OK"
      );
      return await res.json();
    }
  } catch (error) {
    console.log(
      error,
      "An error occured in posts.ts/changePassword()/ catch block"
    );
  }
}
export async function createGroup(formData: any) {
  const jwt = getItem("jwt");
  const { id } = getItem("user");
  const baseURL = getURL();
  let url = `${baseURL}/groups/`;
  const { groupName, color, kwh, selectedBadges } = formData;

  const formatedFormData = {
    data: {
      name: groupName,
      user: id,
      badges: selectedBadges.map((item: any) => item.id),
      color: color,
      kwh: kwh,
    },
  };
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(formatedFormData),
    });
    if (res.ok) {
      const data = await res.json();
      console.log(data);
      return data;
    } else {
      console.error(
        res.status,
        "An error occured in posts.ts/createGroup() res not OK"
      );
      return await res.json();
    }
  } catch (error) {
    console.log(
      error,
      "An error occured in posts.ts/createGroup()/ catch block"
    );
  }
}
//
//
//
//
export async function createBadge(formData: any) {
  const jwt = getItem("jwt");
  const { id } = getItem("user");
  const baseURL = getURL();
  let url = `${baseURL}/badges/`;
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
      method: "POST",
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
        "An error occured in posts.ts/createBadge() res not OK"
      );
      return await res.json();
    }
  } catch (error) {
    console.log(
      error,
      "An error occured in posts.ts/createBadge()/ catch block"
    );
  }
}

export async function login(formData: {
  identifier: string;
  password: string;
}) {
  const baseURL = getURL();
  const url = `${baseURL}/auth/local`;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      const data = await res.json();
      const {
        id,
        username,
        email,
        address,
        phoneNumber,
        allowNotifications,
        notificationLimit,
      } = data.user;
      await setItem("jwt", data.jwt);
      await setItem("user", {
        id,
        username,
        email,
        address,
        phoneNumber,
        allowNotifications,
        notificationLimit,
      });
      window.location.href = "../dashboard/";
      return data;
    } else {
      console.error(
        res.status,
        "An error occured in puts.ts/login() res not OK"
      );
      return await res.json();
    }
  } catch (error) {
    console.log(error, "An error occured in puts.ts/login()/catch block");
  }
}

export async function registerUser(formData: {
  username: string;
  email: string;
  password: string;
  address: string;
  phoneNumber: string;
}) {
  const baseURL = getURL();
  const url = `${baseURL}/auth/local/register`;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      const data = await res.json();
      const {
        id,
        username,
        email,
        address,
        phoneNumber,
        allowNotifications,
        notificationLimit,
      } = data.user;
      await setItem("jwt", data.jwt);
      await setItem("user", {
        id,
        username,
        email,
        address,
        phoneNumber,
        allowNotifications,
        notificationLimit,
      });
      window.location.href = "../dashboard/";
      return data;
    } else {
      console.error(
        res.status,
        "An error occured in puts.ts/registerUser() res not OK"
      );
      return await res.json();
    }
  } catch (error) {
    console.log(
      error,
      "An error occured in puts.ts/registerUser()/catch block"
    );
  }
}
