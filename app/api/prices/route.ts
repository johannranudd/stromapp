export async function POST(request: Request) {
  const { startDate, endDate, region } = await request.json();
  // console.log("Start date:", startDate, "End date:", endDate);

  let url = `https://api.strompriser.no/public/prices?startDate=${startDate}&endDate=${endDate}&region=${region}`;
  const currentDate = new Date();
  const todayStringDate = currentDate.toISOString().slice(0, 10);
  if (startDate === todayStringDate && endDate === todayStringDate) {
    url = `https://api.strompriser.no/public/prices-today?region=${region}`;
  }
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
        return new Response(JSON.stringify({ data: data }));
      } else {
        console.error(
          res.status,
          "An error occurred in /api/prices - POST(), RES NOT OK"
        );
        return await res.json();
      }
    } catch (error) {
      console.log(
        error,
        "An error occurred in /api/prices - POST() catch block"
      );
    }
  }
}
