// `https://api.strompriser.no/public/prices?startDate=2023-04-21&endDate=2023-04-21&region=1`;
export async function getElectricityPrice(
  startDate: string,
  endDate: string,
  region: number
) {
  if (process.env.APIKEY) {
    const res = await fetch(
      `https://api.strompriser.no/public/prices?startDate=${startDate}&endDate=${endDate}&region=${region}`,
      {
        headers: {
          "Content-Type": "application/json",
          "api-key": process.env.APIKEY,
        },
      }
    );
    const data = await res.json();
    return data;
  }
}

//  try {
//    const res = await fetch(`https://api.noroff.dev/api/v1/online-shop`, {
//      next: { revalidate: 30 },
//    });
//    if (res.ok) {
//      return await res.json();
//    } else {
//      console.error(res.status, "An error occured in getData()");
//      return await res.json();
//    }
//  } catch (error) {
//    console.error(error, "An error occured in getData()");
//  }
