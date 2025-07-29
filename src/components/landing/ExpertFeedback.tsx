"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { IoMdStar } from "react-icons/io";
import { LuMoveLeft, LuMoveRight } from "react-icons/lu";
import { useTranslations } from "next-intl";
import expert_1_avatar from "@/assets/img/person/person-f-1.webp";
import expert_2_avatar from "@/assets/img/person/person-m-1.webp";
import expert_3_avatar from "@/assets/img/person/person-f-2.webp";
import expert_4_avatar from "@/assets/img/person/person-f-3.webp";

const ExpertFeedback = () => {
  const t = useTranslations("expert_feedback");
  const data = [
    {
      full_name: t("feedback_1_expert"),
      position: t("feedback_1_desc"),
      image: expert_1_avatar,
      country: t("expert_1_country"),
    },
    {
      full_name: t("feedback_2_expert"),
      position: t("feedback_2_desc"),
      image: expert_2_avatar,
      country: t("expert_2_country"),
    },
    {
      full_name: t("feedback_3_expert"),
      position: t("feedback_3_desc"),
      image: expert_3_avatar,
      country: t("expert_3_country"),
    },
    {
      full_name: t("feedback_4_expert"),
      position: t("feedback_4_desc"),
      image: expert_4_avatar,
      country: t("expert_4_country"),
    },
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [autoScroll, setAutoScroll] = useState(true);
  const pairCount = 1;
  const maxIndex = data.length - pairCount;

  // Auto-scroll functionality
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (autoScroll) {
      interval = setInterval(() => {
        handleNext();
      }, 3000); // Change slide every 3 seconds
    }

    return () => clearInterval(interval);
  }, [autoScroll, currentIndex]);

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setAutoScroll(false); // Pause auto-scroll when user interacts
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - pairCount + data.length) % data.length);
      setIsAnimating(false);
    }, 400);
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + pairCount) % data.length);
      setIsAnimating(false);
    }, 400);
  };

  // Restart auto-scroll after user interaction timeout
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (!autoScroll) {
      timeout = setTimeout(() => {
        setAutoScroll(true);
      }, 10000); // Resume auto-scroll after 10 seconds of inactivity
    }

    return () => clearTimeout(timeout);
  }, [autoScroll]);

  return (
    <section className="py-16">
      <div className="container mx-auto">
        <div className="section-title" data-aos="fade-up">
          <h2 className="text-black dark:!text-white">INNOWEEK</h2>
          <div className="text-black dark:!text-gray-300">{t("about_us")}</div>
        </div>
        <div className="flex relative flex-col md:flex-row items-start gap-18">
          {/* Left panel */}
          <div className="flex flex-col items-center md:items-start w-full md:w-1/3">
            <h3 className="text-xl !font-bold text-black dark:!text-gray-300 mb-6">
              {t("experts_opinion")}
            </h3>
            <div className="md:absolute md:bottom-10 flex items-center gap-3 mt-6 md:mt-0">
              <button
                onClick={handlePrev}
                className="bg-[#0085D4] text-white p-2 !rounded-full focus:bg-blue-500 hover:bg-[#006eb3] transition-colors"
                disabled={isAnimating}
              >
                <LuMoveLeft size={28} />
              </button>
              <button
                onClick={handleNext}
                className="bg-[#0085D4] text-white p-2 !rounded-full focus:bg-blue-500 hover:bg-[#006eb3] transition-colors"
                disabled={isAnimating}
              >
                <LuMoveRight size={28} />
              </button>
            </div>
          </div>
          {/* Right panel - Slider */}
          <div className="w-full md:w-2/3 flex justify-center">
            <div className="overflow-hidden w-[680px]">
              <div
                className="flex transition-transform duration-400 ease-in-out"
                style={{
                  width: `${data.length * 320 + (data.length - 1) * 24}px`,
                  transform: `translateX(-${currentIndex * (320 + 24)}px)`,
                }}
              >
                {data.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-[#0085d4] dark:bg-gray-800 text-white w-[320px] p-6 rounded-lg flex flex-col justify-center mr-6 last:mr-0"
                  >
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i}>
                          <IoMdStar className="text-yellow-300" />
                        </span>
                      ))}
                    </div>
                    <p className="italic mb-4 mt-3 text-[15px]">
                      "{item.position}"
                    </p>
                    <div className="flex items-center gap-4">
                      <Image
                        src={item?.image}
                        alt={item.full_name}
                        width={48}
                        height={48}
                        className="rounded-full"
                      />
                      <div>
                        <p className="font-semibold m-0">{item.full_name}</p>
                        <p className="text-sm text-white/80 m-0">
                          {item.country}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpertFeedback;