import { useEffect, useState, useRef } from "react";
import { assetUrl } from "@/lib/assetUrl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import AppImage from "@/lib/AppImage";
import { ArrowRight, Calendar } from "lucide-react";
import { BASE_URL, FetchInstance } from "@/api/FetchInstance";
import { useParams } from "react-router-dom";
import { INewsListItem, IResponse } from "@/types";
import { useTranslations } from "@/i18n/useTranslations";
import { Link } from "@/lib/navigation";
import section from "@/assets/img/section_bg_2.jpg";
import { SliderDots, SliderNav } from "@/components/ui/SliderNav";

/** Karta chap panelining rangi — dizayndagi to'q ko'k */
const CARD_COLOR = "#1057cf";

/** Tavsifdagi HTML teglarni olib tashlash */
const stripTags = (html?: string) =>
  (html ?? "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

export default function NewsSection() {
  const t = useTranslations("news");
  const params = useParams();
  const [data, setData] = useState<INewsListItem[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const getNews = async () => {
      try {
        const res = await FetchInstance<IResponse<INewsListItem[]>>(
          `/api/v1.0/news/all?limit=5&lang=${params?.locale}&archive_id=9`
        );
        setData(res?.data);
      } catch (error) {
        console.log(error);
      }
    };
    getNews();
  }, [params?.locale]);

  const swiperRef = useRef<any>(null);

  useEffect(() => {
    if (swiperRef.current && swiperRef.current.autoplay) {
      swiperRef.current.autoplay.start();
    }
  }, [data]);

  return (
    <div
      className={`!w-full pt-10 pb-6`}
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundImage: `url(${assetUrl(section)})`,
      }}
    >
      <section
        id="portfolio"
        className="testimonials !bg-transparent dark:bg-gray-900 transition-colors duration-300 pt-2 !p-0"
      >
        {/* Sarlavha + «Barcha yangiliklar» tugmasi */}
        <div className="container !pb-6" data-aos="fade-up">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="section-title !pb-0">
              <h2 className="!mb-3 !leading-none text-black dark:!text-white">
                  {t("INNOWEEK")}
                </h2>
              <div className="text-black dark:!text-gray-300">
                {t("Latest News")}
              </div>
            </div>

            <Link href="/news">
              <span className="group inline-flex items-center gap-3 rounded-lg border border-[#0085d4]/40 bg-white px-6 py-3 text-xs font-semibold uppercase tracking-wide !text-[#0b57d0] shadow-sm transition-colors duration-300 hover:bg-[#0085d4]/5 dark:border-gray-600 dark:bg-gray-800 dark:!text-white">
                {t("all_news")}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
          </div>
        </div>

        <div className="container m-auto" data-aos="fade-up" data-aos-delay="100">
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            key={data.length}
            modules={[Navigation, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            speed={800}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            className="testimonials-slider !pb-0"
          >
            {data.map((item) => (
              <SwiperSlide key={item.id}>
                <Link href={`/news/${item?.id}`}>
                  <div className="group relative overflow-hidden rounded-3xl shadow-[0_24px_60px_-30px_rgba(12,45,110,0.55)] transition-all duration-300 hover:shadow-[0_30px_70px_-28px_rgba(12,45,110,0.65)]">
                    {/* Mobil: rasm yuqorida */}
                    <div className="lg:hidden">
                      <AppImage
                        src={
                          item?.poster
                            ? `${BASE_URL}/upload/news/${item?.poster}_big_720.png`
                            : `${BASE_URL}/upload/news/${item?.image}_big_720.png`
                        }
                        className="!h-[220px] !w-full object-cover"
                        alt={item?.title}
                        width={720}
                        height={220}
                      />
                    </div>

                    <div className="relative lg:min-h-[420px]">
                      {/* Desktop: rasm o'ng tomonda */}
                      <div className="absolute inset-y-0 right-0 hidden w-[55%] lg:block">
                        <AppImage
                          src={
                            item?.poster
                              ? `${BASE_URL}/upload/news/${item?.poster}_big_720.png`
                              : `${BASE_URL}/upload/news/${item?.image}_big_720.png`
                          }
                          className="!h-full !w-full object-cover"
                          alt={item?.title}
                          width={720}
                          height={420}
                        />
                      </div>

                      {/* Chap ko'k panel */}
                      <div
                        className="relative z-10 flex flex-col justify-center gap-5 p-7 sm:p-10 lg:min-h-[420px] lg:w-[62%] lg:pr-24 lg:[clip-path:polygon(0%_0%,100%_0%,86%_100%,0%_100%)] dark:!bg-gray-800"
                        style={{ backgroundColor: CARD_COLOR }}
                      >
                        <span className="inline-flex w-fit items-center rounded-full bg-white/20 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-white">
                          {t("INNOWEEK")}
                        </span>

                        <h2 className="!mb-0 !text-2xl !font-bold !leading-snug !text-white line-clamp-3 sm:!text-3xl dark:!text-white">
                          {item?.title}
                        </h2>

                        {stripTags(item?.description) && (
                          <p className="!mb-0 max-w-[520px] text-[15px] leading-relaxed text-white/85 line-clamp-3">
                            {stripTags(item?.description)}
                          </p>
                        )}

                        <div className="mt-1 flex flex-wrap items-center gap-x-8 gap-y-4">
                          <span className="inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-semibold !text-[#0b57d0] transition-transform duration-300 group-hover:translate-x-1">
                            {t("more")}
                            <ArrowRight className="h-4 w-4" />
                          </span>

                          {item?.created_at && (
                            <span className="inline-flex items-center gap-2 text-sm text-white/85">
                              <Calendar className="h-4 w-4" />
                              {String(item.created_at).slice(0, 10)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigatsiya: strelkalar + nuqtalar */}
          {data.length > 1 && (
            <SliderNav
              onPrev={() => swiperRef.current?.slidePrev()}
              onNext={() => swiperRef.current?.slideNext()}
            >
              <SliderDots
                count={data.length}
                activeIndex={activeIndex}
                onSelect={(index) => swiperRef.current?.slideToLoop(index)}
              />
            </SliderNav>
          )}
        </div>
      </section>
    </div>
  );
}
