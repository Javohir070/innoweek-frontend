import { useQuery } from "@tanstack/react-query";
import { api } from "@/api/axios";
import type { INewsListItem, IResponse } from "@/types";

export function useNewsList(locale: string, page: number, limit: number) {
  return useQuery({
    queryKey: ["news", "list", locale, page, limit],
    queryFn: async () => {
      const { data } = await api.get<IResponse<INewsListItem[]>>(
        `/api/v1.0/news/all?limit=${limit}&page=${page}&lang=${locale}&archive_id=8`
      );
      return data;
    },
  });
}

export function useNewsDetail(id: string, locale: string) {
  return useQuery({
    queryKey: ["news", "detail", id, locale],
    queryFn: async () => {
      const { data } = await api.get<IResponse<INewsListItem>>(
        `/api/v1.0/news/get/${id}?lang=${locale}`
      );
      return data;
    },
    enabled: Boolean(id),
  });
}
