import axios, { AxiosResponse } from "axios";
import { BaseResponse } from "@/apis/config/type";

const baseUrl = "http://localhost:8080";
const fetchClient = axios.create({
  baseURL: baseUrl,
});

fetchClient.interceptors.request.use(
  async (config) => {
    const token = "";
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
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
    return Promise.reject(error);
  },
);

export default fetchClient;
