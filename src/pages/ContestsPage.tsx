import { useMemo } from "react";
import ContestCard from "@/components/contests/ContestCard";
import { isContestEnded } from "@/components/contests/CountdownTimer";
import {
  useInventionContests,
  useTijoratContests,
} from "@/hooks/queries/useContests";
import { useTranslations } from "@/i18n/useTranslations";
import type { ContestCardData } from "@/types/contests";

function isContestActive(contest: ContestCardData): boolean {
  return contest.isActive && !isContestEnded(contest.endDate);
}

export default function ContestsPage() {
  const t = useTranslations("contests");
  const invention = useInventionContests();
  const tijorat = useTijoratContests();

  const loading = invention.isLoading || tijorat.isLoading;
  const error = invention.isError && tijorat.isError;

  const contests = useMemo(() => {
    const merged = [...(invention.data ?? []), ...(tijorat.data ?? [])];
    return merged.sort((a, b) => {
      const aActive = isContestActive(a) ? 0 : 1;
      const bActive = isContestActive(b) ? 0 : 1;
      if (aActive !== bActive) return aActive - bActive;
      return (
        new Date(b.endDate).getTime() - new Date(a.endDate).getTime()
      );
    });
  }, [invention.data, tijorat.data]);

  return (
    <section
      id="portfolio"
      className="testimonials section-light-background bg-transparent min-h-[85vh]"
    >
      <div className="container section-title mt-5 pb-4 !px-8">
        <h2 className="text-black dark:!text-white">INNOWEEK</h2>
        <div className="text-black dark:!text-white">{t("page_title")}</div>
      </div>

      <div className="container mx-auto px-4 pb-14">
        {loading ? (
          <div className="flex min-h-[200px] items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#0085d4] border-t-transparent" />
          </div>
        ) : error ? (
          <p className="rounded-xl bg-red-50 px-4 py-6 text-center text-red-600">
            {t("load_error")}
          </p>
        ) : !contests.length ? (
          <p className="rounded-xl bg-white px-4 py-6 text-center text-gray-500">
            {t("empty")}
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {contests.map((contest) => (
              <ContestCard key={contest.key} contest={contest} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
