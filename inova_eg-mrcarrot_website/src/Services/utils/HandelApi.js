import axios from "axios";

export const initAxios = () => {
  axios.defaults.baseURL = process.env.BACKEND_URL;
  axios.defaults.withCredentials = true;
  axios.interceptors.response.use((response) => response);
};
const setAuthToken = (token) => {
  axios.defaults.headers.common["Accept-Language"] =
    localStorage.getItem("language");
  axios.defaults.headers.common["Cache-Control"] =
    "public, max-age=31536000, immutable";
  axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
  axios.defaults.headers.common["Access-Control-Allow-Headers"] =
    "Content-Type";
  axios.defaults.headers.common["Access-Control-Allow-Methods"] =
    "GET, POST, PUT, DELETE, OPTIONS";

  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios.defaults.headers.common["platform"] = `web`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};
export const setLanguage = (language) => {
  if (language === "ar") {
    localStorage.setItem("language", "ar");
    axios.defaults.headers.common["Accept-Language"] = "ar";
  } else {
    localStorage.setItem("language", "en");
    axios.defaults.headers.common["Accept-Language"] = "en";
  }
};

export const setConfirmatonCode = (code) => {
  if (code) {
    axios.defaults.headers.common["firebase-token"] = code;
  } else {
    delete axios.defaults.headers.common["firebase-token"];
  }
};

export const setResetCode = (code) => {
  if (code) {
    axios.defaults.headers.common["firebase-token"] = code;
  } else {
    delete axios.defaults.headers.common["firebase-token"];
  }
};

export default setAuthToken;
