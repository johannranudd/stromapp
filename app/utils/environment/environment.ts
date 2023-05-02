export function getURL() {
  let baseURL = "";
  if (process.env.NODE_ENV === "development") {
    // baseURL = "http://localhost:1337/api";
    baseURL = "https://sea-lion-app-eg9vc.ondigitalocean.app/api";
  } else {
    baseURL = "https://sea-lion-app-eg9vc.ondigitalocean.app/api";
  }
  return baseURL;
}
