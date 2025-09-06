"use client";
import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import innoweekLogo from "@/assets/img/services/1234.png";
import Image from "next/image";
import { useTranslations } from "next-intl";
import RegisterModal2 from "../auth/RegisterModal2";
import { Link } from "@/i18n/navigation";
const HeroVideo = "/video/1.mp4";

export default function HeroSection() {
  const t = useTranslations("hero");
  const [open, setOpen] = useState(false);
  // Countdown timer logic
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }, []);

  useEffect(() => {
    const targetDate = new Date("2025-10-09T00:00:00");
    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setCountdown({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div
        id="hero"
        className="absolute w-full left-0 right-0 !h-screen !max-h-[992px] !min-h-[1100px] lg:!min-h-[800px] overflow-hidden -z-50"
      >
        <div className="absolute inset-0 bg-black/55 dark:bg-black/70 backdrop-blur-[0,5px] z-[1]"></div>
        <video
          className="absolute w-full h-full object-cover z-0"
          autoPlay
          muted
          loop
        >
          <source src={HeroVideo} type="video/mp4" />
        </video>
      </div>
      <section className="hero section bg-transparent !h-[60vh] !max-h-[992px] !min-h-[1100px] lg:!min-h-[800px] mt-0  !p-0 !mt-16 xl:!mt-0">
        <div className="container bg-transparent">
          <div className="row">
            <div className="col-lg-7 content-col" data-aos="fade-up">
              <div className="content">
                <div className="main-heading">
                  <h1>{t("Ideas without borders")}</h1>
                </div>

                <div className="divider"></div>

                <div className="description">
                  <p className="text-white">{t("hero description")}</p>
                </div>

                <div className="buttonslink">
                  {/* <div className="cta-button hover:bg-[#e3a127] rounded-full">
                    <Link href="#services" className="btn border">
                      <span className="text-white">{t("hero btn")}</span>
                    </Link>
                  </div> */}
                  {!token && (
                    <div className="cta-button hover:bg-[#e3a127] hover:border-[#e3a127] rounded-full">
                      <Link href="/register" className="btn border">
                        <span className="text-white">{t("REGISTER")}</span>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="col-lg-5" data-aos="zoom-out">
              <div className="visual-content">
                <div className="fluid-shape">
                  <Image
                    src={innoweekLogo}
                    alt="Abstract Fluid Shape"
                    className="fluid-img"
                  />
                  <div className="timer-container">
                    <div className="countdown" id="countdown">
                      <div className="time-box dark:bg-[#1b262c] bg-blue-500 text-white dark:!text-[#aaa] flex flex-col items-start">
                        <span>{countdown.days}</span>
                        <div className="time-label">{t("day")}</div>
                      </div>
                      <div className="time-box dark:bg-[#1b262c] bg-blue-500 text-white dark:!text-[#aaa] flex flex-col items-start">
                        <span>{countdown.hours}</span>
                        <div className="time-label">{t("hour")}</div>
                      </div>
                      <div className="time-box dark:bg-[#1b262c] bg-blue-500 text-white dark:!text-[#aaa] flex flex-col items-start">
                        <span>{countdown.minutes}</span>
                        <div className="time-label">{t("minute")}</div>
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
        {!token && (
          <RegisterModal2 open={open} onClose={() => setOpen(false)} />
        )}
      </section>
    </>
  );
}
