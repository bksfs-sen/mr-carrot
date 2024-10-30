export const {
  REACT_APP_API_URL: API_URL,
  REACT_APP_API_URL_LIVE: LIVE_API_URL,
} = process.env;
// export const BaseURL =
//   process.env.NODE_ENV == "development" ? API_URL : LIVE_API_URL;
export const BaseURL =
  process.env.NODE_ENV === "development"
    ? API_URL
    : window.location.origin === "https://staging.mrcarrot.co"
    ? API_URL
    : LIVE_API_URL;
