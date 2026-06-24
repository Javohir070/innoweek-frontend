import { useQuery } from "@tanstack/react-query";
import {
  ixtiroApi,
  tijoratApi,
  IXTIRO_SITE_URL,
  TIJORAT_SITE_URL,
} from "@/api/contestApi";
import type {
  ContestCardData,
  InventionContest,
  TijoratContest,
} from "@/types/contests";

interface InventionListResponse {
  status: number;
  is_success: boolean;
  data: {
    results: InventionContest[];
  };
}

interface TijoratListResponse {
  status: number;
  data: {
    items: TijoratContest[];
  };
}

export function useInventionContests() {
  return useQuery({
    queryKey: ["contests", "ixtiro"],
    queryFn: async (): Promise<ContestCardData[]> => {
      const { data } = await ixtiroApi.get<InventionListResponse>(
        "/contest/contest/list?page_size=100"
      );
      return (data.data?.results ?? []).map((item) => ({
        id: item.id,
        name: item.name,
        image: item.image,
        startDate: item.start_date,
        endDate: item.end_date,
        isActive: item.is_active,
        detailUrl: `${IXTIRO_SITE_URL}/contests/${item.id}`,
      }));
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}

export function useTijoratContests() {
  return useQuery({
    queryKey: ["contests", "tijorat"],
    queryFn: async (): Promise<ContestCardData[]> => {
      const { data } = await tijoratApi.get<TijoratListResponse>("/contest/");
      return (data.data?.items ?? []).map((item) => ({
        id: item.id,
        name: item.name,
        image: item.image,
        startDate: item.start_date,
        endDate: item.end_date,
        isActive: item.is_available,
        detailUrl: `${TIJORAT_SITE_URL}/annoucement/${item.id}`,
      }));
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}
