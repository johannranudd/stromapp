import { getURL } from "./environment/environment";
import { getItem, setItem } from "./storage/localstorage";

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
      console.log(data);
      return await data;
    } else {
      console.error(
        res.status,
        "An error occured in puts.ts/login() res not OK"
      );
      return await res.json();
    }
  } catch (error) {
    console.log(
      error,
      "An error occured in puts.ts/createBadge()/ catch block"
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
      const { id, username, email } = data.user;
      setItem("jwt", data.jwt);
      setItem("user", { id, username, email });
      window.location.href = "../dashboard/";
      return await data;
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
      const { id, username, email } = data.user;
      setItem("jwt", data.jwt);
      setItem("user", { id, username, email });
      window.location.href = "../dashboard/";
      return await data;
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
