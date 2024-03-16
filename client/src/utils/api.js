import axios from "axios";

const API_URL = 'http://localhost:3000/';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  config.headers["Authorization"] = localStorage.getItem(
    "authToken"
  );
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const response = error.response;

    if (response.status === 401) {
      window.location.href = "/login";
      throw response?.data?.error || "Unauthorized";
    }

    if (response.status === 403) {
      window.location.href = "/";
      throw response?.data?.error || "Forbidden";
    }

    return Promise.reject(error);
  }
);

export default api;

