"use client";

import { useTranslations } from "next-intl";

export default function ProgramSection() {
  const t = useTranslations("program");

  return (
    <section id="resume" className="resume section bg-white dark:!bg-[#031119] transition-colors duration-300">
      <div className="container section-title" data-aos="fade-up">
        <h2 className="text-black dark:!text-white" data-uz="INNOWEEK" data-ru="INNOWEEK" data-en="INNOWEEK">
          INNOWEEK
        </h2>
        <div className="text-black dark:!text-gray-300" data-uz="DASTUR" data-ru="ПРОГРАММА" data-en="PROGRAM">
          {t("Latest News")}
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
                        <h4 className="company text-black dark:!text-white">CAEx ALPHA HALL</h4>
                        <span className="period text-blue-500 dark:text-gray-400">10:00 - 12:00</span>
                      </div>
                      <div className="timeline-dot bg-blue-500 dark:bg-blue-600"></div>
                      <div className="timeline-right">
                        <h3 className="position text-black dark:!text-white">CAEx BETA HALL</h3>
                        <p className="description">
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
                        <h4 className="company text-black dark:!text-white ">CAEx BETA HALL</h4>
                        <span className="period text-blue-500 dark:text-gray-400">12:00 - 14:00</span>
                      </div>
                      <div className="timeline-dot bg-blue-500 dark:bg-blue-600"></div>
                      <div className="timeline-right">
                        <h3 className="position text-black dark:!text-white">
                          Master of Fine Arts &amp; Graphic Design
                        </h3>
                        <p className="description text-gray-700 dark:text-gray-300">
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
                        <h4 className="company text-black dark:!text-white ">CAEx GAMA HALL</h4>
                        <span className="period text-gray-600 dark:text-gray-400">15:00 - 17:00</span>
                      </div>
                      <div className="timeline-dot bg-blue-500 dark:bg-blue-600"></div>
                      <div className="timeline-right">
                        <h3 className="position text-black dark:!text-white ">
                          Bachelor of Fine Arts &amp; Graphic Design
                        </h3>
                        <p className="description text-gray-700 dark:text-gray-300">
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
                  <h2 className="text-black dark:!text-white">{t("day_2")}</h2>

                  <div className="timeline">
                    <div
                      className="timeline-item border-gray-200 dark:border-gray-700"
                      data-aos="fade-up"
                      data-aos-delay="200"
                    >
                      <div className="timeline-left">
                        <h4 className="company text-black dark:!text-white ">CAEx ALPHA HALL</h4>
                        <span className="period text-gray-600 dark:text-gray-400">10:00 - 12:00</span>
                      </div>
                      <div className="timeline-dot bg-blue-500 dark:bg-blue-600"></div>
                      <div className="timeline-right">
                        <h3 className="position text-black dark:!text-white ">Diploma in Consequat</h3>
                        <p className="description text-gray-700 dark:text-gray-300">
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
                        <h4 className="company text-black dark:!text-white ">CAEx BETA HALL</h4>
                        <span className="period text-gray-600 dark:text-gray-400">12:00 - 14:00</span>
                      </div>
                      <div className="timeline-dot bg-blue-500 dark:bg-blue-600"></div>
                      <div className="timeline-right">
                        <h3 className="position text-black dark:!text-white">
                          Master of Fine Arts &amp; Graphic Design
                        </h3>
                        <p className="description text-gray-700 dark:text-gray-300">
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
                        <h4 className="company text-black dark:!text-white ">CAEx GAMMA HALL</h4>
                        <span className="period text-gray-600 dark:text-gray-400">15:00 - 17:00</span>
                      </div>
                      <div className="timeline-dot bg-blue-500 dark:bg-blue-600"></div>
                      <div className="timeline-right">
                        <h3 className="position text-black dark:!text-white">
                          Bachelor of Fine Arts &amp; Graphic Design
                        </h3>
                        <p className="description text-gray-700 dark:text-gray-300">
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
                        <h4 className="company text-black dark:!text-white">CAEx ALPHA HALL</h4>
                        <span className="period text-gray-600 dark:text-gray-400">10:00 - 12:00</span>
                      </div>
                      <div className="timeline-dot bg-blue-500 dark:bg-blue-600"></div>
                      <div className="timeline-right">
                        <h3 className="position text-black dark:!text-white">Diploma in Consequat</h3>
                        <p className="description text-gray-700 dark:text-gray-300">
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
                        <h4 className="company text-black dark:!text-white ">CAEx BETA HALL</h4>
                        <span className="period text-gray-600 dark:text-gray-400">12:00 - 14:00</span>
                      </div>
                      <div className="timeline-dot bg-blue-500 dark:bg-blue-600"></div>
                      <div className="timeline-right">
                        <h3 className="position text-black dark:!text-white">
                          Master of Fine Arts &amp; Graphic Design
                        </h3>
                        <p className="description text-gray-700 dark:text-gray-300">
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
                        <h4 className="company text-black dark:!text-white ">CAEx GAMMA HALL</h4>
                        <span className="period text-black dark:!text-white ">15:00 - 17:00</span>
                      </div>
                      <div className="timeline-dot bg-blue-500 dark:bg-blue-600"></div>
                      <div className="timeline-right">
                        <h3 className="position text-black dark:!text-white ">
                          Bachelor of Fine Arts &amp; Graphic Design
                        </h3>
                        <p className="description text-gray-700 dark:text-gray-300">
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