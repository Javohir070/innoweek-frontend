import { useQuery } from "@tanstack/react-query";
import { api } from "@/api/axios";
import type { IResponse } from "@/types";

export interface UserProfile {
  id: number;
  user_type?: number;
  first_name: string;
  last_name: string;
  middle_name?: string | null;
  phone?: string | null;
  email?: string | null;
  avatar?: string | null;
  status?: string;
  organization?: string | null;
  gender?: string | number | null;
  ticket?: {
    id: number;
    user_id?: number;
    archive_id?: number;
    ticket_id: string;
    status?: string;
    created_at?: string;
    updated_at?: string;
  };
  profession?: {
    name_uz?: string;
    name_en?: string;
    name_ru?: string;
    [key: string]: unknown;
  } | null;
  country?: string | object | null;
  number?: {
    id: number;
    full_number: string;
    user_id: number;
    created_at: string | null;
    updated_at: string;
  };
  [key: string]: unknown;
}

function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
}

export function useCurrentUser() {
  const token = getAuthToken();

  return useQuery({
    queryKey: ["user", "me", token],
    queryFn: async () => {
      const { data } = await api.post<IResponse<UserProfile>>("/api/v1.0/user/me");
      if (!data?.success || !data.data) {
        return null;
      }
      return data.data;
    },
    enabled: Boolean(token),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
