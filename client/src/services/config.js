import axios from "axios";

export const apiUrl =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_PROD_API_URL
    : process.env.REACT_APP_DEV_API_URL;

console.log("apiUrl", apiUrl);

axios.defaults.baseURL = apiUrl;
