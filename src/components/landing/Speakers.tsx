import React, { useEffect, useState } from "react";
import { assetUrl } from "@/lib/assetUrl";
import userAvatar from "@/assets/img/person/person-m-7.webp";
import AppImage from "@/lib/AppImage";
import { BASE_URL, FetchInstance } from "@/api/FetchInstance";
import { IResponse, ISpeakerItem } from "@/types";
import { useTranslations } from "@/i18n/useTranslations";
import section from "@/assets/img/section_bg_2.jpg";
import Aos from "aos";
import { useParams } from "react-router-dom";
import { DownCircleOutlined } from "@ant-design/icons";

const SpeakersSection = () => {
  const t = useTranslations("speakers");
  const lang = useParams<{ locale: string }>().locale || "uz";
  const [data, setData] = useState<ISpeakerItem[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [limit, setLimit] = useState<number>(4);

  const getSpeakers = async () => {
    try {
      const res = await FetchInstance<IResponse<ISpeakerItem[]>>(
        `/api/v1.0/speakers/all?&limit=${limit}&archive_id=9&lang=${lang}`
      );
      setData(res?.data);
      setTotal(res?.pagination?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSpeakers();
    Aos.init();
  }, [lang, limit]);

  return (
    <div
      className="!w-full"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundImage: `url(${assetUrl(section)})`,
      }}
    >
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
                className="col-lg-6 col-sm-6"
                data-aos="fade-up"
                data-aos-delay="100"
                key={item?.full_name}
              >
                <div className="team-member d-flex grid grid-cols-3 !bg-[#0085d4]  dark:!bg-gray-800 rounded-lg shadow-sm dark:shadow-gray-700/50 hover:shadow-md dark:hover:shadow-gray-600/50 transition-all duration-300 ">
                  <div className="member-img">
                    <AppImage
                      src={
                        item?.image ? `${BASE_URL}${item?.image}` : userAvatar
                      }
                      className="img-fluid rounded-lg !w-full !h-[450px] sm:!h-[300px] lg:!h-[200px] !object-cover"
                      alt={item?.full_name}
                      loading="lazy"
                      width={200}
                      height={200}
                    />
                  </div>
                  <div className="member-info flex-grow-1 max-[767px]:!py-3">
                    <h4 className="text-white dark:!text-white mb-1">
                      {item?.full_name}
                    </h4>
                    <span className="text-white dark:!text-gray-400 max-[767px]:!m-0">
                      {item?.position}
                    </span>
                    <span className="text-white dark:!text-gray-400 max-[767px]:!m-0">
                      {lang == "uz" && item?.country?.name_uz}
                      {lang == "en" && item?.country?.name_en}
                      {lang == "ru" && item?.country?.name_ru}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {total > limit && (
          <div
            className="text-center mt-8 cursor-pointer"
            onClick={() => setLimit(total)}
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <span className="text-lg text-gray-800 font-bold">
              {t("LOAD_MORE")}
            </span>
            <DownCircleOutlined className="inline-block ml-2 text-lg !text-gray-800" />
          </div>
        )}
      </section>
    </div>
  );
};

export default SpeakersSection;

//  <div className="text-center mt-8">
//   <button
//     onClick={() => setLimit(limit + 2)}
//     className="btn btn-primary !bg-[#0085d4] dark:!bg-gray-800 hover:!bg-[#006eb3] dark:hover:!bg-gray-700 transition-colors duration-300 flex items-center justify-center"
//   >
//     <span> {t("LOAD_MORE")}</span>
//     <DownCircleOutlined className="inline-block ml-2 text-lg" />
//   </button>
// </div>
