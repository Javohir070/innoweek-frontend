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
      console.log(res?.data[0]?.description);
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
      className="testimonials section-light-background bg-transparent"
    >
      <div className="container section-title" data-aos="fade-up">
        <h2>INNOWEEK</h2>
        <div>{t("Latest News")}</div>
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
                <div className="testimonial-item hover:cursor-pointer">
                  <div className="row">
                    <div className="col-lg-8">
                      <h2>{item?.title}</h2>
                      <p
                        className="line-clamp-6 dangerous-html "
                        dangerouslySetInnerHTML={{
                          __html: item?.description?.replaceAll(
                            "black",
                            "white"
                          ),
                        }}
                      ></p>
                      {/* <p>{item.details[currentLang]}</p> */}
                      <div className="profile d-flex align-items-center">
                        <Image
                          src={userAvatar}
                          className="profile-img"
                          alt={item?.title}
                        />
                        <div className="profile-info">
                          <h3>Innoweek</h3>
                          <span>{t("INNOWEEK")}</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 d-none d-lg-block">
                      <div className="featured-img-wrapper">
                        <Image
                          src={
                            item?.image
                              ? `${BASE_URL}/upload/news/${item?.image}_big_720.png`
                              : newsImage
                          }
                          className="featured-img"
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

          {/* Navigatsiya tugmalari */}
        </Swiper>
        <div className="w-100 d-flex align-items-center justify-center gap-4">
          <button
            ref={prevRef}
            className="bg-[#23272f] hover:bg-[#fbbf24] text-white !rounded-full w-12 h-12 flex items-center justify-center text-2xl"
          >
            <ChevronLeft />
          </button>
          <button
            ref={nextRef}
            className="bg-[#23272f] hover:bg-[#fbbf24] text-white !rounded-full w-12 h-12 flex items-center justify-center text-2xl"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
}
