"use client";
import {
  ChevronLeft,
  ChevronRight,
  Globe2Icon,
  Image as Icon,
  ListChecks,
  Map,
  UserCheckIcon,
  Users,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useState, useRef } from "react";
import section from "@/assets/img/section_bg_2.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import { BASE_URL } from "@/api/FetchInstance";

export default function StatsSection() {
  const t = useTranslations("stats");

  const [currentLang] = useState("uz");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<any>(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const stats = [
    {
      value: "15 000 m2",
      title: t("stats_1_title"),
      description: t("stats_1_description"),
      icon: <Map className="text-white" />,
    },
    {
      value: "1200+",
      title: t("stats_2_title"),
      description: t("stats_2_description"),
      icon: <Users className="text-white" />,
    },
    {
      value: "1000+",
      title: t("stats_3_title"),
      description: t("stats_3_description"),
      icon: <ListChecks className="text-white" />,
    },
    {
      value: "15000+",
      title: t("stats_4_title"),
      description: t("stats_4_description"),
      icon: <UserCheckIcon className="text-white" />,
    },
    {
      value: "20+",
      title: t("stats_5_title"),
      description: t("stats_5_description"),
      icon: <Globe2Icon className="text-white" />,
    },
    {
      value: "50+",
      title: t("stats_6_title"),
      description: t("stats_6_description"),
      icon: <Icon className="text-white" />,
    },
  ];

  // const scrollLeft = () => {
  //   if (scrollContainerRef.current) {
  //     if (window.innerWidth < 768) {
  //       scrollContainerRef.current.scrollBy({
  //         left: -window.innerWidth * 0.86,
  //         behavior: "smooth",
  //       });
  //     } else {
  //       scrollContainerRef.current.scrollBy({
  //         left: -500,
  //         behavior: "smooth",
  //       });
  //     }
  //   }
  // };

  // const scrollRight = () => {
  //   if (scrollContainerRef.current) {
  //     if (window.innerWidth < 768) {
  //       scrollContainerRef.current.scrollBy({
  //         left: window.innerWidth * 0.86,
  //         behavior: "smooth",
  //       });
  //     } else {
  //       scrollContainerRef.current.scrollBy({
  //         left: 500,
  //         behavior: "smooth",
  //       });
  //     }
  //   }
  // };

  return (
    <div
      className="!w-full"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundImage: `url(${section.src})`,
      }}
    >
      <section
        className="relative !pb-0 !pt-10 px-4 md:px-10 bg-transparent"
        id="stats"
      >
        <div
          className="container section-title absolute z-[20] pb-0"
          data-aos="fade-up"
        >
          <h2 className="text-black dark:!text-white">INNOWEEK</h2>
          <div className="text-black dark:!text-white">{t("COVERAGE")}</div>
        </div>

        <div>
          {/* <button
            onClick={scrollLeft}
            className=" md:flex absolute sm:left-[-23px] max-[620px]:top-6 max-[620px]:left-[40%] top-1/2 -translate-y-1/2 z-10 bg-[#0085d4] text-white dark:bg-gray-900 !rounded-full p-2 shadow hover:bg-black transition"
          >
            <ChevronLeft />
          </button>

          <button
            onClick={scrollRight}
            className=" md:flex absolute sm:right-[-23px] max-[620px]:top-6 max-[620px]:left-[55%] top-1/2 -translate-y-1/2 z-10 bg-[#0085d4] text-white dark:bg-gray-900 p-2 shadow hover:bg-black transition !rounded-full"
          >
            <ChevronRight />
          </button> */}

          <div className="container " data-aos="fade-left" data-aos-delay="100">
            <Swiper
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              key={stats.length}
              modules={[Navigation, Autoplay]}
              spaceBetween={30}
              slidesPerView={3}
              loop={true}
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              speed={800}
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
              breakpoints={{
                320: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
              className="testimonials-slider !pb-5 stats section bg-transparent"
            >
              {stats.map((stat, index) => (
                <SwiperSlide key={stat.title}>
                  <div className="min-w-[300px]">
                    <div
                      className="metric-card bg-[#0085d4] dark:bg-[#1b262c] text-white"
                      data-aos="fade-left"
                      data-aos-delay={100 * (index + 1)}
                    >
                      <div className="metric-header">
                        <div className="metric-icon-wrapper ">{stat?.icon}</div>
                        <div className="metric-value">
                          <span className="text-4xl">{stat.value}</span>
                        </div>
                      </div>
                      <div className="metric-info">
                        <h4 className="text-sm !sm:text-2xl">{stat.title}</h4>
                        <p className="text-white">{stat.description}</p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}

              {/* Navigation buttons */}
              <div className="w-100 d-flex align-items-center justify-center gap-4 mt-10">
                <button
                  ref={prevRef}
                  className="bg-[#0085d4] hover:bg-black text-white !rounded-full w-12 h-12 flex items-center justify-center text-2xl transition-colors duration-300"
                >
                  <ChevronLeft />
                </button>
                <button
                  ref={nextRef}
                  className="bg-[#0085d4] hover:bg-black text-white !rounded-full w-12 h-12 flex items-center justify-center text-2xl transition-colors duration-300 "
                >
                  <ChevronRight />
                </button>
              </div>
            </Swiper>
          </div>

          {/* <section className="stats section min-w-full bg-transparent">
            <div
              className="container"
              data-aos="fade-left"
              data-aos-delay="100"
            >
              <div
                ref={scrollContainerRef}
                id="scrollContainer"
                className="overflow-x-hidden scroll-smooth flex gap-4"
              >
                <div className="g-4 flex gap-6">
                  {stats.map((stat, index) => (
                    <div
                      key={index}
                      className="min-w-[300px] w-[80vw] sm:w-[26vw] sm:max-w-[500px]"
                    >
                      <div
                        className="metric-card bg-[#0085d4] dark:bg-[#1b262c] text-white"
                        data-aos="fade-left"
                        data-aos-delay={100 * (index + 1)}
                      >
                        <div className="metric-header">
                          <div className="metric-icon-wrapper ">
                            {stat?.icon}
                          </div>
                          <div className="metric-value">
                            <span className="text-4xl">{stat.value}</span>
                          </div>
                        </div>
                        <div className="metric-info">
                          <h4 className="text-sm !sm:text-2xl">{stat.title}</h4>
                          <p className="text-white">{stat.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section> */}
        </div>
      </section>
    </div>
  );
}
