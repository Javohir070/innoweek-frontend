"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useState } from "react";
import { DownCircleOutlined } from "@ant-design/icons";

// Program sahifadagi ma'lumotlar massiv ko'rinishida:
export const programData = [
  {
    day: "day_1",
    events: [
      {
        left: {
          hall: "CAEx ALPHA HALL",
          time: "11.00 – 11.50",
        },
        right: {
          hall: "CAEx BETA HALL",
          title: "day_1_program_1_title",
          // description:
          //   "Curabitur ullamcorper ultricies nisi nam eget dui etiam rhoncus maecenas tempus.",
        },
      },
      {
        left: {
          hall: "CAEx ALPHA HALL",
          time: "12.00 – 12.50",
        },
        right: {
          hall: "CAEx ALPHA HALL",
          title: "day_1_program_2_title",
          // description:
          //   "Curabitur ullamcorper ultricies nisi nam eget dui etiam rhoncus maecenas tempus.",
        },
      },
      {
        left: {
          hall: "CAEx ALPHA HALL",
          time: "14.30 – 15.20",
        },
        right: {
          hall: "Bachelor of Fine Arts & Graphic Design",
          title: "day_1_program_3_title",
          // description:
          //   "Curabitur ullamcorper ultricies nisi nam eget dui etiam rhoncus maecenas tempus.",
        },
      },
      {
        left: {
          hall: "CAEx ALPHA HALL",
          time: "15.30 – 16.20",
        },
        right: {
          hall: "Bachelor of Fine Arts & Graphic Design",
          title: "day_1_program_4_title",
          // description:
          //   "Curabitur ullamcorper ultricies nisi nam eget dui etiam rhoncus maecenas tempus.",
        },
      },
      {
        left: {
          hall: "CAEx ALPHA HALL",
          time: "16.30 – 17.20",
        },
        right: {
          hall: "Diploma in Consequat",
          title: "day_1_program_5_title",
          // description:
          //   "Curabitur ullamcorper ultricies nisi nam eget dui etiam rhoncus maecenas tempus.",
        },
      },
    ],
  },
  {
    day: "day_2",
    events: [
      {
        left: {
          hall: "CAEx ALPHA HALL",
          time: "10.00 – 10.50",
        },
        right: {
          hall: "Diploma in Consequat",
          title: "day_2_program_1_title",
          // description:
          //   "Curabitur ullamcorper ultricies nisi nam eget dui etiam rhoncus maecenas tempus.",
        },
      },
      {
        left: {
          hall: "CAEx ALPHA HALL",
          time: "11.00 – 11.50",
        },
        right: {
          hall: "Master of Fine Arts & Graphic Design",
          title: "day_2_program_2_title",
          // description:
          //   "Curabitur ullamcorper ultricies nisi nam eget dui etiam rhoncus maecenas tempus.",
        },
      },
      {
        left: {
          hall: "CAEx ALPHA HALL",
          time: "12.00 – 12.50",
        },
        right: {
          hall: "Bachelor of Fine Arts & Graphic Design",
          title: "day_2_program_3_title",
          // description:
          //   "Curabitur ullamcorper ultricies nisi nam eget dui etiam rhoncus maecenas tempus.",
        },
      },
      {
        left: {
          hall: "CAEx ALPHA HALL",
          time: "14.30 – 15.20",
        },
        right: {
          hall: "Bachelor of Fine Arts & Graphic Design",
          title: "day_2_program_4_title",
          // description:
          //   "Curabitur ullamcorper ultricies nisi nam eget dui etiam rhoncus maecenas tempus.",
        },
      },
      {
        left: {
          hall: "CAEx ALPHA HALL",
          time: "15.30 – 16.20",
        },
        right: {
          hall: "Bachelor of Fine Arts & Graphic Design",
          title: "day_2_program_5_title",
          // description:
          //   "Curabitur ullamcorper ultricies nisi nam eget dui etiam rhoncus maecenas tempus.",
        },
      },
      {
        left: {
          hall: "CAEx ALPHA HALL",
          time: "16.30 – 17.20",
        },
        right: {
          hall: "Bachelor of Fine Arts & Graphic Design",
          title: "day_2_program_6_title",
          // description:
          //   "Curabitur ullamcorper ultricies nisi nam eget dui etiam rhoncus maecenas tempus.",
        },
      },
    ],
  },
  {
    day: "day_3",
    events: [
      {
        left: {
          hall: "CAEx ALPHA HALL",
          time: "10.00-13.00",
        },
        right: {
          hall: "Diploma in Consequat",
          title: "day_3_program_1_title",
          // description:
          //   "Curabitur ullamcorper ultricies nisi nam eget dui etiam rhoncus maecenas tempus.",
        },
      },
       {
        left: {
          hall: "CAEx ALPHA HALL",
          time: "14.00-16.00",
        },
        right: {
          hall: "Diploma in Consequat",
          title: "day_3_program_2_title",
          // description:
          //   "Curabitur ullamcorper ultricies nisi nam eget dui etiam rhoncus maecenas tempus.",
        },
      },
    ],
  },
];

export default function ProgramSection() {
  const t = useTranslations("program");
  const [visibleCount, setVisibleCount] = useState(1);
  const [isShowMoreVisible1, setIsShowMoreVisible1] = useState(3);
  const [isShowMoreVisible2, setIsShowMoreVisible2] = useState(3);
  const [isShowMoreVisible3, setIsShowMoreVisible3] = useState(3);

  // Faqat visibleCount ta kunni ko'rsatadi
  const visibleDays1 = programData.slice(0, 1);
  const visibleDays2 = programData.slice(1, 2);
  const visibleDays3 = programData.slice(2, 3);

  const handleShowMore = () => {
    if (visibleCount < programData.length) {
      setVisibleCount(visibleCount + 1);
    }
  };

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
              {visibleDays1.map((dayItem, dayIdx) => (
                <div
                  className="resume-block"
                  key={dayItem.day}
                  data-aos="fade-up"
                  data-aos-delay={100 + dayIdx * 100}
                >
                  <h2 className="text-black dark:!text-white">
                    {t(dayItem.day)}
                  </h2>
                  <div className="timeline">
                    {dayItem.events
                      .slice(0, isShowMoreVisible1)
                      .map((event, eventIdx) => (
                        <div
                          className="timeline-item border-gray-200 dark:border-gray-700"
                          key={eventIdx}
                          data-aos="fade-up"
                          data-aos-delay={200 + eventIdx * 100}
                        >
                          <div className="timeline-left">
                            <Link href="/program-detail">
                              <h4 className="company mb-0 !text-black dark:!text-white cursor-pointer hover:text-blue-500 dark:hover:text-blue-400">
                                {event.left.hall}
                              </h4>
                            </Link>
                            <span className="period text-black dark:!text-gray-400">
                              {event.left.time}
                            </span>
                          </div>
                          <div className="timeline-dot bg-blue-500 dark:bg-blue-600"></div>
                          <div className="timeline-right">
                            <Link href="/program-detail">
                              <h3 className="position mb-0 !text-[#0085d4] dark:!text-blue-500 cursor-pointer hover:!text-black dark:hover:text-blue-400">
                                {t(event.right.title)}
                              </h3>
                            </Link>
                            <p className="description m-0 text-gray-700 dark:text-gray-300">
                              {event.right.description}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}

              {visibleDays1[0].events.length !== isShowMoreVisible1 && (
                <div
                  className="text-center mt-8 cursor-pointer"
                  onClick={() => {
                    setIsShowMoreVisible1(visibleDays1[0].events.length);
                    handleShowMore();
                  }}
                  data-aos="fade-up" data-aos-delay="100"
                >
                  <span className="text-lg text-gray-800 font-bold">
                    {t("LOAD_MORE")}
                  </span>
                  <DownCircleOutlined className="inline-block ml-2 text-lg !text-gray-800" />
                </div>
              )}

              {visibleDays2.map((dayItem, dayIdx) => (
                <div
                  className="resume-block"
                  key={dayItem.day}
                  data-aos="fade-up"
                  data-aos-delay={100 + dayIdx * 100}
                >
                  <h2 className="text-black dark:!text-white">
                    {t(dayItem.day)}
                  </h2>
                  <div className="timeline">
                    {dayItem.events
                      .slice(0, isShowMoreVisible2)
                      .map((event, eventIdx) => (
                        <div
                          className="timeline-item border-gray-200 dark:border-gray-700"
                          key={eventIdx}
                          data-aos="fade-up"
                          data-aos-delay={200 + eventIdx * 100}
                        >
                          <div className="timeline-left">
                            <Link href="/program-detail">
                              <h4 className="company mb-0 !text-black dark:!text-white cursor-pointer hover:text-blue-500 dark:hover:text-blue-400">
                                {event.left.hall}
                              </h4>
                            </Link>
                            <span className="period text-black dark:!text-gray-400">
                              {event.left.time}
                            </span>
                          </div>
                          <div className="timeline-dot bg-blue-500 dark:bg-blue-600"></div>
                          <div className="timeline-right">
                            <Link href="/program-detail">
                              <h3 className="position mb-0 !text-[#0085d4] dark:!text-blue-500 cursor-pointer hover:!text-black dark:hover:text-blue-400">
                                {t(event.right.title)}
                              </h3>
                            </Link>
                            <p className="description m-0 text-gray-700 dark:text-gray-300">
                              {event.right.description}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
              {visibleDays2[0].events.length !== isShowMoreVisible2 && (
                <div
                  className="text-center mt-8 cursor-pointer"
                  onClick={() => {
                    setIsShowMoreVisible2(visibleDays2[0].events.length);
                  }}
                  data-aos="fade-up" data-aos-delay="100"
                >
                  <span className="text-lg text-gray-800 font-bold">
                    {t("LOAD_MORE")}
                  </span>
                  <DownCircleOutlined className="inline-block ml-2 text-lg !text-gray-800" />
                </div>
              )}
              {visibleDays3.map((dayItem, dayIdx) => (
                <div
                  className="resume-block"
                  key={dayItem.day}
                  data-aos="fade-up"
                  data-aos-delay={100 + dayIdx * 100}
                >
                  <h2 className="text-black dark:!text-white">
                    {t(dayItem.day)}
                  </h2>
                  <div className="timeline">
                    {dayItem.events
                      .slice(0, isShowMoreVisible3)
                      .map((event, eventIdx) => (
                        <div
                          className="timeline-item border-gray-200 dark:border-gray-700"
                          key={eventIdx}
                          data-aos="fade-up"
                          data-aos-delay={200 + eventIdx * 100}
                        >
                          <div className="timeline-left">
                            <Link href="/program-detail">
                              <h4 className="company mb-0 !text-black dark:!text-white cursor-pointer hover:text-blue-500 dark:hover:text-blue-400">
                                {event.left.hall}
                              </h4>
                            </Link>
                            <span className="period text-black dark:!text-gray-400">
                              {event.left.time}
                            </span>
                          </div>
                          <div className="timeline-dot bg-blue-500 dark:bg-blue-600"></div>
                          <div className="timeline-right">
                            <Link href="/program-detail">
                              <h3 className="position mb-0 !text-[#0085d4] dark:!text-blue-500 cursor-pointer hover:!text-black dark:hover:text-blue-400">
                                {t(event.right.title)}
                              </h3>
                            </Link>
                            <p className="description m-0 text-gray-700 dark:text-gray-300">
                              {event.right.description}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
              {/* {visibleDays3[0].events.length !== isShowMoreVisible3 && (
                <div
                  className="text-center mt-8 cursor-pointer"
                  onClick={() => {
                    setIsShowMoreVisible3(visibleDays3[0].events.length);
                  }}
                >
                  <span className="text-lg text-[#0085d4] font-bold">
                    {t("LOAD_MORE")}
                  </span>
                  <DownCircleOutlined className="inline-block ml-2 text-lg !text-[#0085d4]" />
                </div>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
