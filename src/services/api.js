import axios from "axios";
import { auth } from "../lib/firebase";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080",
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

api.interceptors.request.use(
  async (config) => {
    const user = auth.currentUser;
    if (user) {
      const idToken = await user.getIdToken();
      config.headers.Authorization = `Bearer ${idToken}`;
    } else {
      delete config.headers.Authorization;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        const user = auth.currentUser;
        if (user) {
          const idToken = await user.getIdToken(true);
          error.config.headers.Authorization = `Bearer ${idToken}`;
          return api.request(error.config);
        }
      } catch (_) {}
    }
    return Promise.reject(error);
  }
);
