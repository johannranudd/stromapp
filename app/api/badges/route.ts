// import { getURL } from "@/app/utils/environment/environment";

// export async function GET(request: Request) {
// const baseURL = getURL();
// let url = `${baseURL}/badges/`;
// console.log("URL!!!!!!!!", url);
// console.log("FFFFFFFF");
// let url = `http://localhost:1337/api/badges/`;
// try {
// const res = await fetch(url);
// console.log(res);
// return new Response(JSON.stringify({ msg: "HELLOOOOOO" }));
// console.log(res);
//   if (res.ok) {
//     const data = await res.json();
//     console.log(data);
//     return new Response(JSON.stringify({ data: data }));
//   } else {
//     console.error(
//       res.status,
//       "An error occurred in /api/badges - GET(), RES NOT OK"
//     );
//     return await res.json();
//   }
// } catch (error) {
//   console.log(error, "An error occurred in /api/badges - GET() catch block");
// }
// }
