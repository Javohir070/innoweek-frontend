import axios, { type AxiosRequestConfig } from "axios";

const API_ORIGIN =
  import.meta.env.VITE_API_BASE_URL || "https://2025.innoweek.uz";

/** Dev: bo'sh — so'rovlar Vite proxy orqali ketadi (CORS yo'q) */
export const BASE_URL = API_ORIGIN;

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error?.message ||
      error.message ||
      "Fetch error";
    return Promise.reject(new Error(message));
  }
);

/** @deprecated Use `api` or react-query hooks. Kept for gradual migration. */
export async function FetchInstance<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const method = (options.method || "GET").toUpperCase();
  const isFormData = options.body instanceof FormData;

  const config: AxiosRequestConfig = {
    url: endpoint,
    method: method as AxiosRequestConfig["method"],
    headers: {
      ...(options.headers as Record<string, string>),
    },
  };

  if (isFormData) {
    config.data = options.body;
    if (config.headers) {
      delete config.headers["Content-Type"];
    }
  } else if (options.body) {
    config.data =
      typeof options.body === "string"
        ? JSON.parse(options.body)
        : options.body;
  }

  const response = await api.request<T>(config);
  return response.data;
}
