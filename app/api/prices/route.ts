export async function GET(request: Request) {
  let url = `https://api.strompriser.no/public/prices?startDate=2023-04-21&endDate=2023-04-21&region=1`;
  if (process.env.APIKEY) {
    try {
      const res = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          "api-key": process.env.APIKEY,
        },
      });
      if (res.ok) {
        const data = await res.json();
        return new Response(JSON.stringify({ data: data[0] }));
      } else {
        console.error(
          res.status,
          "An error occured in /api/prices - GET(), RES NOT OK"
        );
        return await res.json();
      }
    } catch (error) {
      console.log(error, "An error occured in /api/prices - GET() catch block");
    }
  } else {
    return new Response(JSON.stringify({ msg: "no api key" }));
  }
}
