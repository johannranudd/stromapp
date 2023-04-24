export function getURL() {
  let baseURL = "";
  if (process.env.NODE_ENV === "development") {
    baseURL = "http://localhost:1337/api";
  } else {
    baseURL = "https://example.com";
  }
  return baseURL;
}
