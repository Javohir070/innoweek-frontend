import { useId } from "react";
import AppImage from "@/lib/AppImage";
import { BASE_URL } from "@/api/FetchInstance";
import { flagUrl } from "@/lib/countryFlag";
import type { ISpeakerItem } from "@/types";
import userAvatar from "@/assets/img/person/person-m-7.webp";

/** Portret atrofidagi yoy: halqaning bir qismini ochiq qoldiradi (r=47 → aylana ≈ 295) */
const RING_DASH = "228 67";

/** Yoyning to'liq aylanish vaqti (soniya) — kartalar bir xilda aylanmasligi uchun turlicha */
const RING_SPEEDS = [9, 10, 11, 12, 13];

export default function SpeakerCard({
  speaker,
  locale,
}: {
  speaker: ISpeakerItem;
  locale: string;
}) {
  const gradientId = useId();
  const flag = flagUrl(speaker.country?.id ?? speaker.country_id);
  const ringSpeed = RING_SPEEDS[speaker.id % RING_SPEEDS.length];

  const countryName =
    locale === "en"
      ? speaker.country?.name_en
      : locale === "ru"
        ? speaker.country?.name_ru
        : speaker.country?.name_uz;

  return (
    <div className="relative flex h-full flex-col items-center overflow-hidden rounded-2xl bg-white px-1 py-4 text-center shadow-[0_2px_18px_rgba(11,37,69,0.07)] transition-shadow duration-300 hover:shadow-[0_6px_28px_rgba(11,37,69,0.13)] dark:bg-gray-800">
      {/* Bezak nuqtalar */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-3 left-3 h-10 w-14"
        style={{
          backgroundImage: "radial-gradient(#0085d4 1.2px, transparent 1.2px)",
          backgroundSize: "7px 7px",
          opacity: 0.22,
        }}
      />

      {/* Portret + yoy + bayroq */}
      <div className="relative mb-4 h-[116px] w-[116px] shrink-0">
        {/* Doimiy och halqa */}
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 h-full w-full"
          aria-hidden
        >
          <circle
            cx="50"
            cy="50"
            r="47"
            fill="none"
            className="stroke-[#dbe4f0] dark:stroke-gray-700"
            strokeWidth="1"
          />
        </svg>

        {/* Aylanib turuvchi ko'k yoy — Qamrov bo'limidagi halqalar bilan bir xil */}
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 h-full w-full animate-spin motion-reduce:animate-none"
          style={{
            animationDuration: `${ringSpeed}s`,
            // Yoyning qalin uchi oldinda ketishi uchun teskari aylanadi
            animationDirection: "reverse",
          }}
          aria-hidden
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#0085d4" />
              <stop offset="100%" stopColor="#8ecbf0" />
            </linearGradient>
          </defs>
          <circle
            cx="50"
            cy="50"
            r="47"
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={RING_DASH}
          />
        </svg>

        <AppImage
          src={speaker.image ? `${BASE_URL}${speaker.image}` : userAvatar}
          alt={speaker.full_name}
          className="absolute left-[7%] top-[7%] h-[86%] w-[86%] rounded-full object-cover"
          width={116}
          height={116}
        />

        {flag && (
          <img
            src={flag}
            alt={countryName || ""}
            title={countryName || undefined}
            loading="lazy"
            className="absolute bottom-0 left-0 h-8 w-8 rounded-full border-2 border-white object-cover shadow-md dark:border-gray-800"
          />
        )}
      </div>

      <h4 className="!m-0 !text-[15px] !font-bold !leading-snug !text-[#0b2545] dark:!text-white">
        {speaker.full_name}
      </h4>
      <span className="my-2.5 block h-[2px] w-10 shrink-0 rounded-full bg-[#0085d4]" />
      <p className="!m-0 !text-[13px] !leading-relaxed !text-gray-500 dark:!text-gray-400">
        {speaker.position}
      </p>
    </div>
  );
}
