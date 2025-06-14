import axios from "axios";

// export const api = axios.create({
//   baseURL: "http://localhost:8080",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   withCredentials: true,
// });

export const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000, // optional: helps catch hangs
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const doctorAPI = {
  getAll: () => api.get("/api/doctors"),
  getById: (id) => api.get(`/api/doctors/${id}`),
  getBySpecialization: (specialization) =>
    api.get(`/api/doctors/specialization/${specialization}`),
};

export const patientAPI = {
  create: (patientData) => api.post("/api/patients", patientData),
  getAll: () => api.get("/api/patients"),
  getById: (id) => api.get(`/api/patients/${id}`),
  update: (id, patientData) => api.put(`/api/patients/${id}`, patientData),
  delete: (id) => api.delete(`/api/patients/${id}`),
};

export const appointmentAPI = {
  create: (appointmentData) => api.post("/api/appointments", appointmentData),
  getAll: () => api.get("/api/appointments"),
  getById: (id) => api.get(`/api/appointments/${id}`),
  getByPatient: (patientId) =>
    api.get(`/api/appointments/patient/${patientId}`),
  getByDoctor: (doctorId) => api.get(`/api/appointments/doctor/${doctorId}`),
  getDoctorAvailability: (doctorId, start, end) =>
    api.get(`/api/appointments/doctor/${doctorId}/availability`, {
      params: { start, end },
    }),
  update: (id, appointmentData) =>
    api.put(`/api/appointments/${id}`, appointmentData),
  cancel: (id) => api.delete(`/api/appointments/${id}`),
};

export const authAPI = {
  login: (credentials) => api.post("/api/auth/login", credentials),
  register: (userData) => api.post("/api/auth/register", userData),
  registerAdmin: (userData, secret) =>
    api.post("/api/auth/register-admin", userData, {
      params: { secret },
    }),
};

export default api;
