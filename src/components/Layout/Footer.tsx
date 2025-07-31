import bg from "@/assets/img/footer_bg.png";
import footer_logo from "@/assets/img/services/1234.png";
import Image from "next/image";
import {
  RiFacebookBoxFill,
  RiInstagramFill,
  RiTelegram2Fill,
  RiYoutubeFill,
} from "react-icons/ri";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const Footer = () => {
  const t = useTranslations("footer");
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { name: t("home"), href: "#" },
    { name: t("news"), href: "#" },
    { name: t("about_innoweek"), href: "#" },
    { name: t("coverage"), href: "#" },
    { name: t("program"), href: "#" },
    { name: t("speakers"), href: "#" },
    { name: t("partners"), href: "#" },
    { name: t("feedback"), href: "#" },
    { name: t("gallery"), href: "#" },
    { name: t("faq"), href: "#" },
    { name: t("contact"), href: "#" },
    { name: t("map"), href: "#" },
  ];

  return (
    <footer className="bg-gray-900 text-white relative">
      <div
        className="absolute inset-0 bg-black opacity-70"
        style={{
          backgroundImage: `url(${bg.src})`,
          backgroundSize: "100% 100%",
          backgroundPosition: "center center",
          zIndex: 0,
        }}
      ></div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div className="md:w-1/4">
            <div className="flex flex-row items-center gap-4">
              <Image src={footer_logo} alt="Footer Logo" className="w-32" />
            </div>
            <p className="text-lg mb-1 ml-1.5">Follow Us</p>
            <ul className="list-none p-0 flex flex-row gap-4 ml-1.5">
              <li className="mb-2">
                <a
                  href="https://www.instagram.com/innovation.gov.uz?igsh=MXNxazh3anNmdjNsOQ=="
                  className="text-white hover:text-white transition"
                >
                  <RiInstagramFill className="inline-block text-2xl" />
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="https://www.facebook.com/innovation.gov.uz"
                  className="text-white hover:text-white transition"
                >
                  <RiFacebookBoxFill className="inline-block text-2xl" />
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="https://www.youtube.com/@innovation.gov-uz"
                  className="text-white hover:text-white transition"
                >
                  <RiYoutubeFill className="inline-block text-2xl" />
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="https://t.me/innovatsion_rivojlanish"
                  className="text-white hover:text-white transition"
                >
                  <RiTelegram2Fill className="inline-block text-2xl" />
                </a>
              </li>
            </ul>
          </div>

          {/* Linklar qismi */}
          <div className="md:w-3/4 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {[0, 1, 2].map((colIdx) => (
              <div key={colIdx}>
                <ul className="space-y-2">
                  {footerLinks
                    .slice(
                      colIdx * 4,
                      colIdx === 2 ? footerLinks.length : (colIdx + 1) * 4
                    )
                    .map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-white cursor-pointer hover:text-blue-500 transition"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-6 text-center text-sm">
          {t("All Rights Reserved © 2025")} {currentYear}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
