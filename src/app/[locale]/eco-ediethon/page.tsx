"use client";
import { useTranslations } from "next-intl";
import React from "react";
import { Button, Carousel, Tag } from "antd";
import Image from "next/image";
import { CalendarIcon, ClockIcon } from "lucide-react";
import hero1 from "@/assets/img/ecoIdethon.png";
import { Link } from "@/i18n/navigation";

const EcoEdiethon = () => {
  const t = useTranslations("eco-ediethon");
  const token = window?.localStorage?.getItem("token");
  // Demo ma'lumotlar (kerak bo'lsa API dan bog'lab berish mumkin)
  const publishedAt = "3-sentabr, 2025";
  const deadline = "28-sentabr, 2025";

  return (
    <section id="eco-ediethon" className="section bg-transparent mt-8">
      <div className="container">
        {/* Hero slider */}
        <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700">
          <Carousel arrows dots autoplay className="bg-black/5">
            {[hero1].map((img, idx) => (
              <div
                key={idx}
                className="relative h-[260px] md:h-[380px] lg:h-[460px]"
              >
                <Image
                  src={img.src}
                  alt={`slide-${idx + 1}`}
                  fill
                  priority={idx === 0}
                  className="object-cover"
                />
              </div>
            ))}
          </Carousel>
        </div>

        {/* Chips row */}
        <div className="flex flex-wrap items-center gap-3 mt-4">
          <Tag color="blue" className="px-3 py-1 text-[13px] rounded-full">
            <span className="inline-flex items-center gap-2 font-medium">
              <ClockIcon size={16} /> {t("published")} {publishedAt}
            </span>
          </Tag>
          <Tag color="green" className="px-3 py-1 text-[13px] rounded-full">
            <span className="inline-flex items-center gap-2 font-medium">
              <CalendarIcon size={16} /> {t("deadline")} <b>{deadline}</b>
            </span>
          </Tag>
          {/* <Tag color="default" className="px-3 py-2 text-[13px] rounded-full">
            <span className="inline-flex items-center gap-2 font-medium">
              <EyeIcon size={16} /> {views}
            </span>
          </Tag> */}
        </div>

        {/* Title */}
        <h1 className="mt-4 text-2xl md:text-3xl lg:text-4xl font-extrabold leading-snug text-black">
          {t("title")}
        </h1>

        {/* Body content */}
        <article className="prose dark:prose-invert max-w-none mt-4 text-gray-800 dark:text-gray-200">
          <p className="!mb-6">{t("description")}</p>
          
          {/* Goal Section */}
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-3 text-black">{t("goal")}</h3>
            <p>{t("goal_description")}</p>
          </div>

          {/* Directions Section */}
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-3 text-black">{t("directions")}</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>{t("direction_1")}</li>
              <li>{t("direction_2")}</li>
              <li>{t("direction_3")}</li>
              <li>{t("direction_4")}</li>
              <li>{t("direction_5")}</li>
            </ul>
          </div>

          {/* Requirements Section */}
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-3 text-black">{t("requirements")}</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>{t("age_requirement")}</li>
              <li>{t("presentation_requirement")}</li>
              <li>{t("project_requirement")}</li>
            </ul>
          </div>

          {/* Main Prize Section */}
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-3 text-black">{t("main_prize")}</h3>
            <p>{t("prize_description")}</p>
          </div>

          {/* Event Details Section */}
          <div className="mb-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-lg font-semibold mb-2 text-black">{t("event_time")}</h4>
                <p className="text-blue-600 dark:text-blue-400 font-medium">{t("event_date")}</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-2 text-black">{t("application_deadline")}</h4>
                <p className="text-red-600 dark:text-red-400 font-medium">{t("deadline_date")}</p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            {token ? (
              <Link href={"/eco-ediethon/form"}>
                <Button type="primary" size="large">
                  {t("apply-button")}
                </Button>
              </Link>
            ) : (
              <Link href={"/login"}>
                <Button type="primary" size="large">
                  {t("login-button")}
                </Button>
              </Link>
            )}
          </div>
        </article>
      </div>
    </section>
  );
};

export default EcoEdiethon;
