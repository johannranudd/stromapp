import { getURL } from "./environment/environment";
import { getItem } from "./storage/localstorage";

// `https://api.strompriser.no/public/prices?startDate=2023-04-21&endDate=2023-04-21&region=1`;
export async function getElectricityPrice(
  startDate: string,
  endDate: string,
  region: number
) {
  let url = `https://api.strompriser.no/public/prices?startDate=${startDate}&endDate=${endDate}&region=${region}`;
  const currentDate = new Date();
  const todayStringDate = currentDate.toISOString().slice(0, 10);
  if (startDate === todayStringDate && endDate === todayStringDate) {
    url = `https://api.strompriser.no/public/prices-today?region=${region}`;
  }
  try {
    if (process.env.APIKEY) {
      const res = await fetch(url, {
        next: { revalidate: 60 },
        headers: {
          "Content-Type": "application/json",
          "api-key": process.env.APIKEY,
        },
      });
      if (res.ok) {
        return await res.json();
      } else {
        console.error(
          res.status,
          "An error occured in gets.ts/getElectricityPrice()"
        );
        return await res.json();
      }
    }
  } catch (error) {
    console.log(error, "An error occured in gets.ts/getElectricityPrice()");
  }
}

export async function fetchGroups(setGroups: any) {
  console.log("FETCHING group !!!!!!!!!!!!!!!!!!!!!!!!!!");
  const baseURL = getURL();
  // const { id } = getItem("user");
  try {
    const res = await fetch(
      // `${baseURL}/users/${id}?populate=groups&populate=badges`
      `${baseURL}/groups?populate=badges`
    );
    if (res.ok) {
      const data = await res.json();
      setGroups(data);
    } else {
      console.log(
        res.status,
        "an error occured in gets.ts - fetchUser() res not ok"
      );
    }
  } catch (error) {
    console.log(error, "an error occured in gets.ts - fetchUser() catch block");
  }
}
export async function fetchUser(setUser: any) {
  console.log("FETCHING USER !!!!!!!!!!!!!!!!!!!!!!!!!!");
  const baseURL = getURL();
  const { id } = getItem("user");
  try {
    const res = await fetch(
      // `${baseURL}/users/${id}?populate=groups&populate=badges`
      `${baseURL}/users/${id}?populate=groups&populate=badges`
    );
    if (res.ok) {
      const data = await res.json();
      setUser(data);
    } else {
      console.log(
        res.status,
        "an error occured in gets.ts - fetchUser() res not ok"
      );
    }
  } catch (error) {
    console.log(error, "an error occured in gets.ts - fetchUser() catch block");
  }
}

export async function fetcherClient(state: any, setDataFromClient: any) {
  console.log("FETCHING CLIENT PRICES API !!!!!!!!!!!!!!!!!!!!!!!!!!");
  const { date, location }: any = state;
  const res = await fetch("../../../api/prices", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      startDate: date,
      endDate: date,
      region: location,
    }),
  });
  const data = await res.json();

  setDataFromClient(data.data);
}
