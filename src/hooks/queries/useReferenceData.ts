import { useQuery } from "@tanstack/react-query";
import { api } from "@/api/axios";
import type { ICountryItem, IProfessionItem, IResponse } from "@/types";

export function useProfessions(locale: string) {
  return useQuery({
    queryKey: ["professions", locale],
    queryFn: async () => {
      const { data } = await api.get<IResponse<IProfessionItem[]>>(
        `/api/v1.0/profession/list?lang=${locale}`
      );
      return data;
    },
  });
}

export function useCountries(locale: string) {
  return useQuery({
    queryKey: ["countries", locale],
    queryFn: async () => {
      const { data } = await api.get<IResponse<ICountryItem[]>>(
        `/api/v1.0/json/countries?lang=${locale}`
      );
      return data;
    },
  });
}
