import axios from "axios";
import { BaseResponse } from "@/apis/config/type";
import { useAuthStore } from "@/stores/authStore";

const baseUrl = "http://localhost:8080";
const fetchClient = axios.create({
  baseURL: baseUrl,
});

fetchClient.interceptors.request.use(
  async (config) => {
    if (!config.headers.Authorization) {
      const { accessToken } = useAuthStore.getState();
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

fetchClient.interceptors.response.use(
  (response) => {
    const data = response.data as BaseResponse;
    if (data.success) {
      return response.data;
    } else {
      throw new Error(data.errorMsg ?? "未知錯誤");
    }
  },
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      useAuthStore.getState().logout();
    }
    return Promise.reject(error);
  },
);

export default fetchClient;
