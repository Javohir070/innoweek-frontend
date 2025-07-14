"use client"
import { ChevronLeft, ChevronRight, Map, MoveRightIcon } from 'lucide-react'
import { useState, useRef } from 'react'

export default function StatsSection() {
  const [currentLang, setCurrentLang] = useState('uz')
  const scrollContainerRef = useRef(null)

  const stats = [
    {
      value: "4 000 m2",
      title: {
        uz: "Ko'rgazma maydoni",
        ru: "Выставочная площадь",
        en: "Exhibition area"
      },
      description: {
        uz: "Tadbirlar uchun alohida 2000m2",
        ru: "2000 м2 отдельно для мероприятий",
        en: "2000 m2 separately for events"
      },
      icon: <Map className='text-yellow-500' />
    },
    {
        value: "4 000 m2",
        title: {
          uz: "Ko'rgazma maydoni",
          ru: "Выставочная площадь",
          en: "Exhibition area"
        },
        description: {
          uz: "Tadbirlar uchun alohida 2000m2",
          ru: "2000 м2 отдельно для мероприятий",
          en: "2000 m2 separately for events"
        },
        icon: <Map className='text-yellow-500' />
      },
      {
        value: "4 000 m2",
        title: {
          uz: "Ko'rgazma maydoni",
          ru: "Выставочная площадь",
          en: "Exhibition area"
        },
        description: {
          uz: "Tadbirlar uchun alohida 2000m2",
          ru: "2000 м2 отдельно для мероприятий",
          en: "2000 m2 separately for events"
        },
        icon: <Map className='text-yellow-500' />
      },
      {
        value: "4 000 m2",
        title: {
          uz: "Ko'rgazma maydoni",
          ru: "Выставочная площадь",
          en: "Exhibition area"
        },
        description: {
          uz: "Tadbirlar uchun alohida 2000m2",
          ru: "2000 м2 отдельно для мероприятий",
          en: "2000 m2 separately for events"
        },
        icon: <Map className='text-yellow-500' />
      },
      {
        value: "4 000 m2",
        title: {
          uz: "Ko'rgazma maydoni",
          ru: "Выставочная площадь",
          en: "Exhibition area"
        },
        description: {
          uz: "Tadbirlar uchun alohida 2000m2",
          ru: "2000 м2 отдельно для мероприятий",
          en: "2000 m2 separately for events"
        },
        icon: <Map className='text-yellow-500' />
      },
      {
        value: "4 000 m2",
        title: {
          uz: "Ko'rgazma maydoni",
          ru: "Выставочная площадь",
          en: "Exhibition area"
        },
        description: {
          uz: "Tadbirlar uchun alohida 2000m2",
          ru: "2000 м2 отдельно для мероприятий",
          en: "2000 m2 separately for events"
        },
        icon: <Map className='text-yellow-500' />
      },
    // Add more stats...
  ]

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -400,
        behavior: 'smooth'
      })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 400,
        behavior: 'smooth'
      })
    }
  }

  return (
    <section className="relative py-12 px-4 md:px-10 bg-transparent">
      <div className="container section-title absolute z-[20] mt-[-40px]" data-aos="fade-up">
        <h2>INNOWEEK</h2>
        <div>{currentLang === 'uz' ? "QAMROV" : currentLang === 'ru' ? "ОХВАТ" : "COVERAGE"}</div>
      </div>

      <div className="relative">
        <button 
          onClick={scrollLeft}
          className="hidden md:flex absolute left-[-23px] top-1/2 -translate-y-1/2 z-10 bg-gray-900 !rounded-full p-2 shadow hover:bg-yellow-500 transition"
        >
          <ChevronLeft />
        </button>

        <button 
          onClick={scrollRight}
          className="hidden md:flex absolute right-[-23px] top-1/2 -translate-y-1/2 z-10 bg-gray-900 p-2 shadow hover:bg-yellow-500 transition !rounded-full"
        >
          <ChevronRight />
        </button>

        <section className="stats section min-w-full bg-transparent">
          <div className="container" data-aos="fade-left" data-aos-delay="100">
            <div 
              ref={scrollContainerRef}
              id="scrollContainer" 
              className="overflow-x-hidden scroll-smooth flex gap-6 py-2 px-1"
            >
              <div className="g-4 flex gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="col-xl-3 col-lg-6 col-md-6 min-w-[200px] w-[300px]">
                    <div className="metric-card" data-aos="fade-left" data-aos-delay={100 * (index + 1)}>
                      <div className="metric-header">
                        <div className="metric-icon-wrapper">
                         {stat?.icon}
                        </div>
                        <div className="metric-value">
                          <span>{stat.value}</span>
                        </div>
                      </div>
                      <div className="metric-info">
                        <h4>{stat.title[currentLang]}</h4>
                        <p>{stat.description[currentLang]}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  )
}