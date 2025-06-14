import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const getToken = () => {
  return localStorage.getItem("accessToken");
};

API.interceptors.request.use(
  (config) => {
    const accessToken = getToken();
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response, config } = error;
    if (response && response.status === 401) {
      const isAuthRequest =
        config.url.includes("/login") || config.url.includes("/register");

      if (!isAuthRequest) {
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
      }

      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default API;
