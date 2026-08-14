import { useEffect, useState } from "react";
import { ArrowRight, Users } from "lucide-react";
import { assetUrl } from "@/lib/assetUrl";
import { FetchInstance } from "@/api/FetchInstance";
import { IResponse, ISpeakerItem } from "@/types";
import { useTranslations } from "@/i18n/useTranslations";
import section from "@/assets/img/section_bg_2.jpg";
import Aos from "aos";
import { useParams } from "react-router-dom";
import { Link } from "@/lib/navigation";
import SpeakerCard from "./SpeakerCard";

/** Bosh sahifada ko'rinadigan spikerlar soni — keng ekranda 5 + 4 */
const LANDING_LIMIT = 10;

const SpeakersSection = () => {
  const t = useTranslations("speakers");
  const lang = useParams<{ locale: string }>().locale || "uz";
  const [data, setData] = useState<ISpeakerItem[]>([]);

  useEffect(() => {
    const getSpeakers = async () => {
      try {
        const res = await FetchInstance<IResponse<ISpeakerItem[]>>(
          `/api/v1.0/speakers/all?&limit=${LANDING_LIMIT}&archive_id=9&lang=${lang}`
        );
        setData(res?.data ?? []);
      } catch (error) {
        console.log(error);
      }
    };
    getSpeakers();
    Aos.init();
  }, [lang]);

  return (
    <div
      className="!w-full"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundImage: `url(${assetUrl(section)})`,
      }}
    >
      <section
        id="team"
        className="team section !bg-transparent transition-colors duration-300 !pt-6 !pb-8"
      >
        {/* Sarlavha — eski uslub */}
        <div className="container section-title !pb-4" data-aos="fade-up">
          {/* <h2 className="!text-black dark:!text-white">{t("INNOWEEK")}</h2> */}
          <div className="text-black dark:!text-gray-300">{t("SPEAKERS")}</div>
        </div>

        <div className="container">
          {/* Kartalar */}
          <div
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            {data.map((item) => (
              <SpeakerCard key={item.id} speaker={item} locale={lang} />
            ))}
          </div>

          {/* Barcha ma'ruzachilar */}
          <div className="mt-10 flex justify-center" data-aos="fade-up">
            <Link href="/spikers">
              <span className="group inline-flex items-center gap-3 rounded-full border border-[#0085d4]/40 bg-white px-7 py-3 text-sm font-semibold !text-[#0085d4] shadow-sm transition-colors duration-300 hover:bg-[#0085d4]/5 dark:bg-gray-800">
                <Users className="h-4 w-4" />
                {t("ALL_SPEAKERS")}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SpeakersSection;
