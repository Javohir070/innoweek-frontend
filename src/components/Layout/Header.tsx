"use client";
import Image from "next/image";
import { useState } from "react";
import { Select } from "antd";
import innoweekLogo from "@/assets/img/logo_inno.png";
import { useTranslations } from "next-intl";
import { Link, useRouter as Router } from "@/i18n/navigation";
import { usePathname, useParams, useRouter } from "next/navigation";
import { LoginOutlined } from "@ant-design/icons";

export default function Header() {
  const [activeMenu, setActiveMenu] = useState("#hero");
  const t = useTranslations("header");
  const registerLangs = useTranslations("hero");
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
          className="logo d-flex align-items-center me-auto me-xl-0 rounded-lg"
        >
          <Image
            src={innoweekLogo}
            alt="Logo"
            className="w-[110px]"
          />
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

        <div className="flex max-[1200px]:hidden items-center justify-end gap-3">
            <button
            className="!outline-none px-4 py-1 border-[1px] border-gray-800 !text-gray-800 hover:bg-gray-800 hover:!text-white !rounded-full whitespace-nowrap"
            onClick={() => {
              router.push(`/register`);
            }}
            >
            {registerLangs("REGISTER")}
            </button>
          <div className="cta-button rounded-full">
            <button
              className="!bg-transparent"
              onClick={() => {
                router.push(`/login`);
              }}
            >
              <span className="text-sm font-medium">
                <LoginOutlined className="inline-block text-2xl" />
                {/* {registerLangs("REGISTER")} */}
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
      <div className="xl:hidden absolute top-4 right-4 z-50">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-gray-800 dark:text-white focus:outline-none"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? (
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* MOBIL menyu ochilganda ko‘rinadigan qism */}
      {isMenuOpen && (
        <>
          {/* Orqa fon qoraroq bo‘lishi uchun overlay */}
          <div className="fixed inset-0 bg-black/40 bg-opacity-40 !z-30"></div>

          {/* Mobil menyu */}
          <div className="xl:hidden fixed top-16 left-0 w-11/12 rounded-xl h-[84vh] bg-white dark:bg-gray-800 shadow-md z-40 px-2 py-4  ml-4">
            {/* menyu ichida content */}
            <ul className="flex w-full !pl-2 flex-col gap-3">
              {menu.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.key}
                    className="block text-black hover:!text-blue-600 font-semibold"
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
              <div className="flex flex-col items-center">
                <li className="w-full">
                  <button
                    className="mt-2 w-full bg-gray-800 text-white py-2 rounded"
                    onClick={() => {
                      setIsMenuOpen(false);
                      router.push(`/register`);
                    }}
                  >
                    {registerLangs("REGISTER")}
                  </button>
                </li>

                <li className="w-full">
                  <Select
                    value={shortLabel[activeLang as keyof typeof shortLabel]}
                    onChange={(lang) => {
                      changeLang(lang);
                      setIsMenuOpen(false);
                    }}
                    style={{ width: "100%" }}
                    dropdownMatchSelectWidth={false}
                    options={langOptions}
                    dropdownClassName="!p-0 !text-center"
                    className="w-full text-center uppercase font-semibold mt-2"
                  />
                </li>
              </div>
            </ul>
          </div>
        </>
      )}
    </header>
  );
}
