import { useQuery } from "@tanstack/react-query";
import { api } from "@/api/axios";
import type { IGalleryItem, IResponse } from "@/types";

export function useGalleryList(page: number, limit: number) {
  return useQuery({
    queryKey: ["gallery", page, limit],
    queryFn: async () => {
      const { data } = await api.get<IResponse<IGalleryItem[]>>(
        `/api/v1.0/gallery/list?limit=${limit}&page=${page}&archive_id=9`
      );
      return data;
    },
  });
}
