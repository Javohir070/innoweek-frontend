"use client"
import { useState } from "react"
import about_10 from '@/assets/img/portfolio/portfolio-10.webp'
import about_11 from '@/assets/img/portfolio/portfolio-11.webp'
import Image from "next/image"

export default function AboutSection() {
    const [currentLang, setCurrentLang] = useState('uz')
  
    const translations = {
      uz: {
        title: "CHEGARASIZ G'OYALAR",
        description: "Xalqaro innovatsion g'oyalar haftaligi — 'Innoweek.uz' respublikada innovatsion rivojlanishni jadallashtirish, iqtisodiyotning barcha tarmoqlarida innovatsiyalar va texnologiyalarni keng tatbiq qilish...",
        features: [
          "Deep tech & AI",
          "Health tech & Biotech",
          "EdTech & eLearning",
          "Agri tech & Green tech",
          "Smart Cities",
          "Robotics & Drones"
        ]
      },
      ru: {
        title: "ИДЕИ БЕЗ ГРАНИЦ",
        description: "Международная неделя инновационных идей – «Innoweek.uz» проводится с 2018 года с целью ускорения инновационного развития, широкого внедрения инноваций и технологий во всех отраслях экономики...",
        features: [
          "Deep tech & AI",
          "Health tech & Biotech",
          "EdTech & eLearning",
          "Agri tech & Green tech",
          "Smart Cities",
          "Robotics & Drones"
        ]
      },
      en: {
        title: "IDEAS WITHOUT BORDERS",
        description: "The International Week of Innovative Ideas — 'Innoweek.uz' has been held since 2018 to accelerate innovative development in Uzbekistan, widespread implementation of innovations and technologies in all sectors of the economy...",
        features: [
          "Deep tech & AI",
          "Health tech & Biotech",
          "EdTech & eLearning",
          "Agri tech & Green tech",
          "Smart Cities",
          "Robotics & Drones"
        ]
      }
    }
  
    return (
      <section id="about" className="about section light-background bg-transparent">
        <div className="container section-title" data-aos="fade-up">
          <h2>INNOWEEK</h2>
          <div>{currentLang === 'uz' ? "INNOWEEK 2025 HAQIDA" : currentLang === 'ru' ? "О INNOWEEK 2025" : "ABOUT INNOWEEK 2025"}</div>
        </div>
  
        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="row gy-4 align-items-center justify-content-between">
            <div className="col-xl-5" data-aos="fade-up" data-aos-delay="200">
              <span className="about-meta">INNOWEEK 2025</span>
              <h2 className="about-title">{translations[currentLang].title}</h2>
              <p className="about-description">{translations[currentLang].description}</p>
  
              <div className="row feature-list-wrapper">
                <div className="col-md-6">
                  <ul className="feature-list">
                    {translations[currentLang].features.slice(0, 3).map((feature, index) => (
                      <li key={index}><i className="bi bi-check-circle-fill"></i> {feature}</li>
                    ))}
                  </ul>
                </div>
                <div className="col-md-6">
                  <ul className="feature-list">
                    {translations[currentLang].features.slice(3).map((feature, index) => (
                      <li key={index}><i className="bi bi-check-circle-fill"></i> {feature}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
  
            <div className="col-xl-6" data-aos="fade-up" data-aos-delay="300">
              <div className="image-wrapper">
                <div className="images position-relative" data-aos="zoom-out" data-aos-delay="400">
                  <Image src={about_10} alt="Business Meeting" className="img-fluid main-image rounded-4" />
                  <Image src={about_11} alt="Team Discussion" className="img-fluid small-image rounded-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }