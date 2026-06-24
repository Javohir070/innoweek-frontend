import AppImage from "@/lib/AppImage";
import { formatContestDate } from "@/lib/formatDate";
import type { ContestCardData } from "@/types/contests";
import { useTranslations } from "@/i18n/useTranslations";
import { ArrowUpRight } from "lucide-react";
import CountdownTimer, { isContestEnded } from "./CountdownTimer";

type Props = {
  contest: ContestCardData;
};

export default function ContestCard({ contest }: Props) {
  const t = useTranslations("contests");
  const ended = isContestEnded(contest.endDate);
  const isActive = contest.isActive && !ended;

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-md transition-shadow hover:shadow-lg">
      <div className="relative h-52 w-full overflow-hidden">
        <AppImage
          src={contest.image}
          alt={contest.name}
          className="h-full w-full object-cover"
        />
        {!ended && <CountdownTimer endDate={contest.endDate} />}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-3">
        <h3 className="!text-base md:!text-lg xl:!text-xl font-bold leading-snug text-gray-900 line-clamp-3">
          {contest.name}
        </h3>

        <div className="mt-auto flex items-end justify-between gap-3">
          <div
            className={`rounded-lg px-2 py-1 text-xs leading-relaxed ${
              isActive
                ? "bg-green-50 text-green-700"
                : "bg-red-50 text-red-600"
            }`}
          >
            <p className="m-1">
              <span className="font-semibold m-0">{t("start_date")}: </span>
              {formatContestDate(contest.startDate)}
            </p>
            <p className="m-0">
              <span className="font-semibold">
                {isActive ? t("end_date") : t("ended_date")}:{" "}
              </span>
              {formatContestDate(contest.endDate)}
            </p>
          </div>

          <a
            href={contest.detailUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-[#0085d4] hover:text-white"
            aria-label={t("open_contest")}
          >
            <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
    </article>
  );
}
