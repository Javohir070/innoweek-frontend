import { useQuery } from "@tanstack/react-query";
import {
  internshipApi,
  ixtiroApi,
  tijoratApi,
  INTERNSHIP_MEDIA_URL,
  INTERNSHIP_SITE_URL,
  IXTIRO_SITE_URL,
  TIJORAT_SITE_URL,
} from "@/api/contestApi";
import type {
  ContestCardData,
  InternshipContest,
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

interface InternshipListResponse {
  results: InternshipContest[];
}

function internshipImageUrl(path: string): string {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${INTERNSHIP_MEDIA_URL}${path.startsWith("/") ? path : `/${path}`}`;
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
        key: `ixtiro-${item.id}`,
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
        key: `tijorat-${item.id}`,
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

export function useInternshipContests() {
  return useQuery({
    queryKey: ["contests", "internship"],
    queryFn: async (): Promise<ContestCardData[]> => {
      const { data } = await internshipApi.get<InternshipListResponse>(
        "/contest/list/?page=1&page_size=100"
      );
      const now = Date.now();

      return (data.results ?? []).map((item) => {
        const endMs = new Date(item.end_date).getTime();
        return {
          id: item.id,
          key: `internship-${item.id}`,
          name: item.name,
          image: internshipImageUrl(item.image),
          startDate: item.start_date,
          endDate: item.end_date,
          isActive: endMs > now,
          detailUrl: `${INTERNSHIP_SITE_URL}/contest/${item.id}`,
        };
      });
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}
