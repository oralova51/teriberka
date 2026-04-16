import axios from "axios";
import type { AxiosInstance } from "axios";

  export const axiosInstance: AxiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API}`,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });

