import { BASE_URL } from "@/api/FetchInstance";
import { useTranslations } from "@/i18n/useTranslations";
import { useState } from "react";
import {
  Clock,
  Headphones,
  Mail,
  Map as MapIcon,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  Tag,
  User,
} from "lucide-react";
import {
  RiFacebookBoxFill,
  RiInstagramFill,
  RiTelegram2Fill,
  RiYoutubeFill,
} from "react-icons/ri";

/** Xarita nuqtasi — iframe va «Xaritada ochish» havolasi shu koordinatadan foydalanadi */
const MAP_COORDS = "41.326772,69.422445";
const MAP_EMBED = `https://maps.google.com/maps?q=${MAP_COORDS}&z=16&hl=uz&output=embed`;
const MAP_LINK = `https://maps.google.com/?q=${MAP_COORDS}`;

const EMAIL = "innoweek@ilmiy.uz";
const PHONE = "+998 71 203 32 31";
const WORKING_HOURS = "09:00 - 18:00";

const SOCIALS = [
  { href: "https://t.me/innovatsion_rivojlanish", Icon: RiTelegram2Fill, label: "Telegram" },
  { href: "https://www.facebook.com/innovation.gov.uz", Icon: RiFacebookBoxFill, label: "Facebook" },
  { href: "https://www.youtube.com/@innovation.gov-uz", Icon: RiYoutubeFill, label: "YouTube" },
  {
    href: "https://www.instagram.com/innovation.gov.uz?igsh=MXNxazh3anNmdjNsOQ==",
    Icon: RiInstagramFill,
    label: "Instagram",
  },
];

const ContactSection = () => {
  const t = useTranslations("contact");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSent(false);

    try {
      const response = await fetch(`${BASE_URL}/api/v1.0/offer/store`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_name: formData.name,
          title: formData.subject,
          description: formData.message,
          email: formData.email,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSent(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setError(data.error || t("form_error"));
      }
    } catch (err) {
      console.error(err);
      setError(t("form_error"));
    } finally {
      setLoading(false);
    }
  };

  /** Ma'lumot kartalari — rasmdagi 2x2 joylashuv */
  const infoCards = [
    { Icon: MapPin, title: t("address_title"), value: t("address_value") },
    { Icon: Mail, title: t("email_title"), value: EMAIL },
    { Icon: Phone, title: t("phone_title"), value: PHONE },
    { Icon: Clock, title: t("working_hours"), value: WORKING_HOURS },
  ];

  const inputClass =
    "w-full rounded-lg border border-white/40 bg-white py-2 !pl-10 pr-3 text-sm text-[#0b2545] placeholder:text-gray-400 outline-none focus:border-white focus:ring-2 focus:ring-white/50";

  return (
    <section
      id="contact"
      className="!py-4"
    >
      <div className="container">
        {/* Sarlavha */}
        <div className="section-title !pb-4" data-aos="fade-up">
          {/* <h2 className="text-black dark:!text-white">{t("INNOWEEK")}</h2> */}
          <div className="text-black dark:!text-white">{t("CONTACT")}</div>
        </div>

        <div
          className="grid grid-cols-1 gap-4 xl:grid-cols-[45%_minmax(0,1fr)]"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          {/* Xarita */}
          <div className="flex flex-col overflow-hidden rounded-2xl shadow-[0_6px_24px_rgba(11,37,69,0.09)]">
            <iframe
              title="CAEx map"
              src={MAP_EMBED}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[240px] w-full flex-1 border-0 bg-white dark:bg-gray-800 xl:h-auto xl:min-h-[300px]"
            />
            {/* Manzil paneli */}
            <div className="flex flex-wrap items-center gap-3 bg-[#0b2545] px-4 py-3 dark:bg-gray-900">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white">
                <MapIcon className="h-4 w-4" />
              </span>
              <p className="!m-0 min-w-0 flex-1 !text-[13px] !leading-snug !text-white">
                {t("address_title")}: {t("address_value")}
              </p>
              <a
                href={MAP_LINK}
                target="_blank"
                rel="noreferrer"
                className="shrink-0 rounded-lg bg-[#0085d4] px-3 py-1.5 text-[13px] font-semibold !text-white !no-underline transition-colors hover:bg-[#006eb3]"
              >
                {t("open_map")} →
              </a>
            </div>
          </div>

          {/* O'ng ustun */}
          <div className="flex flex-col gap-4">
            {/* Ma'lumot kartalari */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {infoCards.map(({ Icon, title, value }) => (
                <div
                  key={title}
                  className="flex items-start gap-3 rounded-xl bg-white p-3 shadow-[0_4px_16px_rgba(11,37,69,0.07)] transition-shadow duration-300 hover:shadow-[0_8px_24px_rgba(11,37,69,0.12)] dark:bg-gray-800"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#0085d4]/10 text-[#0085d4] dark:bg-[#0085d4]/20">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <h4 className="!m-0 !text-[13px] !font-bold uppercase tracking-wide !text-[#0085d4]">
                      {title}
                    </h4>
                    <p className="!m-0 !mt-1 !text-[13px] !leading-snug !text-gray-600 dark:!text-gray-300">
                      {value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Hamkorlik shakli */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0085d4] to-[#0069b3] p-4 text-white shadow-[0_8px_28px_rgba(0,133,212,0.25)] dark:from-gray-800 dark:to-gray-900">
              {/* Bezak nuqtalar */}
              <div
                aria-hidden
                className="pointer-events-none absolute right-3 top-3 h-14 w-20"
                style={{
                  backgroundImage:
                    "radial-gradient(#ffffff 1.3px, transparent 1.3px)",
                  backgroundSize: "8px 8px",
                  opacity: 0.28,
                }}
              />
              <h3 className="!m-0 !text-lg !font-bold !text-white">
                {t("partnership_title")}
              </h3>
              <p className="!mb-4 !mt-1 line-clamp-2 !text-[13px] !leading-relaxed !text-white/85">
                {t("partnership_text")}
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="relative">
                    <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#0085d4]" />
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className={inputClass}
                      placeholder={t("form_name_placeholder")}
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#0085d4]" />
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className={inputClass}
                      placeholder={t("form_email_placeholder")}
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="relative">
                  <Tag className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#0085d4]" />
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    className={inputClass}
                    placeholder={t("form_subject_placeholder")}
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="relative">
                  <MessageSquare className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-[#0085d4]" />
                  <textarea
                    name="message"
                    rows={2}
                    className={`${inputClass} resize-y`}
                    placeholder={t("form_message_placeholder")}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2 text-sm font-bold !text-[#0085d4] transition-colors duration-300 hover:bg-[#0b2545] hover:!text-white disabled:opacity-60"
                  >
                    {t("form_submit")}
                    <Send className="h-4 w-4" />
                  </button>

                  {loading && (
                    <span className="text-sm text-white/90">
                      {t("form_loading")}
                    </span>
                  )}
                  {error && (
                    <span className="text-sm font-medium text-yellow-200">
                      {error}
                    </span>
                  )}
                  {sent && (
                    <span className="text-sm font-medium text-white">
                      {t("form_sent_message")}
                    </span>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Yordam paneli */}
        <div
          className="mt-4 flex flex-col items-start gap-4 rounded-2xl bg-white px-5 py-3 shadow-[0_4px_16px_rgba(11,37,69,0.07)] sm:flex-row sm:items-center dark:bg-gray-800"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#0085d4]/10 text-[#0085d4] dark:bg-[#0085d4]/20">
            <Headphones className="h-6 w-6" />
          </span>
          <div className="min-w-0 flex-1">
            <h4 className="!m-0 !text-[14px] !font-bold uppercase !text-[#0b2545] dark:!text-white">
              {t("help_title")}
            </h4>
            <p className="!m-0 !mt-1 !text-[13px] !text-gray-500 dark:!text-gray-400">
              {t("help_text")}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            {SOCIALS.map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                title={label}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0085d4]/10 !text-[#0085d4] !no-underline transition-colors duration-300 hover:bg-[#0085d4] hover:!text-white dark:bg-[#0085d4]/20"
              >
                <Icon className="text-xl" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
