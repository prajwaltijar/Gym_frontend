import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// token auto attach
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    config.headers["auth-token"] = token;   // 🔥 IMPORTANT (backend ye hi read kar raha)
  }
  return config;
});

export default api;
