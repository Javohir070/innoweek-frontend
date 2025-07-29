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
  const langSwitch = useTranslations("langs");
  const router = Router();
  const routerLang = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [activeLang, setActiveLang] = useState(params.locale ?? "uz");

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
                  className={`${activeMenu === item.key ? "active" : ""
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
                      <li
                        key={subIndex}

                      >
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

        <div className="flex items-center justify-end gap-4">
          <div className="cta-button bg-gray-500 hover:bg-blue-500 rounded-full">
            <button
              className="btn !w-[160px] !outline-none px-4 py-1"
              onClick={() => {
                router.push(`/register`);
              }}
            >
              <span className="text-white text-sm font-medium">
                {"Ro'yxatdan o'tish"}
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
    </header>
  );
}
