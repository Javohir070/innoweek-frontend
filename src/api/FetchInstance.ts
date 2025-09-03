export const BASE_URL = "https://2025.innoweek.uz";

export const FetchInstance = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const headers: HeadersInit = {};

  // Agar body FormData bo'lmasa, Content-Type ni application/json qilib belgilaymiz
  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  if (typeof window !== "undefined" && window.localStorage) {
    const token = localStorage.getItem("token");
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...headers,
      ...options.headers, // options.headers bilan birlashtirish
    },
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    throw new Error(errorBody.message || "Fetch error");
  }

  const data: T = await res.json();
  return data;
};
