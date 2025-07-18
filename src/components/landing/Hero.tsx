"use client"
import { useState, useEffect } from 'react'
import Link from 'next/link'
import AOS from 'aos'
import 'aos/dist/aos.css'
import innoweekLogo from '@/assets/img/services/1234.png'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import RegisterModal from '../auth/RegisterModal'


export default function HeroSection() {
  const t = useTranslations('hero')
  const [open, setOpen] = useState(false);
  // Countdown timer logic
  const targetDate = new Date('2025-10-09T00:00:00')
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      const difference = targetDate.getTime() - now.getTime()

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      setCountdown({ days, hours, minutes, seconds })
    }, 1000)

    return () => clearInterval(interval)
  }, [])


  return (
    <section className="hero section bg-transparent">
      <div className="container bg-transparent">
        <div className="row">
          <div className="col-lg-7 content-col" data-aos="fade-up">
            <div className="content">
              <div className="main-heading">
                <h1>{t("Ideas without borders")}</h1>
              </div>

              <div className="divider"></div>

              <div className="description">
                <p className='text-white'>{t("hero description")}</p>
              </div>
              
              <div className="buttonslink">
                <div className="cta-button">
                  <Link href="#services" className="btn border">
                    <span className='text-white'>{t('hero btn')}</span>
                  </Link>
                </div>
                <div className="cta-button">
                  <button className="btn border" onClick={() => setOpen(true)}>
                    <span className='text-white'>{t("REGISTER")}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-5" data-aos="zoom-out">
            <div className="visual-content">
              <div className="fluid-shape">
                <Image src={innoweekLogo} alt="Abstract Fluid Shape" className="fluid-img" />
                <div className="timer-container">
                  <div className="countdown" id="countdown">
                    <div className="time-box dark:bg-[#1b262c] bg-blue-500 text-white dark:!text-[#aaa] flex flex-col items-start">
                      <span>{countdown.days}</span>
                      <div className="time-label">{t('day')}</div>
                    </div>
                    <div className="time-box dark:bg-[#1b262c] bg-blue-500 text-white dark:!text-[#aaa] flex flex-col items-start">
                      <span>{countdown.hours}</span>
                      <div className="time-label">{t("hour")}</div>
                    </div>
                    <div className="time-box dark:bg-[#1b262c] bg-blue-500 text-white dark:!text-[#aaa] flex flex-col items-start">
                      <span>{countdown.minutes}</span>
                      <div className="time-label">{t('minute')}</div>
                    </div>
                    <div className="time-box dark:bg-[#1b262c] bg-blue-500 text-white dark:!text-[#aaa] flex flex-col items-start">
                      <span>{countdown.seconds}</span>
                      <div className="time-label">{t("second")}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <RegisterModal open={open} onClose={() => setOpen(false)} />
    </section>
  )
}