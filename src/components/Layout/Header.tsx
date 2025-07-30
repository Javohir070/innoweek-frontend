"use client";
import Image from "next/image";
import { useState } from "react";
import { Select } from "antd";
import innoweekLogo from "@/assets/img/services/1234.png";
import { useTranslations } from "next-intl";
import { Link, useRouter as Router } from "@/i18n/navigation";
import { usePathname, useParams, useRouter } from "next/navigation";

export default function Header() {
  const [activeMenu, setActiveMenu] = useState("#hero");
  const t = useTranslations("header");
  const registerLangs = useTranslations("hero");
  const langSwitch = useTranslations("langs");
  const router = Router();
  const routerLang = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [activeLang, setActiveLang] = useState(params.locale ?? "uz");

  // importlar tepasida kerakli state:
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const changeLang = (lang: string) => {
    setActiveLang(lang);
    const newPath = pathname.replace(/^\/(uz|ru|en)/, `/${lang}`);
    routerLang.push(newPath);
  };

  const menu = [
    { label: t("HOME"), key: "/" },
    { label: t("NEWS"), key: "/news" },
    {
      label: t("INNOWEEK"),
      key: "#about",
      dropdown: [
        { label: "INNOWEEK HAQIDA", key: "#about" },
        { label: "QAMROV", key: "#stats" },
        { label: "DASTUR", key: "#resume" },
        { label: "SPIKERLAR", key: "#team" },
        { label: "HAMKORLAR", key: "#clients" },
      ],
    },
    { label: t("GALLERY"), key: "/gallery" },
    { label: t("CONTACT"), key: "#contact" },
  ];

  const sectionAnchors = [
    "#hero",
    "#about",
    "#stats",
    "#resume",
    "#team",
    "#clients",
    "#otziv",
    "#faq",
    "#contact",
    "#spikers",
  ];

  const handleMenuClick = (key: string) => {
    setActiveMenu(key);
  };

  const langOptions = [
    { value: "uz", label: "O‘zbekcha" },
    { value: "en", label: "English" },
    { value: "ru", label: "Русский" },
  ];

  const shortLabel = {
    uz: "UZ",
    en: "EN",
    ru: "RU",
  };

  return (
    <header className="header flex items-center fixed-top bg-white dark:bg-gray-800 text-gray-900 shadow w-full z-50">
      <div className="container-fluid container-xl py-2 flex justify-between items-center w-full">
        <Link
          href="/"
          className="logo d-flex align-items-center me-auto me-xl-0 bg-gray-800 rounded-lg p-2 !pl-4"
        >
          <Image src={innoweekLogo} alt="Logo" className="w-[80px] h-[36px]" />
        </Link>

        <nav id="navmenu" className="navmenu !uppercase">
          <ul>
            {menu.map((item, index) => (
              <li
                key={index}
                className={item.dropdown ? "dropdown " : "hover:scale-105"}
              >
                <Link
                  href={item.key}
                  className={`${
                    activeMenu === item.key ? "active" : ""
                  } !font-raleway !font-semibold !text-black hover:!text-blue-500 dark:!text-amber-50`}
                  onClick={(e) => {
                    if (item.key === "/spikers") {
                      router.push(`/${activeLang}/spikers`);
                      setActiveMenu(item.key);
                      return;
                    }
                    if (sectionAnchors.includes(item.key)) {
                      e.preventDefault();
                      if (
                        pathname === `/${activeLang}` ||
                        pathname === `/${activeLang}/`
                      ) {
                        const el = document.querySelector(item.key);
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                        setActiveMenu(item.key);
                      } else {
                        window.location.href = `/${activeLang}${item.key}`;
                      }
                    } else {
                      handleMenuClick(item.key);
                    }
                  }}
                >
                  {item.dropdown ? <span>{item.label}</span> : item.label}
                </Link>
                {item.dropdown && (
                  <ul>
                    {item.dropdown.map((subItem, subIndex) => (
                      <li key={subIndex}>
                        <Link
                          href={subItem.key}
                          className="!font-raleway !font-semibold !text-black hover:!text-blue-500 dark:!text-amber-50"
                          onClick={(e) => {
                            if (sectionAnchors.includes(subItem.key)) {
                              e.preventDefault();
                              if (
                                pathname === `/${activeLang}` ||
                                pathname === `/${activeLang}/`
                              ) {
                                const el = document.querySelector(subItem.key);
                                if (el)
                                  el.scrollIntoView({ behavior: "smooth" });
                                setActiveMenu(subItem.key);
                              } else {
                                window.location.href = `/${activeLang}${subItem.key}`;
                              }
                            } else {
                              handleMenuClick(subItem.key);
                            }
                          }}
                          scroll={false}
                        >
                          {subItem.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex max-[1200px]:hidden items-center justify-end gap-4">
          <div className="cta-button bg-gray-800 hover:bg-gray-800/70 rounded-full">
            <button
              className="btn !w-[200px] !outline-none px-4 py-2 "
              onClick={() => {
                router.push(`/login`);
              }}
            >
              <span className="text-white text-sm font-medium">
                {registerLangs("LOGIN")}
              </span>
            </button>
          </div>

          <Select
            value={shortLabel[activeLang as keyof typeof shortLabel]}
            onChange={changeLang}
            style={{ width: 80, textAlign: "center" }}
            dropdownMatchSelectWidth={false}
            options={langOptions}
            dropdownRender={(menu) => (
              <div className="bg-white text-center text-blue-600 font-medium">
                {menu}
              </div>
            )}
            dropdownClassName="!p-0 !text-center"
            className="text-center uppercase font-semibold"
          />
        </div>
      </div>
      {/* MOBIL - Hamburger tugmasi */}
      <div className="xl:hidden absolute top-4 right-4">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-gray-800 dark:text-white focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* MOBIL menyu ochilganda ko‘rinadigan qism */}
      {isMenuOpen && (
        <div className="xl:hidden absolute top-16 left-0 w-full bg-white dark:bg-gray-800 shadow-md z-40 px-4 py-4">
          <ul className="flex flex-col gap-3">
            {menu.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.key}
                  className="block text-black dark:text-white font-semibold"
                  onClick={(e) => {
                    if (sectionAnchors.includes(item.key)) {
                      e.preventDefault();
                      if (
                        pathname === `/${activeLang}` ||
                        pathname === `/${activeLang}/`
                      ) {
                        const el = document.querySelector(item.key);
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                        setActiveMenu(item.key);
                      } else {
                        window.location.href = `/${activeLang}${item.key}`;
                      }
                    } else {
                      setActiveMenu(item.key);
                    }
                    setIsMenuOpen(false); // menyuni yopish
                  }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Select
                value={shortLabel[activeLang as keyof typeof shortLabel]}
                onChange={(lang) => {
                  changeLang(lang);
                  setIsMenuOpen(false);
                }}
                style={{ width: "100%" }}
                options={langOptions}
                className="!w-[200px] text-start uppercase font-semibold mt-2"
              />
            </li>

            <li>
              <button
                className="mt-2 w-[200px] bg-gray-800 text-white py-2 rounded"
                onClick={() => {
                  setIsMenuOpen(false);
                  router.push(`/login`);
                }}
              >
                {registerLangs("LOGIN")}
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
