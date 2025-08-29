"use client";
import { useTranslations } from "next-intl";
import React from "react";
import { Button, Carousel, Tag } from "antd";
import Image from "next/image";
import { CalendarIcon, ClockIcon } from "lucide-react";
import hero1 from "@/assets/img/ITweek1.jpg";
import hero2 from "@/assets/img/service-6.jpg";
import hero3 from "@/assets/img/service-2.jpg";
import { Link } from "@/i18n/navigation";

const EcoEdiethon = () => {
  const t = useTranslations("eco-ediethon");

  // Demo ma'lumotlar (kerak bo'lsa API dan bog'lab berish mumkin)
  const publishedAt = "3-sentabr, 2025";
  const deadline = "20-sentabr, 2025";

  return (
    <section id="eco-ediethon" className="section bg-transparent mt-8">
      <div className="container">
        {/* Hero slider */}
        <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700">
          <Carousel arrows dots autoplay className="bg-black/5">
            {[hero1, hero2, hero3].map((img, idx) => (
              <div
                key={idx}
                className="relative h-[260px] md:h-[380px] lg:h-[460px]"
              >
                <Image
                  src={img}
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
              <ClockIcon size={16} /> {"E'lon qilindi:"} {publishedAt}
            </span>
          </Tag>
          <Tag color="green" className="px-3 py-1 text-[13px] rounded-full">
            <span className="inline-flex items-center gap-2 font-medium">
              <CalendarIcon size={16} /> {"Muddat:"} <b>{deadline}</b>
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
          <p className="!mb-4">{t("description")}</p>
          {/* Qo'shimcha paragraf(lar) — ixtiyoriy */}
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the <b>{"industry's"}</b> standard dummy
            text ever since the 1500s, when an unknown printer took a galley of
            type and scrambled it to make a type specimen book. It has survived
            not only five centuries, but also the leap into electronic
            typesetting, remaining essentially unchanged. It was popularised in
            the 1960s with the release of Letraset sheets containing Lorem Ipsum
            passages, and more recently with desktop publishing software like
            Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is
            simply dummy text of the printing and typesetting industry. Lorem
            Ipsum has been the <b>{"industry's"}</b> standard dummy text ever since
            the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book. It has survived not only
            five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply
            dummy text of the printing and typesetting industry. Lorem Ipsum has
            been the <b>{"industry's"}</b> standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to
            make a type specimen book. It has survived not only five centuries,
            but also the leap into electronic typesetting, remaining essentially
            unchanged. It was popularised in the 1960s with the release of
            Letraset sheets containing Lorem Ipsum passages, and more recently
            with desktop publishing software like Aldus PageMaker including
            versions of Lorem Ipsum. {"industry's"}
          </p>
          <div className="mt-8 flex justify-center">
            <Link href={"/eco-ediethon/form"}>
              <Button type="primary" size="large">
                {t("apply-button")}
              </Button>
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
};

export default EcoEdiethon;
