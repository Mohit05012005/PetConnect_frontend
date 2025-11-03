import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:9000", // your Express server
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
