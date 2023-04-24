import { getURL } from "./environment/environment";
import { setItem } from "./storage/localstorage";

export async function login(formData: {
  identifier: string;
  password: string;
}) {
  const baseURL = getURL();
  const url = `${baseURL}auth/local`;
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
      setItem("jwt", data.jwt);
      setItem("user", data.user);
      window.location.replace("../dashboard/");
      return await data;
    } else {
      console.error(res.status, "An error occured in puts.ts/login() 1");
      return await res.json();
    }
  } catch (error) {
    console.log(error, "An error occured in puts.ts/login()/catch block");
  }
}
