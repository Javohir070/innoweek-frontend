export const BASE_URL = "https://innoweek.uz"

export const FetchInstance = async <T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> => {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };
    const token = localStorage.getItem("token")
    if(token){
      headers.Authorization = `Bearer ${token}`
    }

    const res = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });
  
    if (!res.ok) {
      const errorBody = await res.json().catch(() => ({}));
      throw new Error(errorBody.message || "Fetch error");
    }
  
    const data: T = await res.json();
    return data;
  };