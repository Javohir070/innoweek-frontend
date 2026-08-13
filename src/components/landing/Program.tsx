import { useTranslations } from "@/i18n/useTranslations";
import { useEffect, useState } from "react";
import {
  CalendarDays,
  ChevronDown,
  Eye,
  FileText,
  Handshake,
  Lightbulb,
  Rocket,
  Users,
} from "lucide-react";
import { FetchInstance } from "@/api/FetchInstance";
import { IProgramEvent, IResponse } from "@/types";
import { useParams } from "react-router-dom";
import StoreEvets, { canRegisterForEvent } from "../shared/StoreEvets";
import { Link } from "@/lib/navigation";

/** Ma'lumotda tadbir turi yo'q — ikonkalar navbat bilan takrorlanadi */
const EVENT_ICONS = [FileText, Users, Rocket, Handshake, Lightbulb];

/** Bugungi sana `YYYY-MM-DD` ko'rinishida (mahalliy vaqt bo'yicha) */
function todayISO(): string {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

export default function ProgramSection() {
  const { locale } = useParams();
  const t = useTranslations("program");
  const [visibleCount, setVisibleCount] = useState(1);
  const [isShowMoreVisible1, setIsShowMoreVisible1] = useState(3);
  const [isShowMoreVisible2, setIsShowMoreVisible2] = useState(3);
  const [isShowMoreVisible3, setIsShowMoreVisible3] = useState(3);
  const [visibleDays1, setVisibleDays1] = useState<IProgramEvent[]>([]);
  const [visibleDays2, setVisibleDays2] = useState<IProgramEvent[]>([]);
  const [visibleDays3, setVisibleDays3] = useState<IProgramEvent[]>([]);

  const programData = [
    {
      day: "day_1",
      date: "2026-10-27",
      events: visibleDays1 || [],
      isShowMoreVisible: isShowMoreVisible1,
      setIsShowMoreVisible: setIsShowMoreVisible1,
    },
    {
      day: "day_2",
      date: "2026-10-28",
      events: visibleDays2 || [],
      isShowMoreVisible: isShowMoreVisible2,
      setIsShowMoreVisible: setIsShowMoreVisible2,
    },
    {
      day: "day_3",
      date: "2026-10-29",
      events: visibleDays3 || [],
      isShowMoreVisible: isShowMoreVisible3,
      setIsShowMoreVisible: setIsShowMoreVisible3,
    },
  ];

  const today = todayISO();

  const handleShowMore = () => {
    if (visibleCount < programData.length) {
      setVisibleCount(visibleCount + 1);
    }
  };

  const getProgramEvents = async (
    date: string,
    setData: React.Dispatch<React.SetStateAction<IProgramEvent[]>>
  ) => {
    try {
      const response = await FetchInstance<IResponse<IProgramEvent[]>>(
        `/api/v1.0/schedules/list?date=${date}&lang=${locale}&archive_id=9`
      );
      setData(response?.data || []);
    } catch (error) {
      console.error("Error fetching program events:", error);
      return [];
    }
  };

  useEffect(() => {
    getProgramEvents("2026-10-27", setVisibleDays1);
    getProgramEvents("2026-10-28", setVisibleDays2);
    getProgramEvents("2026-10-29", setVisibleDays3);
  }, [locale]);

  return (
    <section
      id="resume"
      className="resume section !pt-8 !pb-10 bg-white dark:!bg-[#031119] transition-colors duration-300"
    >
      <div className="container">
        {/* Sarlavha */}
        <div className="mb-10 text-center" data-aos="fade-up">
          <div className="flex items-center justify-center gap-4">
            <span className="h-px w-12 bg-[#0085d4]/40 sm:w-16" />
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0085d4]">
              INNOWEEK
            </span>
            <span className="h-px w-12 bg-[#0085d4]/40 sm:w-16" />
          </div>
          <h2 className="!mt-2 !mb-3 !text-3xl !font-bold !text-[#0b2545] sm:!text-4xl dark:!text-white">
            {t("PROGRAM")}
          </h2>
          <span className="mx-auto block h-[3px] w-14 rounded-full bg-[#0085d4]" />
        </div>

        <div data-aos="fade-up" data-aos-delay="100">
          {programData.map((dayItem) => {
            const events = dayItem.events.slice(0, dayItem.isShowMoreVisible);
            /** Sana kartasi faqat o'sha kun bugun bo'lsa yoritiladi */
            const isActive = dayItem.date === today;

            return (
              <div key={dayItem.day} className="mb-6 last:mb-0">
                <div className="flex flex-col gap-4 lg:flex-row lg:gap-0">
                  {/* Sana kartasi */}
                  <div
                    className={`flex h-[120px] w-[120px] shrink-0 flex-col items-center justify-center rounded-2xl lg:h-[200px] lg:w-[155px] ${
                      isActive
                        ? "bg-gradient-to-b from-[#1d5fd8] to-[#0b3fa8] text-white shadow-lg shadow-[#0b3fa8]/25"
                        : "bg-[#eaf1fb] text-[#1d5fd8] dark:bg-gray-800"
                    }`}
                  >
                    <span className="text-4xl font-bold leading-none lg:text-6xl">
                      {t(`${dayItem.day}_num`)}
                    </span>
                    <span className="mt-1 text-xs font-semibold uppercase tracking-wide lg:mt-2 lg:text-base">
                      {t(`${dayItem.day}_month`)}
                    </span>
                    <CalendarDays className="mt-2 h-5 w-5 opacity-80 lg:mt-4 lg:h-6 lg:w-6" />
                  </div>

                  {/* Timeline chizig'i */}
                  <div className="relative hidden w-12 shrink-0 lg:block">
                    <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[#1d5fd8]/30" />
                  </div>

                  {/* Tadbirlar kartasi */}
                  <div className="min-w-0 flex-1 rounded-2xl bg-white shadow-[0_2px_18px_rgba(11,37,69,0.07)] dark:bg-gray-800">
                    {events.length === 0 && (
                      <p className="m-0 px-6 py-8 text-center text-sm text-gray-400">
                        —
                      </p>
                    )}

                    {events.map((event, eventIdx) => {
                      const Icon = EVENT_ICONS[eventIdx % EVENT_ICONS.length];
                      const registrable = canRegisterForEvent(event.id);

                      return (
                        <div
                          key={event.id ?? eventIdx}
                          className="relative flex flex-col gap-3 border-b border-gray-100 px-5 py-4 last:border-0 sm:flex-row sm:items-center sm:gap-5 dark:border-gray-700"
                        >
                          {/* Timeline nuqtasi */}
                          <span className="absolute -left-[30px] top-1/2 hidden h-3 w-3 -translate-y-1/2 rounded-full border-2 border-[#1d5fd8] bg-white lg:block" />

                          {/* Zal va vaqt */}
                          <div className="w-full shrink-0 sm:w-[130px]">
                            <p className="m-0 text-[13px] font-bold uppercase tracking-wide text-[#0b2545] dark:text-white">
                              {event.address}
                            </p>
                            <p className="m-0 text-[13px] text-gray-400">
                              {event.started_at} – {event.stopped_at}
                            </p>
                          </div>

                          <span className="hidden h-10 w-px shrink-0 bg-gray-100 sm:block dark:bg-gray-700" />

                          {/* Ikonka */}
                          <span className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#1d5fd8]/8 text-[#1d5fd8] sm:flex">
                            <Icon className="h-5 w-5" strokeWidth={1.7} />
                          </span>

                          {/* Sarlavha — o'ralgan, chunki `Link` className'ni
                              o'tkazmaydi (navigation.tsx) */}
                          <div className="min-w-0 flex-1">
                            <Link href={`/program-detail/${event.id}`}>
                              <h3 className="!m-0 !text-base !font-bold !leading-snug !text-[#0b2545] transition-colors hover:!text-[#0085d4] dark:!text-white">
                                {event.title}
                              </h3>
                            </Link>
                          </div>

                          {/* Bitta tugma: yozilish yoki batafsil */}
                          <div className="shrink-0">
                            {registrable ? (
                              <StoreEvets
                                event_data={event}
                                type="default"
                                icon={<FileText className="h-4 w-4" />}
                                className="!flex !h-9 !items-center !gap-2 !rounded-full !border !border-[#1d5fd8]/40 !bg-white !px-4 !text-[13px] !font-medium !text-[#1d5fd8] hover:!bg-[#1d5fd8]/5"
                              />
                            ) : (
                              <Link href={`/program-detail/${event.id}`}>
                                <span className="flex h-9 items-center gap-2 rounded-full border border-[#1d5fd8]/40 bg-white px-4 text-[13px] font-medium !text-[#1d5fd8] transition-colors hover:bg-[#1d5fd8]/5">
                                  <Eye className="h-4 w-4" />
                                  {t("READ_MORE")}
                                </span>
                              </Link>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Ko'proq ko'rish */}
                {dayItem.events.length > dayItem.isShowMoreVisible && (
                  <button
                    type="button"
                    className="mx-auto mt-4 flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-[#0085d4] dark:text-gray-400"
                    onClick={() => {
                      dayItem.setIsShowMoreVisible(dayItem.events.length);
                      handleShowMore();
                    }}
                  >
                    {t("LOAD_MORE")}
                    <span className="flex h-6 w-6 items-center justify-center rounded-full border border-current">
                      <ChevronDown className="h-3.5 w-3.5" />
                    </span>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
