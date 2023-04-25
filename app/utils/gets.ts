// `https://api.strompriser.no/public/prices?startDate=2023-04-21&endDate=2023-04-21&region=1`;
export async function getElectricityPrice(
  startDate: string,
  endDate: string,
  region: number
) {
  let url = `https://api.strompriser.no/public/prices?startDate=${startDate}&endDate=${endDate}&region=${region}`;
  // const currentDate = new Date();
  // const todayStringDate = currentDate.toISOString().slice(0, 10);
  // if (startDate === todayStringDate && endDate === todayStringDate) {
  //   url = `https://api.strompriser.no/public/prices-today?region=${region}`;
  // }
  try {
    if (process.env.APIKEY) {
      const res = await fetch(url, {
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
