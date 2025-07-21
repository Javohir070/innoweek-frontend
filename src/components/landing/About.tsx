"use client";
import { useState } from "react";
import about_10 from "@/assets/img/portfolio/portfolio-10.webp";
import about_11 from "@/assets/img/portfolio/portfolio-11.webp";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function AboutSection() {
  const t = useTranslations("about");

  const [currentLang] = useState("uz");

  const features: string[] = [
    t('features_1'),
    t('features_2'),
    t('features_3'),
    t('features_4'),
    t('features_5'),
    t('features_6'),
  ];
  return (
    <section
      id="about"
      className="about section bg-gray-50 dark:bg-gray-900 transition-colors duration-300"
    >
      <div className="container section-title" data-aos="fade-up">
        <h2 className="text-black dark:!text-white">INNOWEEK</h2>
        <div className="text-black dark:!text-gray-300">
          {currentLang === "uz"
            ? "INNOWEEK 2025 HAQIDA"
            : currentLang === "ru"
              ? "О INNOWEEK 2025"
              : "ABOUT INNOWEEK 2025"}
        </div>
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row gy-4 align-items-center justify-content-between">
          <div className="col-xl-5" data-aos="fade-up" data-aos-delay="200">
            <span className="about-meta !text-black dark:!text-white">INNOWEEK 2025</span>
            <h2 className="about-title !text-black dark:!text-white">{t("title")}</h2>
            <p className="about-description text-gray-700 dark:text-gray-300">{t("description")}</p>

            <div className="row feature-list-wrapper">
              <div className="col-md-6">
                <ul className="feature-list">
                  {features.slice(0, 3)
                    .map((feature, index) => (
                      <li key={index} className="text-gray-700 dark:text-gray-300">
                        <i className="bi bi-check-circle-fill text-blue-600 dark:text-blue-400"></i> {feature}
                      </li>
                    ))}
                </ul>
              </div>
              <div className="col-md-6">
                <ul className="feature-list">
                  {features.slice(3)
                    .map((feature, index) => (
                      <li key={index} className="text-gray-700 dark:text-gray-300">
                        <i className="bi bi-check-circle-fill text-blue-600 dark:text-blue-400"></i> {feature}
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="col-xl-6" data-aos="fade-up" data-aos-delay="300">
            <div className="image-wrapper">
              <div
                className="images position-relative"
                data-aos="zoom-out"
                data-aos-delay="400"
              >
                <Image
                  src={about_10}
                  alt="Business Meeting"
                  className="img-fluid main-image rounded-4 shadow-lg dark:shadow-gray-700/50"
                />
                <Image
                  src={about_11}
                  alt="Team Discussion"
                  className="img-fluid small-image rounded-4 shadow-lg dark:shadow-gray-700/50"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}