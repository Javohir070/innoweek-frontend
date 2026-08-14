import { assetUrl } from "@/lib/assetUrl";
import React, { useState, useEffect, useMemo, useRef } from "react";
import AppImage from "@/lib/AppImage";
import { IoMdStar } from "react-icons/io";
import { LuMoveLeft, LuMoveRight } from "react-icons/lu";
import { useTranslations } from "@/i18n/useTranslations";
import { useParams } from "react-router-dom";
import { BASE_URL, FetchInstance } from "@/api/FetchInstance";
import type { IExpertOpinion, IResponse } from "@/types";
import expert_1_avatar from "@/assets/img/person/person-f-1.webp";
import expert_2_avatar from "@/assets/img/person/person-m-1.webp";
import expert_3_avatar from "@/assets/img/person/person-f-2.webp";
import expert_4_avatar from "@/assets/img/person/person-f-3.webp";
import expert_5_avatar from "@/assets/img/person/expert-5.jpg";
import expert_6_avatar from "@/assets/img/person/expert-6.jpg";
import expert_7_avatar from "@/assets/img/person/expert-7.jpg";
import section from "@/assets/img/section_bg_2.jpg";

/** Karta kengligi va ular orasidagi masofa (px) — surish hisobi shu qiymatlarga bog'liq */
const CARD_WIDTH = 500;
const CARD_GAP = 24;

type FeedbackItem = {
  full_name: string;
  position: string;
  image: string;
  country: string;
};

/**
 * Bitta ekspert kartasi. Matn boshida 5 qatorga qisqartiriladi;
 * agar matn sig'masa, «Batafsil» tugmasi paydo bo'ladi.
 */
function FeedbackCard({
  item,
  moreLabel,
  lessLabel,
  onToggle,
}: {
  item: FeedbackItem;
  moreLabel: string;
  lessLabel: string;
  onToggle: (expanded: boolean) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [isClamped, setIsClamped] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  // Matn 5 qatorga sig'yaptimi — faqat yig'ilgan holatda o'lchaymiz
  useEffect(() => {
    if (expanded) return;
    const el = textRef.current;
    if (!el) return;
    setIsClamped(el.scrollHeight > el.clientHeight + 1);
  }, [item.position, expanded]);

  return (
    <div className="bg-[#0085d4] dark:bg-gray-800 text-white w-[500px] shrink-0 self-start min-h-[300px] p-6 rounded-lg flex flex-col !justify-between mr-6 last:mr-0">
      <div>
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <span key={i}>
              <IoMdStar className="text-lg" />
            </span>
          ))}
        </div>
        <p
          ref={textRef}
          className={`italic mb-2 mt-3 text-[15px] ${expanded ? "" : "line-clamp-5"}`}
        >
          {item.position}
        </p>
        {(isClamped || expanded) && (
          <button
            type="button"
            onClick={() => {
              setExpanded((prev) => !prev);
              onToggle(!expanded);
            }}
            className="mb-4 text-[13px] font-semibold text-white/90 underline underline-offset-4 hover:text-white transition-colors"
          >
            {expanded ? lessLabel : moreLabel}
          </button>
        )}
      </div>
      <div className="flex items-center gap-4">
        <AppImage
          src={item.image}
          alt={item.full_name}
          width={48}
          height={48}
          className="rounded-full w-[48px] h-[48px] object-cover"
        />
        <div>
          <p className="font-semibold m-0">{item.full_name}</p>
          <p className="text-sm text-white/80 m-0">{item.country}</p>
        </div>
      </div>
    </div>
  );
}

const ExpertFeedback = () => {
  const t = useTranslations("expert_feedback");
  const params = useParams();
  const locale = (params?.locale as string) || "uz";

  const staticData: FeedbackItem[] = useMemo(
    () => [
      {
        full_name: t("feedback_5_expert"),
        position: t("feedback_5_desc"),
        image: expert_5_avatar,
        country: t("expert_5_country"),
      },
      {
        full_name: t("feedback_6_expert"),
        position: t("feedback_6_desc"),
        image: expert_6_avatar,
        country: t("expert_6_country"),
      },
      {
        full_name: t("feedback_7_expert"),
        position: t("feedback_7_desc"),
        image: expert_7_avatar,
        country: t("expert_7_country"),
      },
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
    ],
    [t]
  );

  const [apiData, setApiData] = useState<FeedbackItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [autoScroll, setAutoScroll] = useState(true);
  /** Nechta karta yoyilgan — bittasi ochiq bo'lsa avto-surish to'xtaydi */
  const [openCount, setOpenCount] = useState(0);
  const pairCount = 1;

  const data = useMemo(
    () => [...apiData, ...staticData],
    [apiData, staticData]
  );

  useEffect(() => {
    const fetchExperts = async () => {
      try {
        const res = await FetchInstance<IResponse<IExpertOpinion[]>>(
          `/api/v1.0/expert-opinions/all?lang=${locale}&limit=20&page=1`
        );
        const items = Array.isArray(res?.data) ? res.data : [];
        setApiData(
          items
            .filter((item) => item.is_active)
            .map((item) => {
              const countryName =
                locale === "en"
                  ? item.country?.name_en
                  : locale === "ru"
                    ? item.country?.name_ru
                    : item.country?.name_uz;

              return {
                full_name: item.full_name,
                position: item.title,
                image: item.image
                  ? `${BASE_URL}${item.image}`
                  : expert_1_avatar,
                country: countryName || "",
              };
            })
        );
      } catch (error) {
        console.log(error);
        setApiData([]);
      }
    };

    fetchExperts();
  }, [locale]);

  useEffect(() => {
    setCurrentIndex(0);
  }, [data.length]);

  useEffect(() => {
    if (!autoScroll || openCount > 0 || data.length === 0) return;

    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + pairCount) % data.length);
        setIsAnimating(false);
      }, 400);
    }, 3000);

    return () => clearInterval(interval);
  }, [autoScroll, openCount, currentIndex, data.length]);

  const handlePrev = () => {
    if (isAnimating || data.length === 0) return;
    setIsAnimating(true);
    setAutoScroll(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - pairCount + data.length) % data.length);
      setIsAnimating(false);
    }, 400);
  };

  const handleNext = () => {
    if (isAnimating || data.length === 0) return;
    setIsAnimating(true);
    setAutoScroll(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + pairCount) % data.length);
      setIsAnimating(false);
    }, 400);
  };

  useEffect(() => {
    if (!autoScroll) {
      const timeout = setTimeout(() => {
        setAutoScroll(true);
      }, 10000);
      return () => clearTimeout(timeout);
    }
  }, [autoScroll]);

  return (
    <div
      className=" !w-full"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundImage: `url(${assetUrl(section)})`,
      }}
    >
      <section className="!py-10 bg-transparent" id="expert-feedback">
        <div className="container mx-auto">
          <div className="section-title !pb-4" data-aos="fade-up">
            {/* <h2 className="text-black dark:!text-white">INNOWEEK</h2> */}
            <div className="text-black dark:!text-gray-300">
              {t("experts_opinion")}
            </div>
          </div>
          {/* Slayder — butun kenglikda */}
          <div className="w-full overflow-hidden">
            <div
              className="flex transition-transform duration-400 ease-in-out"
              style={{
                width: `${Math.max(data.length, 1) * CARD_WIDTH + Math.max(data.length - 1, 0) * CARD_GAP}px`,
                transform: `translateX(-${currentIndex * (CARD_WIDTH + CARD_GAP)}px)`,
              }}
            >
              {data.map((item, idx) => (
                <FeedbackCard
                  key={`${item.full_name}-${idx}`}
                  item={item}
                  moreLabel={t("read_more")}
                  lessLabel={t("read_less")}
                  onToggle={(open) => {
                    setAutoScroll(false);
                    setOpenCount((prev) => prev + (open ? 1 : -1));
                  }}
                />
              ))}
            </div>
          </div>

          {/* Boshqaruv tugmalari — slayder ostida */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              onClick={handlePrev}
              aria-label="Oldingi"
              className="bg-[#0085D4] text-white p-2 !rounded-full focus:bg-blue-500 hover:bg-[#006eb3] transition-colors"
              disabled={isAnimating}
            >
              <LuMoveLeft size={28} />
            </button>
            <button
              onClick={handleNext}
              aria-label="Keyingi"
              className="bg-[#0085D4] text-white p-2 !rounded-full focus:bg-blue-500 hover:bg-[#006eb3] transition-colors"
              disabled={isAnimating}
            >
              <LuMoveRight size={28} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExpertFeedback;
