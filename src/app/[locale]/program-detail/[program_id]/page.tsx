"use client";
import { useParams } from "next/navigation";
import section from "@/assets/img/section_bg_2.jpg";
import { useTranslations } from "next-intl";
import { BASE_URL, FetchInstance } from "@/api/FetchInstance";
import { useEffect, useState, useCallback } from "react";
import { IProgramDetail, IProgramDetailResponse } from "@/types";
import Image from "next/image";
import userAvatar from "@/assets/img/avatar.png";
import AboutTimeline from "../../AboutTimeline/AboutTimeline";
import StoreEvets from "@/components/shared/StoreEvets";

export default function ProgramDetailPage() {
  const params = useParams();
  const t = useTranslations("program-detail");
  console.log(params?.program_id);

  const [data, setData] = useState<IProgramDetail | null>(null);
  const [loading, setLoading] = useState(true);

  const getDetail = useCallback(async () => {
    try {
      setLoading(true);
      const res: IProgramDetailResponse = await FetchInstance(
        `/api/v1.0/schedules/${params?.program_id}/list?lang=${params?.locale}`
      );
      console.log(res?.data);
      setData(res?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [params?.program_id, params?.locale]);

  useEffect(() => {
    getDetail();
  }, [getDetail]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {t("no_data_found")}
          </h2>
          <p className="text-gray-600">{t("no_program_info")}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="!w-full mt-20 min-h-[75vh]"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundImage: `url(${section.src})`,
      }}
    >
      <section
        id="program-detail"
        className="team section !bg-transparent transition-colors duration-300 py-16"
      >
        <AboutTimeline data={data} />

        {/* Speakers Section */}
        <div className="container">
          <div className="container section-title" data-aos="fade-up">
            <h2 className="text-black dark:!text-white">{t("INNOWEEK")}</h2>
            <div className="text-black dark:!text-gray-300">{t("SPEAKERS")}</div>
          </div>

          {data?.speakers?.length > 0 && (
            <div>
              <div className="row gy-4">
                {data.speakers.map((speaker) => (
                  <div
                    className="col-lg-6 col-sm-6"
                    data-aos-delay="100"
                    key={speaker.id}
                  >
                    <div className="team-member d-flex grid grid-cols-3 !bg-[#0085d4] dark:!bg-gray-800 rounded-lg shadow-sm dark:shadow-gray-700/50 hover:shadow-md dark:hover:shadow-gray-600/50 transition-all duration-300">
                      <div className="member-img">
                        <Image
                          src={
                            speaker.image
                              ? `${BASE_URL}${speaker.image}`
                              : userAvatar
                          }
                          className="img-fluid rounded-lg !w-full !h-[450px] sm:!h-[300px] lg:!h-[200px] !object-cover"
                          alt={speaker.full_name}
                          loading="lazy"
                          width={200}
                          height={200}
                        />
                      </div>
                      <div className="member-info flex-grow-1 max-[767px]:!py-3">
                        <h4 className="text-white dark:!text-white mb-1">
                          {speaker.full_name}
                        </h4>
                        <span className="text-white dark:!text-gray-400 max-[767px]:!m-0 block">
                          {speaker.job}
                        </span>
                        <span className="text-white dark:!text-gray-400 max-[767px]:!m-0 block">
                          🌍 {speaker.country.name}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex py-6 justify-center">
                <StoreEvets event_data={data} size="large" />
              </div>
            </div>
          )}

          {data.speakers.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500 dark:text-gray-400">
                <h4 className="text-xl font-semibold mb-2">
                  {t("no_speaker_data")}
                </h4>
                <p>{t("no_speakers_added")}</p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
