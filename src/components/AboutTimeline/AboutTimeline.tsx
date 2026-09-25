import { useState, type ReactNode } from "react";
import { ImageOff } from "lucide-react";
import { BASE_URL } from "@/api/FetchInstance";
import { IProgramDetail } from "@/types";
import { useTranslations } from "@/i18n/useTranslations";
import AppImage from "@/lib/AppImage";

/** Ko'k soyali quti — timeline o'ng tomonidagi barcha bloklar uchun */
const BOX_CLASS =
  "position mb-0 border bg-gray-100 p-4 !text-black dark:!text-[#0085D4] dark:bg-gray-800 dark:!border-gray-400/70 rounded-md";
const BOX_SHADOW = {
  boxShadow: "0 5px 15px -3px #0085d4, 0 4px 6px -4px #0085d4",
};

/**
 * Backend rasm o'rniga 5×7 px «zaglushka» qaytarishi mumkin — uni cho'zsak,
 * sahifada ulkan bo'sh oq maydon paydo bo'ladi. Shuning uchun juda kichik
 * rasmni ham «rasm yo'q» deb hisoblaymiz.
 */
const MIN_IMAGE_SIDE = 64;

function TimelineRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="timeline-item border-gray-200 dark:border-gray-700">
      <div className="timeline-left">
        <h4 className="company mb-0 !text-[#0085d4] border-l-4 pl-3 !text-2xl !font-bold">
          {label}
        </h4>
      </div>
      <div className="timeline-dot bg-[#0085D4] dark:bg-blue-600"></div>
      <div className="timeline-right">{children}</div>
    </div>
  );
}

/** Tadbir dasturi rasmi — bo'sh yoki yaroqsiz bo'lsa ixcham placeholder */
function EventProgramImage({
  image,
  emptyText,
  alt,
}: {
  image?: string | null;
  emptyText: string;
  alt: string;
}) {
  const [isBroken, setIsBroken] = useState(false);

  if (!image || isBroken) {
    return (
      <div className="mb-0 flex items-center gap-3 rounded-md border border-dashed border-[#0085d4]/40 bg-gray-50 px-4 py-5 dark:border-gray-500 dark:bg-gray-800">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0085d4]/10 text-[#0085d4] dark:bg-[#0085d4]/20">
          <ImageOff className="h-5 w-5" strokeWidth={1.6} />
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {emptyText}
        </span>
      </div>
    );
  }

  const mediaBase = BASE_URL.replace(/\/$/, "");
  const src = `${mediaBase}/upload/news/${image}_big_720.png`;

  return (
    <div className={BOX_CLASS} style={BOX_SHADOW}>
      <AppImage
        src={src}
        alt={alt}
        className="mx-auto block max-h-[560px] w-auto max-w-full rounded-md object-contain"
        width={720}
        height={480}
        onError={() => setIsBroken(true)}
        onLoad={(event) => {
          const img = event.currentTarget;
          // Backend ba'zan 5×7 px «zaglushka» qaytaradi — uni dastur deb ko'rsatmaymiz
          if (
            img.naturalWidth < MIN_IMAGE_SIDE ||
            img.naturalHeight < MIN_IMAGE_SIDE
          ) {
            setIsBroken(true);
          }
        }}
      />
    </div>
  );
}

export default function AboutTimeline({ data }: { data: IProgramDetail }) {
  const t = useTranslations("about_timeline");
  const schedule = data?.schedule;

  const timeRange = [schedule?.started_at, schedule?.stopped_at]
    .filter(Boolean)
    .join(" - ");

  return (
    <section className="bg-white pb-0 dark:!bg-transparent transition-colors duration-300 mt-0">
      <div className="container mx-auto px-4 mt-0">
        {/* Title */}
        <div className="text-center mb-10">
          <h2 className="text-xl text-black dark:!text-white !font-bold relative inline-block">
            <span className="border-t-2 border-[#0085D4] w-10 inline-block align-middle mr-2" />
            {schedule?.title}
            <span className="border-t-2 border-[#0085D4] w-10 inline-block align-middle ml-2" />
          </h2>
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-black dark:!text-white mb-0">
            {t("about_us")}
          </h3>
          <section
            id="resume"
            className="resume py-[20px] pb-4 section bg-white dark:!bg-[#031119] transition-colors duration-300"
          >
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="resume-wrapper">
                    <div className="resume-block">
                      <div className="timeline">
                        {schedule?.address && (
                          <TimelineRow label={t("our_address")}>
                            <h3 className={BOX_CLASS} style={BOX_SHADOW}>
                              {schedule.address}
                            </h3>
                          </TimelineRow>
                        )}

                        {timeRange && (
                          <TimelineRow label={t("start_time")}>
                            <h3 className={BOX_CLASS} style={BOX_SHADOW}>
                              {timeRange}
                            </h3>
                          </TimelineRow>
                        )}

                        {schedule?.description && (
                          <TimelineRow label={t("about_event")}>
                            <p
                              className={`${BOX_CLASS} !font-normal !text-base`}
                              style={BOX_SHADOW}
                            >
                              {schedule.description}
                            </p>
                          </TimelineRow>
                        )}

                        <TimelineRow label={t("about_event_image")}>
                          <EventProgramImage
                            image={schedule?.image}
                            alt={schedule?.title || t("about_event_image")}
                            emptyText={t("no_image_available")}
                          />
                        </TimelineRow>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
