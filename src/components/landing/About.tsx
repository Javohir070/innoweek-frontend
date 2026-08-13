import { useState } from "react";
import {
  ArrowRight,
  Bot,
  Building2,
  Dna,
  GraduationCap,
  Leaf,
  Lightbulb,
} from "lucide-react";
import exchange_10 from "@/assets/img/portfolio/exchange_10.jpg";
import exchange_11 from "@/assets/img/portfolio/exchange_11.jpg";
import AppImage from "@/lib/AppImage";
import { useTranslations } from "@/i18n/useTranslations";

export default function AboutSection() {
  const t = useTranslations("about");
  const [expanded, setExpanded] = useState(false);

  const features = [
    { key: "features_1", Icon: Lightbulb },
    { key: "features_2", Icon: Dna },
    { key: "features_3", Icon: GraduationCap },
    { key: "features_4", Icon: Leaf },
    { key: "features_5", Icon: Building2 },
    { key: "features_6", Icon: Bot },
  ];

  const renderFeature = ({
    key,
    Icon,
  }: {
    key: string;
    Icon: typeof Lightbulb;
  }) => (
    <div key={key} className="flex items-center gap-4">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#0085d4]/10 text-[#0085d4] dark:bg-[#0085d4]/20">
        <Icon className="h-6 w-6" strokeWidth={1.8} />
      </span>
      <p className="m-0 text-sm font-medium leading-snug text-gray-800 dark:text-gray-200">
        {t(key)}
      </p>
    </div>
  );

  return (
    <section
      id="about"
      className="about section relative overflow-hidden !bg-[#f6f9ff] transition-colors duration-300 dark:!bg-gray-900 !pt-8 !pb-20"
    >
      <div className="container relative z-10">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Chap ustun — matn */}
          <div className="lg:col-span-5" data-aos="fade-up">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0085d4]">
              INNOWEEK 2026
            </span>
            <span className="mt-2 block h-[3px] w-14 rounded-full bg-[#0085d4]" />

            <h2 className="!mt-6 !mb-0 !text-3xl !font-bold !leading-[1.15] !text-[#0b2545] sm:!text-4xl lg:!text-[2.6rem] dark:!text-white">
              {t("title")}
            </h2>

            <p
              className={`!mt-6 !mb-0 !text-base !leading-relaxed !text-gray-600 dark:!text-gray-300 ${
                expanded ? "" : "line-clamp-4"
              }`}
            >
              {t("description")}
            </p>

            <button
              type="button"
              onClick={() => setExpanded((prev) => !prev)}
              aria-expanded={expanded}
              className="group mt-8 inline-flex items-center gap-3 rounded-xl bg-[#0085d4] px-6 py-3 text-sm font-semibold uppercase tracking-wide !text-white shadow-lg shadow-[#0085d4]/25 transition-all duration-300 hover:bg-[#006eb3] hover:shadow-xl"
            >
              {expanded ? t("less") : t("more")}
              <ArrowRight
                className={`h-4 w-4 transition-transform duration-300 ${
                  expanded ? "-rotate-90" : "group-hover:translate-x-1"
                }`}
              />
            </button>
          </div>

          {/* O'ng ustun — rasmlar */}
          <div className="lg:col-span-7" data-aos="fade-up" data-aos-delay="200">
            <div className="relative">
              <AppImage
                src={exchange_11}
                alt="INNOWEEK"
                className="w-full rounded-3xl object-cover shadow-2xl h-[260px] sm:h-[340px] lg:h-[520px]"
              />
              <div className="absolute -bottom-8 left-4 z-30 w-[42%] max-w-[240px] sm:left-8 lg:left-[14%]">
                <AppImage
                  src={exchange_10}
                  alt="INNOWEEK"
                  className="w-full rounded-2xl border-4 border-white object-cover shadow-xl h-[110px] sm:h-[150px] dark:border-gray-800"
                />
              </div>
              {/* Bezak nuqtalar */}
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-10 -right-8 hidden h-28 w-36 lg:block"
                style={{
                  backgroundImage:
                    "radial-gradient(#0085d4 1.5px, transparent 1.5px)",
                  backgroundSize: "12px 12px",
                  opacity: 0.35,
                }}
              />
            </div>
          </div>
        </div>

        {/* Yo'nalishlar kartasi */}
        <div
          className={`relative z-20 mt-20 lg:max-w-[64%] ${
            // Matn ochilganda chap ustun uzayadi — karta tugmani yopib qo'ymasligi uchun
            // ustma-ust joylashuv faqat yopiq holatda va keng ekranda qo'llanadi
            expanded ? "" : "xl:-mt-10"
          }`}
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <div className="rounded-3xl bg-white p-6 shadow-xl shadow-[#0b2545]/5 sm:p-8 lg:pr-[34%] dark:bg-gray-800">
            <div className="grid gap-6 sm:grid-cols-2 sm:gap-x-8">
              <div className="space-y-6">{features.slice(0, 3).map(renderFeature)}</div>
              <div className="space-y-6 sm:border-l sm:border-gray-200 sm:pl-8 dark:sm:border-gray-700">
                {features.slice(3).map(renderFeature)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
