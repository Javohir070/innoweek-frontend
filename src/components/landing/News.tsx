"use client";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import userAvatar from "@/assets/img/services/616.jpg";
import newsImage from "@/assets/img/about/news1.png";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BASE_URL, FetchInstance } from "@/api/FetchInstance";
import { useParams } from "next/navigation";
import { INewsListItem, IResponse } from "@/types";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function NewsSection() {
  const t = useTranslations("news");
  const params = useParams();
  const [data, setData] = useState<INewsListItem[]>([]);

  const getNews = async () => {
    try {
      const res = await FetchInstance<IResponse<INewsListItem[]>>(
        `/api/v1.0/news/all?limit=5&lang=${params?.locale}`
      );
      setData(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNews();
  }, [params?.locale]);

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section
      id="portfolio"
      className="testimonials bg-gray-50 dark:bg-gray-900 transition-colors duration-300 py-16"
    >
      <div className="container section-title" data-aos="fade-up">
        <h2 className="text-black dark:!text-white">INNOWEEK</h2>
        <div className="text-black dark:!text-gray-300">{t("Latest News")}</div>
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 5000 }}
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
          className="testimonials-slider"
        >
          {data.map((item) => (
            <SwiperSlide key={item.id}>
              <Link href={`/news/${item?.id}`}>
                <div className="testimonial-item hover:cursor-pointer bg-white dark:!bg-gray-800 m-4 rounded-lg shadow dark:shadow-gray-700/50 transition-all duration-300 ">
                  <div className="row">
                    <div className="col-lg-8">
                      <h2 className="text-black dark:!text-white">{item?.title}</h2>
                      <div
                        className="line-clamp-6 text-gray-700 dark:!text-gray-300"
                        dangerouslySetInnerHTML={{
                          __html: item?.description?.replace(
                            /style="color:black;?|color:black;?/gi,
                            'style="color:inherit;'
                          ),
                        }}
                      ></div>
                      <div className="profile d-flex align-items-center mt-4">
                        <Image
                          src={userAvatar}
                          className="profile-img rounded-full"
                          alt={item?.title}
                          width={50}
                          height={50}
                        />
                        <div className="profile-info ml-3">
                          <h3 className="text-gray-900 dark:text-white mb-0">Innoweek</h3>
                          <span className="text-gray-600 dark:text-gray-400">{t("INNOWEEK")}</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 d-none d-lg-block">
                      <div className="featured-img-wrapper rounded-lg overflow-hidden">
                        <Image
                          src={
                            item?.image
                              ? `${BASE_URL}/upload/news/${item?.image}_big_720.png`
                              : newsImage
                          }
                          className="featured-img w-full h-full object-cover"
                          alt={item?.title}
                          width={300}
                          height={500}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}

          {/* Navigation buttons */}
          <div className="w-100 d-flex align-items-center justify-center gap-4 mt-8">
            <button
              ref={prevRef}
              className="bg-gray-700  dark:bg-gray-700 hover:bg-amber-500 dark:hover:bg-amber-600 text-white !rounded-full w-12 h-12 flex items-center justify-center text-2xl transition-colors duration-300"
            >
              <ChevronLeft />
            </button>
            <button
              ref={nextRef}
              className="bg-gray-700 dark:bg-gray-700 hover:bg-amber-500 dark:hover:bg-amber-600 text-white 
              !rounded-full w-12 h-12 flex items-center justify-center text-2xl transition-colors duration-300"
            >
              <ChevronRight />
            </button>
          </div>
        </Swiper>
      </div>
    </section>
  );
}