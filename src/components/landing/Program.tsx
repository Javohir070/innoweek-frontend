"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function ProgramSection() {
  const t = useTranslations("program");

  return (
    <section id="resume" className="resume section bg-white dark:!bg-[#031119] transition-colors duration-300">
      <div className="container section-title" data-aos="fade-up">
        <h2 className="text-black dark:!text-white">
          {t("INNOWEEK")}
        </h2>
        <div className="text-black dark:!text-gray-300">
          {t("PROGRAM")}
        </div>
      </div>
      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row">
          <div className="col-12">
            <div className="resume-wrapper">
              <div className="resume-block" data-aos="fade-up">
                <div
                  className="resume-block"
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
                  <h2 className="text-black dark:!text-white ">{t("day_1")}</h2>
                  <div className="timeline">
                    <div
                      className="timeline-item border-gray-200 dark:border-gray-700"
                      data-aos="fade-up"
                      data-aos-delay="200"
                    >
                      <div className="timeline-left">
                        <Link href="/program-detail">
                          <h4 className="company  mb-0   !text-black dark:!text-white cursor-pointer hover:text-blue-500 dark:hover:text-blue-400">CAEx ALPHA HALL</h4>
                        </Link>
                        <span className="period  text-black dark:!text-gray-400">10:00 - 12:00</span>
                      </div>
                      <div className="timeline-dot bg-blue-500 dark:bg-blue-600"></div>
                      <div className="timeline-right">
                        <Link href="/program-detail">
                          <h3 className="position mb-0    !text-[#0085d4] dark:!text-blue-500 cursor-pointer hover:!text-black  dark:hover:text-blue-400">CAEx BETA HALL</h3>
                        </Link>
                        <p className="description m-0">
                          Curabitur ullamcorper ultricies nisi nam eget dui
                          etiam rhoncus maecenas tempus.
                        </p>
                      </div>
                    </div>
                    <div
                      className="timeline-item border-gray-200 dark:border-gray-700"
                      data-aos="fade-up"
                      data-aos-delay="300"
                    >
                      <div className="timeline-left">
                        <Link href="/program-detail">
                          <h4 className="company  mb-0   !text-black dark:!text-white cursor-pointer hover:text-blue-500 dark:hover:text-blue-400">CAEx BETA HALL</h4>
                        </Link>
                        <span className="period  text-black dark:!text-gray-400">12:00 - 14:00</span>
                      </div>
                      <div className="timeline-dot bg-blue-500 dark:bg-blue-600"></div>
                      <div className="timeline-right">
                        <Link href="/program-detail">
                          <h3 className="position mb-0    !text-[#0085d4] dark:!text-blue-500 cursor-pointer hover:!text-black dark:hover:text-blue-400">Master of Fine Arts &amp; Graphic Design</h3>
                        </Link>
                        <p className="description m-0 text-gray-700 dark:text-gray-300">
                          Curabitur ullamcorper ultricies nisi nam eget dui
                          etiam rhoncus maecenas tempus.
                        </p>
                      </div>
                    </div>
                    <div
                      className="timeline-item border-gray-200 dark:border-gray-700"
                      data-aos="fade-up"
                      data-aos-delay="400"
                    >
                      <div className="timeline-left">
                        <Link href="/program-detail">
                          <h4 className="company  mb-0   !text-black dark:!text-white cursor-pointer hover:text-blue-500 dark:hover:text-blue-400">CAEx GAMA HALL</h4>
                        </Link>
                        <span className="period  text-black dark:!text-gray-400">15:00 - 17:00</span>
                      </div>
                      <div className="timeline-dot bg-blue-500 dark:bg-blue-600"></div>
                      <div className="timeline-right">
                        <Link href="/program-detail">
                          <h3 className="position mb-0    !text-[#0085d4] dark:!text-blue-500 cursor-pointer hover:!text-black dark:hover:text-blue-400">Bachelor of Fine Arts &amp; Graphic Design</h3>
                        </Link>
                        <p className="description m-0 text-gray-700 dark:text-gray-300">
                          Curabitur ullamcorper ultricies nisi nam eget dui
                          etiam rhoncus maecenas tempus.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="resume-block"
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
                  <h2 className="!text-black dark:!text-white">{t("day_2")}</h2>
                  <div className="timeline">
                    <div
                      className="timeline-item border-gray-200 dark:border-gray-700"
                      data-aos="fade-up"
                      data-aos-delay="200"
                    >
                      <div className="timeline-left">
                        <Link href="/program-detail">
                          <h4 className="company  mb-0   !text-black dark:!text-white cursor-pointer hover:text-blue-500 dark:hover:text-blue-400">CAEx ALPHA HALL</h4>
                        </Link>
                        <span className="period  text-black dark:!text-gray-400">10:00 - 12:00</span>
                      </div>
                      <div className="timeline-dot bg-blue-500 dark:bg-blue-600"></div>
                      <div className="timeline-right">
                        <Link href="/program-detail">
                          <h3 className="position mb-0    !text-[#0085d4] dark:!text-blue-500 cursor-pointer hover:!text-black dark:hover:text-blue-400">Diploma in Consequat</h3>
                        </Link>
                        <p className="description m-0 text-gray-700 dark:text-gray-300">
                          Curabitur ullamcorper ultricies nisi nam eget dui
                          etiam rhoncus maecenas tempus.
                        </p>
                      </div>
                    </div>
                    <div
                      className="timeline-item border-gray-200 dark:border-gray-700"
                      data-aos="fade-up"
                      data-aos-delay="300"
                    >
                      <div className="timeline-left">
                        <Link href="/program-detail">
                          <h4 className="company  mb-0   !text-black dark:!text-white cursor-pointer hover:text-blue-500 dark:hover:text-blue-400">CAEx BETA HALL</h4>
                        </Link>
                        <span className="period  text-black dark:!text-gray-400">12:00 - 14:00</span>
                      </div>
                      <div className="timeline-dot bg-blue-500 dark:bg-blue-600"></div>
                      <div className="timeline-right">
                        <Link href="/program-detail">
                          <h3 className="position mb-0    !text-[#0085d4] dark:!text-blue-500 cursor-pointer hover:!text-black dark:hover:text-blue-400">Master of Fine Arts &amp; Graphic Design</h3>
                        </Link>
                        <p className="description m-0 text-gray-700 dark:text-gray-300">
                          Curabitur ullamcorper ultricies nisi nam eget dui
                          etiam rhoncus maecenas tempus.
                        </p>
                      </div>
                    </div>
                    <div
                      className="timeline-item border-gray-200 dark:border-gray-700"
                      data-aos="fade-up"
                      data-aos-delay="400"
                    >
                      <div className="timeline-left">
                        <Link href="/program-detail">
                          <h4 className="company  mb-0   !text-black dark:!text-white cursor-pointer hover:text-blue-500 dark:hover:text-blue-400">CAEx GAMMA HALL</h4>
                        </Link>
                        <span className="period  text-black dark:!text-gray-400">15:00 - 17:00</span>
                      </div>
                      <div className="timeline-dot bg-blue-500 dark:bg-blue-600"></div>
                      <div className="timeline-right">
                        <Link href="/program-detail">
                          <h3 className="position mb-0    !text-[#0085d4] dark:!text-blue-500 cursor-pointer hover:!text-black dark:hover:text-blue-400">Bachelor of Fine Arts &amp; Graphic Design</h3>
                        </Link>
                        <p className="description m-0 text-gray-700 dark:text-gray-300">
                          Curabitur ullamcorper ultricies nisi nam eget dui
                          etiam rhoncus maecenas tempus.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="resume-block"
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
                  <h2 className="text-black dark:!text-white ">{t("day_3")}</h2>
                  <div className="timeline">
                    <div
                      className="timeline-item border-gray-200 dark:border-gray-700"
                      data-aos="fade-up"
                      data-aos-delay="200"
                    >
                      <div className="timeline-left">
                        <Link href="/program-detail">
                          <h4 className="company  mb-0   text-black dark:!text-white cursor-pointer hover:text-blue-500 dark:hover:text-blue-400">CAEx ALPHA HALL</h4>
                        </Link>
                        <span className="period  text-black dark:!text-gray-400">10:00 - 12:00</span>
                      </div>
                      <div className="timeline-dot bg-blue-500 dark:bg-blue-600"></div>
                      <div className="timeline-right">
                        <Link href="/program-detail">
                          <h3 className="position mb-0    !text-[#0085d4] dark:!text-blue-500 cursor-pointer hover:!text-black dark:hover:text-blue-400">Diploma in Consequat</h3>
                        </Link>
                        <p className="description m-0 text-gray-700 dark:text-gray-300">
                          Curabitur ullamcorper ultricies nisi nam eget dui
                          etiam rhoncus maecenas tempus.
                        </p>
                      </div>
                    </div>
                    <div
                      className="timeline-item border-gray-200 dark:border-gray-700"
                      data-aos="fade-up"
                      data-aos-delay="300"
                    >
                      <div className="timeline-left">
                        <Link href="/program-detail">
                          <h4 className="company  mb-0   text-black dark:!text-white cursor-pointer hover:text-blue-500 dark:hover:text-blue-400">CAEx BETA HALL</h4>
                        </Link>
                        <span className="period  text-black dark:!text-gray-400">12:00 - 14:00</span>
                      </div>
                      <div className="timeline-dot bg-blue-500 dark:bg-blue-600"></div>
                      <div className="timeline-right">
                        <Link href="/program-detail">
                          <h3 className="position mb-0 !text-[#0085d4] dark:!text-blue-500 cursor-pointer hover:!text-black dark:hover:text-blue-400">Master of Fine Arts &amp; Graphic Design</h3>
                        </Link>
                        <p className="description m-0 text-gray-700 dark:text-gray-300">
                          Curabitur ullamcorper ultricies nisi nam eget dui
                          etiam rhoncus maecenas tempus.
                        </p>
                      </div>
                    </div>
                    <div
                      className="timeline-item border-gray-200 dark:border-gray-700"
                      data-aos="fade-up"
                      data-aos-delay="400"
                    >
                      <div className="timeline-left">
                        <Link href="/program-detail">
                          <h4 className="company  mb-0   text-black dark:!text-white cursor-pointer hover:text-blue-500 dark:hover:text-blue-400">CAEx GAMMA HALL</h4>
                        </Link>
                        <span className="period  text-black dark:!text-gray-400 ">15:00 - 17:00</span>
                      </div>
                      <div className="timeline-dot bg-blue-500 dark:bg-blue-600"></div>
                      <div className="timeline-right">
                        <Link href="/program-detail">
                          <h3 className="position mb-0   !text-[#0085d4] dark:!text-blue-500 cursor-pointer hover:!text-black dark:hover:text-blue-400">Bachelor of Fine Arts &amp; Graphic Design</h3>
                        </Link>
                        <p className="description m-0 text-gray-700 dark:text-gray-300">
                          Curabitur ullamcorper ultricies nisi nam eget dui
                          etiam rhoncus maecenas tempus.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}