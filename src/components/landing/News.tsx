"use client";
import { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BASE_URL, FetchInstance } from "@/api/FetchInstance";
import { useParams } from "next/navigation";
import { INewsListItem, IResponse } from "@/types";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import section from "@/assets/img/section_bg_2.jpg";

export default function NewsSection() {
  const t = useTranslations("news");
  const params = useParams();
  const [data, setData] = useState<INewsListItem[]>([]);

  useEffect(() => {
    const getNews = async () => {
      try {
        const res = await FetchInstance<IResponse<INewsListItem[]>>(
          `/api/v1.0/news/all?limit=5&lang=${params?.locale}&archive_id=8`
        );
        setData(res?.data);
      } catch (error) {
        console.log(error);
      }
    };
    getNews();
  }, [params?.locale]);

  const prevRef = useRef(null);
  const nextRef = useRef(null);
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
        backgroundImage: `url(${section.src})`,
      }}
    >
      <section
        id="portfolio"
        className="testimonials !bg-transparent dark:bg-gray-900 transition-colors duration-300 pt-2 !p-0"
      >
        <div className="container section-title pb-4" data-aos="fade-up">
          <h2 className="text-black dark:!text-white py-1">INNOWEEK</h2>
          <div className="text-black dark:!text-gray-300">
            {t("Latest News")}
          </div>
        </div>

        <div
          className="container m-auto !px-0"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            key={data.length} // <-- yangi key
            modules={[Navigation, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 3000, // Changed to 2 seconds (2000ms)
              disableOnInteraction: false, // Continue autoplay after user interaction
              pauseOnMouseEnter: true, // Pause on hover
            }}
            speed={800} // Smooth transition speed
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onInit={(swiper) => {
              if (
                typeof swiper.params.navigation === "object" &&
                swiper.params.navigation
              ) {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
                swiper.navigation.init();
                swiper.navigation.update();
              }
            }}
            className="testimonials-slider !pb-5"
          >
            {data.map((item) => (
              <SwiperSlide key={item.id}>
                <Link href={`/news/${item?.id}`}>
                  <div className="testimonial-item hover:cursor-pointer !h-wull !bg-[#0085d4] dark:!bg-gray-800 m-3  rounded-lg shadow dark:shadow-gray-700/50 transition-all duration-300 hover:scale-[1.01] flex !min-h-[100px]">
                    <div className="flex flex-col  lg:flex-row  gap-5  w-full h-full  lg:h-[400px] overflow-hidden">
                      <div className="flex flex-col gap-y-3.5 w-full lg:w-[55%] overflow-hidden">
                        <h2 className="!text-white dark:!text-white">
                          {item?.title}
                        </h2>
                        <div
                          className="line-clamp-9 !text-white dark:!text-gray-300 !font-normal not-italic !font-nunito-sans *:!font-nunito-sans"
                          dangerouslySetInnerHTML={{
                            __html: item?.description,
                          }}
                        ></div>
                      </div>
                      <div className="flex -mt-5 items-center w-full lg:w-[45%]">
                        <div className="featured-img-wrapper rounded-lg overflow-hidden w-full h-full">
                          <Image
                            src={
                              item?.poster
                                ? `${BASE_URL}/upload/news/${item?.poster}_big_720.png`
                                : `${BASE_URL}/upload/news/${item?.image}_big_720.png`
                            }
                            className="featured-img !w-full object-cover !h-[400px]"
                            alt={item?.title}
                            width={400}
                            height={400}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}

            {/* Navigation buttons */}
            <div className="w-100 d-flex align-items-center justify-center gap-4">
              <button
                ref={prevRef}
                className="bg-[#0085d4] dark:bg-gray-700 hover:bg-black dark:hover:bg-amber-600 text-white !rounded-full w-12 h-12 flex items-center justify-center text-2xl transition-colors duration-300"
              >
                <ChevronLeft />
              </button>
              <button
                ref={nextRef}
                className="bg-[#0085d4] dark:bg-gray-700 hover:bg-black dark:hover:bg-amber-600 text-white !rounded-full w-12 h-12 flex items-center justify-center text-2xl transition-colors duration-300"
              >
                <ChevronRight />
              </button>
            </div>
          </Swiper>
        </div>
      </section>
    </div>
  );
}
