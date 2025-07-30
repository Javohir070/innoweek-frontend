"use client";
import React, { useEffect, useState } from "react";
import userAvatar from "@/assets/img/person/person-m-7.webp";
import Image from "next/image";
import { BASE_URL, FetchInstance } from "@/api/FetchInstance";
import { IResponse, ISpeakerItem } from "@/types";
import { useTranslations } from "next-intl";

import Aos from "aos";

const SpeakersSection = () => {
  const t = useTranslations("speakers");
  const [data, setData] = useState<ISpeakerItem[]>([]);

  const getSpeakers = async () => {
    try {
      const res = await FetchInstance<IResponse<ISpeakerItem[]>>(
        `/api/v1.0/speakers/all?limit=10&archive_id=7`
      );
      setData(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSpeakers();
    Aos.init();
  }, []);

  return (
    <div className="!bg-[#0085D41A] !w-full">
      <section
        id="team"
        className="team section !bg-transparent transition-colors duration-300 py-16"
      >
        <div className="container section-title" data-aos="fade-up">
          <h2 className="!text-black dark:!text-white">{t("INNOWEEK")}</h2>
          <div className="text-black dark:!text-gray-300">{t("SPEAKERS")}</div>
        </div>

        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="row gy-4">
            {data?.map((item) => (
              <div
                className="col-lg-6"
                data-aos="fade-up"
                data-aos-delay="100"
                key={item?.full_name}
              >
                <div className="team-member d-flex !bg-[#0085d4]  dark:!bg-gray-800 rounded-lg shadow-sm dark:shadow-gray-700/50 hover:shadow-md dark:hover:shadow-gray-600/50 transition-all duration-300 ">
                  <div className="member-img">
                    <Image
                      src={
                        item?.image ? `${BASE_URL}${item?.image}` : userAvatar
                      }
                      className="img-fluid rounded-lg"
                      alt={item?.full_name}
                      loading="lazy"
                      width={120}
                      height={120}
                    />
                  </div>
                  <div className="member-info flex-grow-1">
                    <h4 className="text-white dark:!text-white mb-1">
                      {item?.full_name}
                    </h4>
                    <span className="text-white dark:!text-gray-400">
                      {item?.position}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SpeakersSection;
