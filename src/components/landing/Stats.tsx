import {
  Flag,
  ListChecks,
  MapPin,
  Newspaper,
  UserCheck,
  Users,
} from "lucide-react";
import { useTranslations } from "@/i18n/useTranslations";
import { useRef } from "react";
import section from "@/assets/img/section_bg_2.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { assetUrl } from "@/lib/assetUrl";
import { SliderNav } from "@/components/ui/SliderNav";

/* ─── Halqa geometriyasi (viewBox 100×100, markaz 50,50) ───────────────
   Yoy nuqtadan boshlanadi, asta ingichkalashadi va 5 ta kichik
   nuqtacha bilan tugaydi. SVG `stroke` ingichkalasha olmagani uchun
   yoy to'ldirilgan lenta (path) sifatida hisoblanadi.                    */
const RING_RADIUS = 46;
const ARC_START_DEG = -90; // tepadan boshlanadi
const ARC_SWEEP_DEG = 200;
const ARC_WIDTH_START = 2.8;
const ARC_WIDTH_END = 0.7;

function polar(deg: number, r: number) {
  const a = (deg * Math.PI) / 180;
  return { x: 50 + r * Math.cos(a), y: 50 + r * Math.sin(a) };
}

/** Kengligi boshidan oxirigacha toraygan yoy — to'ldirilgan kontur */
function taperedArcPath(steps = 64): string {
  const outer: string[] = [];
  const inner: string[] = [];

  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const deg = ARC_START_DEG + ARC_SWEEP_DEG * t;
    const w = ARC_WIDTH_START + (ARC_WIDTH_END - ARC_WIDTH_START) * t;
    const o = polar(deg, RING_RADIUS + w / 2);
    const n = polar(deg, RING_RADIUS - w / 2);
    outer.push(`${o.x.toFixed(2)},${o.y.toFixed(2)}`);
    inner.push(`${n.x.toFixed(2)},${n.y.toFixed(2)}`);
  }

  return `M${outer.join("L")}L${inner.reverse().join("L")}Z`;
}

const ARC_PATH = taperedArcPath();
const ARC_HEAD = polar(ARC_START_DEG, RING_RADIUS);

/** Yoydan keyingi 5 ta kichrayib boruvchi nuqtacha — yoy oxirining
    qalinligidan boshlanadi, shunda bo'g'inda sakrash bo'lmaydi */
const TRAIL_DOTS = [0, 1, 2, 3, 4].map((i) => {
  const { x, y } = polar(
    ARC_START_DEG + ARC_SWEEP_DEG + 5.5 + i * 6.5,
    RING_RADIUS
  );
  return { x, y, r: 0.85 - i * 0.12, opacity: 0.8 - i * 0.12 };
});

export default function StatsSection() {
  const t = useTranslations("stats");

  const swiperRef = useRef<any>(null);

  // `description` hozircha ko'rsatilmaydi (dizayn bo'yicha), lekin keyin
  // qaytarish uchun ma'lumotda saqlanadi.
  const stats = [
    {
      value: "15 000 m²",
      title: t("stats_1_title"),
      description: t("stats_1_description"),
      Icon: MapPin,
      ringSpeed: 9,
    },
    {
      value: "1200+",
      title: t("stats_2_title"),
      description: t("stats_2_description"),
      Icon: Users,
      ringSpeed: 11,
    },
    {
      value: "1000+",
      title: t("stats_3_title"),
      description: t("stats_3_description"),
      Icon: ListChecks,
      ringSpeed: 8,
    },
    {
      value: "15000+",
      title: t("stats_4_title"),
      description: t("stats_4_description"),
      Icon: UserCheck,
      ringSpeed: 12,
    },
    {
      value: "20+",
      title: t("stats_5_title"),
      description: t("stats_5_description"),
      Icon: Flag,
      ringSpeed: 10,
    },
    {
      value: "50+",
      title: t("stats_6_title"),
      description: t("stats_6_description"),
      Icon: Newspaper,
      ringSpeed: 13,
    },
  ];

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
        className="relative bg-transparent !pt-8 !pb-8 px-4 md:px-10"
        id="stats"
      >
        <div className="container">
          {/* Sarlavha bloki */}
          <div className="mb-12 lg:mb-14" data-aos="fade-up">
            {/* <div className="flex items-center gap-4">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0b2545] dark:text-white">
                INNOWEEK
              </span>
              <span className="h-[2px] w-24 rounded-full bg-[#0085d4]" />
            </div> */}
            <h2 className="!mt-3 !mb-1 !text-3xl !font-bold !text-[#0b2545] sm:!text-4xl dark:!text-white">
              {t("COVERAGE")}
            </h2>
            <p className="!m-0 !text-base !text-gray-500 dark:!text-gray-400">
              {t("subtitle")}
            </p>
          </div>

          <div data-aos="fade-up" data-aos-delay="100">
            <Swiper
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              key={stats.length}
              modules={[Autoplay]}
              spaceBetween={24}
              slidesPerView={1}
              loop={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              speed={800}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4 },
                1536: { slidesPerView: 5 },
              }}
              className="!pb-2"
            >
              {stats.map(({ value, title, Icon, ringSpeed }) => (
                <SwiperSlide key={title}>
                  <div className="flex justify-center py-4">
                    <div className="relative aspect-square w-full max-w-[240px]">
                      {/* Doimiy och halqa */}
                      <svg
                        viewBox="0 0 100 100"
                        className="absolute inset-0 h-full w-full"
                        aria-hidden
                      >
                        <circle
                          cx="50"
                          cy="50"
                          r={RING_RADIUS}
                          fill="none"
                          stroke="#dbe4f0"
                          strokeWidth="1"
                        />
                      </svg>

                      {/* Aylanib turuvchi ko'k yoy */}
                      <svg
                        viewBox="0 0 100 100"
                        className="absolute inset-0 h-full w-full animate-spin motion-reduce:animate-none"
                        style={{
                          animationDuration: `${ringSpeed}s`,
                          // Qalin nuqta oldinda ketishi uchun teskari aylanadi
                          animationDirection: "reverse",
                        }}
                        aria-hidden
                      >
                        {/* Ingichkalashib boruvchi yoy */}
                        <path d={ARC_PATH} fill="#0085d4" />
                        {/* Yoy boshidagi nuqta */}
                        <circle
                          cx={ARC_HEAD.x}
                          cy={ARC_HEAD.y}
                          r="3.2"
                          fill="#0085d4"
                        />
                        {/* Yoy oxiridagi 5 ta kichrayuvchi nuqtacha */}
                        {TRAIL_DOTS.map((dot, i) => (
                          <circle
                            key={i}
                            cx={dot.x}
                            cy={dot.y}
                            r={dot.r}
                            fill="#0085d4"
                            opacity={dot.opacity}
                          />
                        ))}
                      </svg>

                      {/* Ichki qism */}
                      <div className="absolute inset-[8%] flex flex-col items-center justify-center rounded-full bg-white/75 px-6 text-center backdrop-blur-sm dark:bg-gray-800/80">
                        <span className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#0085d4]/10 text-[#0085d4] dark:bg-[#0085d4]/20">
                          <Icon className="h-7 w-7" strokeWidth={1.6} />
                        </span>
                        <span className="text-2xl font-bold leading-tight text-[#0085d4] sm:text-3xl">
                          {value}
                        </span>
                        <span className="mt-2 text-sm font-medium leading-snug text-gray-700 dark:text-gray-200">
                          {title}
                        </span>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Navigatsiya tugmalari */}
            <SliderNav
              onPrev={() => swiperRef.current?.slidePrev()}
              onNext={() => swiperRef.current?.slideNext()}
              className="!mt-6"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
