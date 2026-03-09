import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// 🔥 important interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken"); // same key jo login me store kiya
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
