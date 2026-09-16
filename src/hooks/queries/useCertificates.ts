import { useQuery } from "@tanstack/react-query";
import { api } from "@/api/axios";

export interface Certificate {
  id: number;
  file_path: string;
  created_at: string;
  schedule_id: number | null;
  archive_id?: number;
  schedule: {
    id: number;
    title: string;
    date: string;
  } | null;
}

interface CertificateResponse {
  status: number;
  success: boolean;
  data: Certificate[];
}

/** archive_id=8 → InnoWeek 2025, archive_id=9 → InnoWeek 2026 */
export const ARCHIVE_2025 = 8;
export const ARCHIVE_2026 = 9;

async function fetchCertificatesByArchive(
  lang: string,
  archiveId: number
): Promise<Certificate[]> {
  const { data } = await api.get<CertificateResponse>(
    `/api/certificate/check/user?lang=${lang}&archive_id=${archiveId}`
  );
  if (data?.success && Array.isArray(data.data)) {
    return data.data;
  }
  return [];
}

export function useCertificates(lang: string, archiveId: number) {
  return useQuery({
    queryKey: ["certificates", lang, archiveId],
    queryFn: () => fetchCertificatesByArchive(lang, archiveId),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
  });
}
