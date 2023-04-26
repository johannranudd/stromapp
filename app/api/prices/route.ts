// export async function GET(request: Request) {
//   console.log(request.body);
//   let url = `https://api.strompriser.no/public/prices?startDate=2023-04-21&endDate=2023-04-21&region=1`;
//   // let url = `https://api.strompriser.no/public/prices?startDate=${startDate}&endDate=${endDate}&region=${region}`;
//   if (process.env.APIKEY) {
//     try {
//       const res = await fetch(url, {
//         headers: {
//           "Content-Type": "application/json",
//           "api-key": process.env.APIKEY,
//         },
//       });
//       if (res.ok) {
//         const data = await res.json();
//         // return new Response(JSON.stringify({ data: data[0] }));
//         return new Response(JSON.stringify({ data: data }));
//       } else {
//         console.error(
//           res.status,
//           "An error occured in /api/prices - GET(), RES NOT OK"
//         );
//         return await res.json();
//       }
//     } catch (error) {
//       console.log(error, "An error occured in /api/prices - GET() catch block");
//     }
//   } else {
//     return new Response(JSON.stringify({ msg: "no api key" }));
//   }
// }

export async function POST(request: Request) {
  const { startDate, endDate, region } = await request.json();
  // console.log("Start date:", startDate, "End date:", endDate);

  let url = `https://api.strompriser.no/public/prices?startDate=${startDate}&endDate=${endDate}&region=${region}`;
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
  } else {
    return new Response(JSON.stringify({ msg: "no api key" }));
  }
}
