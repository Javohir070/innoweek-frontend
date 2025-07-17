"use client";
import {
  ChevronLeft,
  ChevronRight,
  Globe2Icon,
  Image,
  ListChecks,
  Map,
  UserCheckIcon,
  Users,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useState, useRef } from "react";

export default function StatsSection() {
  const t = useTranslations("stats");

  const [currentLang] = useState("uz");
  const scrollContainerRef = useRef(null);

  const stats = [
    {
      value: "4 000 m2",
      title: t("stats_1_title"),
      description: t("stats_1_description"),
      icon: <Map className="text-yellow-500" />,
    },
    {
      value: "1200+",
      title: t("stats_2_title"),
      description: t("stats_2_description"),
      icon: <Users className="text-yellow-500" />,
    },
    {
      value: "100+",
      title: t("stats_3_title"),
      description: t("stats_3_description"),
      icon: <ListChecks className="text-yellow-500" />,
    },
    {
      value: "200+",
      title: t("stats_4_title"),
      description: t("stats_4_description"),
      icon: <UserCheckIcon className="text-yellow-500" />,
    },
    {
      value: "20+",
      title: t("stats_5_title"),
      description: t("stats_5_description"),
      icon: <Globe2Icon className="text-yellow-500" />,
    },
    {
      value: "50+",
      title: t("stats_6_title"),
      description: t("stats_6_description"),
      icon: <Image className="text-yellow-500" />,
    },
  ];

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -400,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 400,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative py-12 px-4 md:px-10 bg-transparent">
      <div
        className="container section-title absolute z-[20] mt-[-40px]"
        data-aos="fade-up"
      >
        <h2>INNOWEEK</h2>
        <div>
          {currentLang === "uz"
            ? "QAMROV"
            : currentLang === "ru"
            ? "ОХВАТ"
            : "COVERAGE"}
        </div>
      </div>

      <div className="relative">
        <button
          onClick={scrollLeft}
          className="hidden md:flex absolute left-[-23px] top-1/2 -translate-y-1/2 z-10 bg-gray-900 !rounded-full p-2 shadow hover:bg-yellow-500 transition"
        >
          <ChevronLeft />
        </button>

        <button
          onClick={scrollRight}
          className="hidden md:flex absolute right-[-23px] top-1/2 -translate-y-1/2 z-10 bg-gray-900 p-2 shadow hover:bg-yellow-500 transition !rounded-full"
        >
          <ChevronRight />
        </button>

        <section className="stats section min-w-full bg-transparent">
          <div className="container" data-aos="fade-left" data-aos-delay="100">
            <div
              ref={scrollContainerRef}
              id="scrollContainer"
              className="overflow-x-hidden scroll-smooth flex gap-6 py-2 px-1"
            >
              <div className="g-4 flex gap-6">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="col-xl-3 col-lg-6 col-md-6 min-w-[200px] w-[300px]"
                  >
                    <div
                      className="metric-card"
                      data-aos="fade-left"
                      data-aos-delay={100 * (index + 1)}
                    >
                      <div className="metric-header">
                        <div className="metric-icon-wrapper">{stat?.icon}</div>
                        <div className="metric-value">
                          <span>{stat.value}</span>
                        </div>
                      </div>
                      <div className="metric-info">
                        <h4>{stat.title}</h4>
                        <p>{stat.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
