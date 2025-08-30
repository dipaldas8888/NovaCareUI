import axios from "axios";
import { auth } from "../lib/firebase";

// Base instance
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080",
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

// Request: attach fresh Firebase ID token if present
api.interceptors.request.use(
  async (config) => {
    const user = auth.currentUser;
    if (user) {
      // force refresh occasionally if you want: user.getIdToken(true)
      const idToken = await user.getIdToken();
      config.headers.Authorization = `Bearer ${idToken}`;
    } else {
      delete config.headers.Authorization;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response: handle 401 by signing out (optional)
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response?.status === 401) {
      // optional: try refreshing the token once
      try {
        const user = auth.currentUser;
        if (user) {
          const idToken = await user.getIdToken(true);
          error.config.headers.Authorization = `Bearer ${idToken}`;
          return api.request(error.config);
        }
      } catch (_) {}
      // if still 401, sign out locally
      // import { signOut } from "firebase/auth"; signOut(auth);
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
