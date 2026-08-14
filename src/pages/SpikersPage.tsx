import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { assetUrl } from "@/lib/assetUrl";
import { FetchInstance } from "@/api/FetchInstance";
import { IResponse, ISpeakerItem } from "@/types";
import { useTranslations } from "@/i18n/useTranslations";
import section from "@/assets/img/section_bg_2.jpg";
import { useParams } from "react-router-dom";
import SpeakerCard from "@/components/landing/SpeakerCard";

/** Sahifa ochilganda ko'rinadigan son; «Ko'proq ko'rish» shuncha qo'shadi */
const PAGE_STEP = 10;

export default function SpikersPage() {
  const t = useTranslations("speakers");
  const lang = useParams<{ locale: string }>().locale || "uz";
  const [data, setData] = useState<ISpeakerItem[]>([]);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(PAGE_STEP);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSpeakers = async () => {
      setLoading(true);
      try {
        const res = await FetchInstance<IResponse<ISpeakerItem[]>>(
          `/api/v1.0/speakers/all?&limit=${limit}&archive_id=9&lang=${lang}`
        );
        setData(res?.data ?? []);
        setTotal(res?.pagination?.total ?? 0);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getSpeakers();
  }, [lang, limit]);

  return (
    <div
      className="!w-full"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundImage: `url(${assetUrl(section)})`,
      }}
    >
      <section className="!bg-transparent !pt-36 pb-16 min-h-[80vh]">
        <div className="container">
          {/* Sarlavha */}
          <div className="mb-10 text-center">
            <div className="flex items-center justify-center gap-4">
              <span className="h-px w-10 bg-[#0085d4]/40 sm:w-14" />
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0085d4]">
                INNOWEEK
              </span>
              <span className="h-px w-10 bg-[#0085d4]/40 sm:w-14" />
            </div>
            <h1 className="!mt-2 !mb-3 !text-3xl !font-bold !text-[#0b2545] sm:!text-4xl dark:!text-white">
              {t("SPEAKERS")}
            </h1>
            <p className="mx-auto !mb-0 max-w-[560px] !text-[15px] !leading-relaxed !text-gray-500 dark:!text-gray-400">
              {t("subtitle")}
            </p>
          </div>

          {/* Kartalar */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {data.map((item) => (
              <SpeakerCard key={item.id} speaker={item} locale={lang} />
            ))}
          </div>

          {loading && data.length === 0 && (
            <div className="flex min-h-[200px] items-center justify-center">
              <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#0085d4] border-t-transparent" />
            </div>
          )}

          {/* Ko'proq ko'rish */}
          {data.length < total && (
            <div className="mt-10 flex justify-center">
              <button
                type="button"
                disabled={loading}
                onClick={() => setLimit((prev) => prev + PAGE_STEP)}
                className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-[#0085d4] disabled:opacity-50 dark:text-gray-400"
              >
                {t("LOAD_MORE")}
                <span className="flex h-6 w-6 items-center justify-center rounded-full border border-current">
                  <ChevronDown className="h-3.5 w-3.5" />
                </span>
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
