"use client";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { DownCircleOutlined } from "@ant-design/icons";
import { FetchInstance } from "@/api/FetchInstance";
import { IProgramEvent, IResponse } from "@/types";
import { useParams } from "next/navigation";
import StoreEvets from "../shared/StoreEvets";

// Program sahifadagi ma'lumotlar massiv ko'rinishida:

export default function ProgramSection() {
  const { locale } = useParams();
  const t = useTranslations("program");
  const [visibleCount, setVisibleCount] = useState(1);
  const [isShowMoreVisible1, setIsShowMoreVisible1] = useState(3);
  const [isShowMoreVisible2, setIsShowMoreVisible2] = useState(3);
  const [isShowMoreVisible3, setIsShowMoreVisible3] = useState(3);
  const [visibleDays1, setVisibleDays1] = useState<IProgramEvent[]>([]);
  const [visibleDays2, setVisibleDays2] = useState<IProgramEvent[]>([]);
  const [visibleDays3, setVisibleDays3] = useState<IProgramEvent[]>([]);

  const programData = [
    {
      day: "day_1",
      events: visibleDays1 || [],
      isShowMoreVisible: isShowMoreVisible1,
      setIsShowMoreVisible: setIsShowMoreVisible1,
    },
    {
      day: "day_2",
      events: visibleDays2 || [],
      isShowMoreVisible: isShowMoreVisible2,
      setIsShowMoreVisible: setIsShowMoreVisible2,
    },
    {
      day: "day_3",
      events: visibleDays3 || [],
      isShowMoreVisible: isShowMoreVisible3,
      setIsShowMoreVisible: setIsShowMoreVisible3,
    },
  ];

  const handleShowMore = () => {
    if (visibleCount < programData.length) {
      setVisibleCount(visibleCount + 1);
    }
  };

  const getProgramEvents = async (
    date: string,
    setData: React.Dispatch<React.SetStateAction<IProgramEvent[]>>
  ) => {
    try {
      const response = await FetchInstance<IResponse<IProgramEvent[]>>(
        `/api/v1.0/schedules/list?date=${date}&lang=${locale}`
      );
      setData(response?.data || []);
    } catch (error) {
      console.error("Error fetching program events:", error);
      return [];
    }
  };

  useEffect(() => {
    getProgramEvents("2025-10-09", setVisibleDays1);
    getProgramEvents("2025-10-10", setVisibleDays2);
    getProgramEvents("2025-10-11", setVisibleDays3);
  }, []);

  return (
    <section
      id="resume"
      className="resume section bg-white dark:!bg-[#031119] transition-colors duration-300"
    >
      <div className="container section-title" data-aos="fade-up">
        <h2 className="text-black dark:!text-white">{t("INNOWEEK")}</h2>
        <div className="text-black dark:!text-gray-300">{t("PROGRAM")}</div>
      </div>
      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row">
          <div className="col-12">
            <div className="resume-wrapper">
              {programData.map((dayItem, dayIdx) => (
                <div
                  className="resume-block"
                  key={dayItem?.day}
                  data-aos="fade-up"
                  data-aos-delay={100 + dayIdx * 100}
                >
                  <h2 className="text-black dark:!text-white">
                    {t(dayItem?.day)}
                  </h2>
                  <div className="timeline">
                    {dayItem.events
                      .slice(0, dayItem?.isShowMoreVisible)
                      .map((event, eventIdx) => (
                        <div
                          className="timeline-item border-gray-200 dark:border-gray-700"
                          key={eventIdx}
                          data-aos="fade-up"
                          data-aos-delay={200 + eventIdx * 100}
                        >
                          <div className="timeline-left">
                            <h4 className="company mb-0 !text-black dark:!text-white cursor-pointer hover:text-blue-500 dark:hover:text-blue-400">
                              {event.address}
                            </h4>
                            <span className="period text-black dark:!text-gray-400">
                              {event.started_at} - {event.stopped_at}
                            </span>
                          </div>
                          <div className="timeline-dot bg-blue-500 dark:bg-blue-600"></div>
                          <div className="timeline-right">
                            <div className="flex gap-5 items-center">
                              <h3 className="position mb-0 !text-[#0085d4] dark:!text-blue-500 cursor-pointer hover:!text-black dark:hover:text-blue-400">
                                {event.title}
                              </h3>
                              <StoreEvets btn_text="Ishtirok etish" event_data={event} />
                            </div>
                            {event.description && (
                              <p className="description m-0 text-gray-700 dark:text-gray-300">
                                {event.description || t("NO_DESCRIPTION")}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                  {dayItem.events.length !== dayItem?.isShowMoreVisible && (
                    <div
                      className="text-center mt-8 cursor-pointer"
                      onClick={() => {
                        dayItem?.setIsShowMoreVisible(dayItem?.events.length);
                        handleShowMore();
                      }}
                      data-aos="fade-up"
                      data-aos-delay="100"
                    >
                      <span className="text-lg text-gray-800 font-bold">
                        {t("LOAD_MORE")}
                      </span>
                      <DownCircleOutlined className="inline-block ml-2 text-lg !text-gray-800" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

//  {visibleDays1.length !== isShowMoreVisible1 && (
//                 <div
//                   className="text-center mt-8 cursor-pointer"
//                   onClick={() => {
//                     setIsShowMoreVisible1(visibleDays1.length);
//                     handleShowMore();
//                   }}
//                   data-aos="fade-up"
//                   data-aos-delay="100"
//                 >
//                   <span className="text-lg text-gray-800 font-bold">
//                     {t("LOAD_MORE")}
//                   </span>
//                   <DownCircleOutlined className="inline-block ml-2 text-lg !text-gray-800" />
//                 </div>
//               )}

//               {visibleDays2.map((dayItem, dayIdx) => (
//                 <div
//                   className="resume-block"
//                   key={dayItem.day}
//                   data-aos="fade-up"
//                   data-aos-delay={100 + dayIdx * 100}
//                 >
//                   <h2 className="text-black dark:!text-white">
//                     {t(dayItem.day)}
//                   </h2>
//                   <div className="timeline">
//                     {dayItem.events
//                       .slice(0, isShowMoreVisible2)
//                       .map((event, eventIdx) => (
//                         <div
//                           className="timeline-item border-gray-200 dark:border-gray-700"
//                           key={eventIdx}
//                           data-aos="fade-up"
//                           data-aos-delay={200 + eventIdx * 100}
//                         >
//                           <div className="timeline-left">
//                             <h4 className="company mb-0 !text-black dark:!text-white cursor-pointer hover:text-blue-500 dark:hover:text-blue-400">
//                               {event.left.hall}
//                             </h4>
//                             <span className="period text-black dark:!text-gray-400">
//                               {event.left.time}
//                             </span>
//                           </div>
//                           <div className="timeline-dot bg-blue-500 dark:bg-blue-600"></div>
//                           <div className="timeline-right">
//                             {/* <Link href="/program-detail"> */}
//                             <h3 className="position mb-0 !text-[#0085d4] dark:!text-blue-500 cursor-pointer hover:!text-black dark:hover:text-blue-400">
//                               {t(event.right.title)}
//                             </h3>
//                             {/* </Link> */}
//                             <p className="description m-0 text-gray-700 dark:text-gray-300">
//                               {event.right.description}
//                             </p>
//                           </div>
//                         </div>
//                       ))}
//                   </div>
//                 </div>
//               ))}
//               {visibleDays2[0].events.length !== isShowMoreVisible2 && (
//                 <div
//                   className="text-center mt-8 cursor-pointer"
//                   onClick={() => {
//                     setIsShowMoreVisible2(visibleDays2[0].events.length);
//                   }}
//                   data-aos="fade-up"
//                   data-aos-delay="100"
//                 >
//                   <span className="text-lg text-gray-800 font-bold">
//                     {t("LOAD_MORE")}
//                   </span>
//                   <DownCircleOutlined className="inline-block ml-2 text-lg !text-gray-800" />
//                 </div>
//               )}
//               {visibleDays3.map((dayItem, dayIdx) => (
//                 <div
//                   className="resume-block"
//                   key={dayItem.day}
//                   data-aos="fade-up"
//                   data-aos-delay={100 + dayIdx * 100}
//                 >
//                   <h2 className="text-black dark:!text-white">
//                     {t(dayItem.day)}
//                   </h2>
//                   <div className="timeline">
//                     {dayItem.events
//                       .slice(0, isShowMoreVisible3)
//                       .map((event, eventIdx) => (
//                         <div
//                           className="timeline-item border-gray-200 dark:border-gray-700"
//                           key={eventIdx}
//                           data-aos="fade-up"
//                           data-aos-delay={200 + eventIdx * 100}
//                         >
//                           <div className="timeline-left">
//                             <h4 className="company mb-0 !text-black dark:!text-white cursor-pointer hover:text-blue-500 dark:hover:text-blue-400">
//                               {event.left.hall}
//                             </h4>
//                             <span className="period text-black dark:!text-gray-400">
//                               {event.left.time}
//                             </span>
//                           </div>
//                           <div className="timeline-dot bg-blue-500 dark:bg-blue-600"></div>
//                           <div className="timeline-right">
//                             {/* <Link href="/program-detail"> */}
//                             <h3 className="position mb-0 !text-[#0085d4] dark:!text-blue-500 cursor-pointer hover:!text-black dark:hover:text-blue-400">
//                               {t(event.right.title)}
//                             </h3>
//                             {/* </Link> */}
//                             <p className="description m-0 text-gray-700 dark:text-gray-300">
//                               {event.right.description}
//                             </p>
//                           </div>
//                         </div>
//                       ))}
//                   </div>
//                 </div>
//               ))}
//               {/* {visibleDays3[0].events.length !== isShowMoreVisible3 && (
//                 <div
//                   className="text-center mt-8 cursor-pointer"
//                   onClick={() => {
//                     setIsShowMoreVisible3(visibleDays3[0].events.length);
//                   }}
//                 >
//                   <span className="text-lg text-[#0085d4] font-bold">
//                     {t("LOAD_MORE")}
//                   </span>
//                   <DownCircleOutlined className="inline-block ml-2 text-lg !text-[#0085d4]" />
//                 </div>
//               )} */}
