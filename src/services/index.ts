import axios from "axios";

export const instance = axios.create({
  // baseURL: "http://localhost:8000/api/v1",
  baseURL: import.meta.env.VITE_PROD_SERVER,
  withCredentials: true,
});
