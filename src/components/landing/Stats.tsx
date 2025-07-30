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

export default function StatsSection() {
  const t = useTranslations("stats");

  const [currentLang] = useState("uz");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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
    <div className="!bg-[#0085D41A] !w-full">
      <section
        className="relative py-8 px-4 md:px-10 bg-transparent"
        id="stats"
      >
        <div
          className="container section-title absolute z-[20] pb-0"
          data-aos="fade-up"
        >
          <h2 className="text-black dark:!text-white">INNOWEEK</h2>
          <div className="text-black dark:!text-white">
            {t('COVERAGE')}
          </div>
        </div>

        <div className="relative">
          <button
            onClick={scrollLeft}
            className="hidden md:flex absolute left-[-23px] top-1/2 -translate-y-1/2 z-10 bg-[#0085d4] text-white dark:bg-gray-900 !rounded-full p-2 shadow hover:bg-black transition"
          >
            <ChevronLeft />
          </button>

          <button
            onClick={scrollRight}
            className="hidden md:flex absolute right-[-23px] top-1/2 -translate-y-1/2 z-10 bg-[#0085d4] text-white dark:bg-gray-900 p-2 shadow hover:bg-black transition !rounded-full"
          >
            <ChevronRight />
          </button>

          <section className="stats section min-w-full bg-transparent">
            <div
              className="container"
              data-aos="fade-left"
              data-aos-delay="100"
            >
              <div
                ref={scrollContainerRef}
                id="scrollContainer"
                className="overflow-x-hidden scroll-smooth flex gap-6  px-1"
              >
                <div className="g-4 flex gap-6">
                  {stats.map((stat, index) => (
                    <div
                      key={index}
                      className="min-w-[200px] w-[350px]"
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
                            <span>{stat.value}</span>
                          </div>
                        </div>
                        <div className="metric-info">
                          <h4>{stat.title}</h4>
                          <p className="text-white">{stat.description}</p>
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
    </div>
  );
}
