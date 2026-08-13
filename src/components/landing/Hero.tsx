import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { ArrowRight } from "lucide-react";
import innoweekLogo from "@/assets/img/services/111 copy.svg";
import AppImage from "@/lib/AppImage";
import { useTranslations } from "@/i18n/useTranslations";
import RegisterModal2 from "../auth/RegisterModal2";
import { Link } from "@/lib/navigation";

const HeroVideo = "/video/FINA11L.mp4";
const TARGET_DATE = new Date("2026-10-27T00:00:00");

function getCountdown() {
  const difference = TARGET_DATE.getTime() - Date.now();
  return {
    /** Sana o'tib ketgan — countdown ko'rsatilmaydi */
    expired: difference <= 0,
    days: Math.floor(difference / 86400000),
    hours: Math.floor((difference % 86400000) / 3600000),
    minutes: Math.floor((difference % 3600000) / 60000),
    seconds: Math.floor((difference % 60000) / 1000),
  };
}

export default function HeroSection() {
  const t = useTranslations("hero");
  const [open, setOpen] = useState(false);
  const [countdown, setCountdown] = useState(getCountdown);

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
    if (countdown.expired) return;
    const interval = setInterval(() => setCountdown(getCountdown()), 1000);
    return () => clearInterval(interval);
  }, [countdown.expired]);

  const pad = (n: number) => String(n).padStart(2, "0");

  const countdownItems = [
    { value: String(countdown.days), label: t("day") },
    { value: pad(countdown.hours), label: t("hour") },
    { value: pad(countdown.minutes), label: t("minute") },
    { value: pad(countdown.seconds), label: t("second") },
  ];

  return (
    <>
      <div
        id="hero"
        className="absolute w-full left-0 right-0 overflow-hidden -z-50 !h-screen !min-h-[1100px] lg:!min-h-[800px] xl:!h-screen xl:!min-h-screen"
      >
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#04182e]/85 via-[#04182e]/80 to-[#04182e]/75 lg:bg-gradient-to-r lg:from-[#04182e]/90 lg:via-[#04182e]/70 lg:to-[#04182e]/55 dark:from-[#04182e]/92 dark:via-[#04182e]/88 dark:to-[#04182e]/82 lg:dark:from-[#04182e]/95 lg:dark:via-[#04182e]/80 lg:dark:to-[#04182e]/65"></div>
        <video
          className="absolute w-full h-full object-cover z-0"
          autoPlay
          muted
          loop
        >
          <source src={HeroVideo} type="video/mp4" />
        </video>
      </div>
      <section className="hero section bg-transparent !p-0 !mt-16 xl:!mt-0 !min-h-[1100px] lg:!min-h-[800px] xl:!h-screen xl:!min-h-screen">
        <div className="container bg-transparent">
          <div className="row items-center">
            <div className="col-12 col-lg-7 content-col" data-aos="fade-up">
              <div className="content">
                <div className="main-heading text-white">
                  <h1>{t("Ideas without borders")}</h1>
                </div>

                <div className="description !mt-6 !mb-8">
                  <p className="!text-base !leading-relaxed !text-white/70 lg:!text-lg lg:max-w-[85%]">
                    {t("hero description")}
                  </p>
                </div>

                {!token && (
                  <div className="buttonslink">
                    <Link href="/register">
                      <span className="group inline-flex items-center gap-3 rounded-xl bg-[#0085d4] px-7 py-3.5 text-sm font-semibold uppercase tracking-wide !text-white shadow-lg shadow-[#0085d4]/30 transition-all duration-300 hover:bg-[#006eb3] hover:shadow-xl">
                        {t("REGISTER")}
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </Link>
                  </div>
                )}

                {!countdown.expired && (
                  <div
                    className="mt-10 inline-flex items-stretch rounded-2xl border border-white/20 bg-white/10 px-1 py-4 backdrop-blur-md sm:px-3"
                    data-aos="fade-up"
                    data-aos-delay="200"
                  >
                    {countdownItems.map((item, index) => (
                      <div
                        key={item.label}
                        className={`flex min-w-[68px] flex-col items-center px-3 sm:min-w-[92px] sm:px-6 ${
                          index > 0 ? "border-l border-white/20" : ""
                        }`}
                      >
                        <span className="text-3xl font-bold leading-none text-white sm:text-4xl">
                          {item.value}
                        </span>
                        <span className="mt-2 text-[10px] font-medium uppercase tracking-widest text-white/60 sm:text-xs">
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="col-12 col-lg-5" data-aos="zoom-out">
              <div className="visual-content">
                <div className="fluid-shape">
                  <AppImage
                    src={innoweekLogo}
                    alt="INNOWEEK 2026"
                    className="fluid-img"
                  />
                  <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-white">
                    <span className="text-lg font-semibold tracking-wide sm:text-xl">
                      {t("event_dates")}
                    </span>
                    <span className="hidden h-5 w-px bg-white/40 sm:block" />
                    <span className="text-lg font-semibold tracking-wide sm:text-xl">
                      {t("venue")}
                    </span>
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
