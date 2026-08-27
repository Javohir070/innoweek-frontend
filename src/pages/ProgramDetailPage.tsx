import { useParams } from "react-router-dom";
import { assetUrl } from "@/lib/assetUrl";
import section from "@/assets/img/section_bg_2.jpg";
import { useTranslations } from "@/i18n/useTranslations";
import { FetchInstance } from "@/api/FetchInstance";
import { useEffect, useState, useCallback } from "react";
import {
  IProgramDetail,
  IProgramDetailResponse,
  IProgramSpeaker,
  ISpeakerItem,
} from "@/types";
import { UserRound } from "lucide-react";
import SpeakerCard from "@/components/landing/SpeakerCard";
import AboutTimeline from "@/components/AboutTimeline/AboutTimeline";
import StoreEvets from "@/components/shared/StoreEvets";

/**
 * Dastur spikeri (tilga bo'lingan maydonlar) → bosh sahifadagi
 * `SpeakerCard` kutadigan ko'rinishga o'tkazish.
 */
function toSpeakerCardItem(
  person: IProgramSpeaker,
  lang?: string
): ISpeakerItem {
  const fullName =
    lang === "ru"
      ? person.full_name_ru
      : lang === "en"
        ? person.full_name_en
        : person.full_name_uz;
  const job =
    lang === "ru" ? person.job_ru : lang === "en" ? person.job_en : person.job_uz;

  return {
    id: person.id,
    full_name: fullName,
    position: job,
    image: person.image,
    country_id: person.country_id,
    type: person.type,
    created_at: person.created_at,
    // Dastur API'si to'liq davlat obyektini qaytarmaydi — bayroq `country_id`
    // bo'yicha aniqlanadi.
    country: null,
  };
}

/** Ma'lumot yo'q holati — bo'sh kadr o'rniga ixcham va tartibli blok */
function EmptyPeople({ title, text }: { title: string; text: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-[#0085d4]/30 bg-white/70 px-6 py-10 text-center dark:border-gray-600 dark:bg-gray-800/60">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0085d4]/10 text-[#0085d4] dark:bg-[#0085d4]/20">
        <UserRound className="h-6 w-6" strokeWidth={1.6} />
      </span>
      <h4 className="!m-0 !text-base !font-semibold !text-[#0b2545] dark:!text-white">
        {title}
      </h4>
      <p className="!m-0 !text-sm !text-gray-500 dark:!text-gray-400">{text}</p>
    </div>
  );
}

/** Moderatorlar / spikerlar bo'limi — bosh sahifadagi karta uslubida */
function PeopleSection({
  eyebrow,
  title,
  people,
  lang,
  emptyTitle,
  emptyText,
}: {
  eyebrow: string;
  title: string;
  people: IProgramSpeaker[];
  lang?: string;
  emptyTitle: string;
  emptyText: string;
}) {
  return (
    <div className="container">
      <div className="section-title !pb-4">
        <h2 className="!mb-3 !leading-none text-black dark:!text-white">
          {eyebrow}
        </h2>
        <div className="text-black dark:!text-gray-300">{title}</div>
      </div>

      {people.length > 0 ? (
        <div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          {people.map((person) => (
            <SpeakerCard
              key={person.id}
              speaker={toSpeakerCardItem(person, lang)}
              locale={lang || "uz"}
            />
          ))}
        </div>
      ) : (
        <EmptyPeople title={emptyTitle} text={emptyText} />
      )}
    </div>
  );
}

export default function ProgramDetailPage() {
  const params = useParams();
  const lang = params?.locale;
  const t = useTranslations("program-detail");

  const [data, setData] = useState<IProgramDetail | null>(null);
  const [loading, setLoading] = useState(true);

  const getDetail = useCallback(async () => {
    try {
      setLoading(true);
      const res: IProgramDetailResponse = await FetchInstance(
        `/api/v1.0/schedules/${params?.programId}/list?lang=${params?.locale}`
      );
      setData(res?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [params?.programId, params?.locale]);

  useEffect(() => {
    getDetail();
  }, [getDetail]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {t("no_data_found")}
          </h2>
          <p className="text-gray-600">{t("no_program_info")}</p>
        </div>
      </div>
    );
  }

  return (
    <section
      id="program-detail"
      className="team section !bg-transparent transition-colors duration-300"
    >
      <AboutTimeline data={data} />
      <div className="flex justify-center">
        <StoreEvets event_data={data?.schedule} size="large" />
      </div>

      <div
        className="!w-full mt-10 py-5"
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundImage: `url(${assetUrl(section)})`,
        }}
      >
        <div className="mb-12">
          <PeopleSection
            eyebrow={t("INNOWEEK")}
            title={t("moderator")}
            people={data?.moderators ?? []}
            lang={lang}
            emptyTitle={t("no_moderator_data")}
            emptyText={t("no_moderators_added")}
          />
        </div>

        <PeopleSection
          eyebrow={t("INNOWEEK")}
          title={t("SPEAKERS")}
          people={data?.speakers ?? []}
          lang={lang}
          emptyTitle={t("no_speaker_data")}
          emptyText={t("no_speakers_added")}
        />
      </div>
    </section>
  );
}
