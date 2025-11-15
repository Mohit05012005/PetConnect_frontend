import axios from "axios";

const API = axios.create({
  baseURL: "https://pet-application-1.onrender.com", // your Express server
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
