"use client";
import Image from "next/image";
import { useState } from "react";
import innoweekLogo from "@/assets/img/services/123.png";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useRouter, usePathname, useParams } from "next/navigation";
import { useTheme } from 'next-themes';

export default function Header() {
  const [activeMenu, setActiveMenu] = useState("#hero");
  const t = useTranslations("header");
  const langSwitch = useTranslations('langs')
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [activeLang, setActiveLang] = useState(params.locale ?? "uz");
  const { theme, setTheme } = useTheme();

  const changeLang = (lang: string) => {
    setActiveLang(lang);
    const newPath = pathname.replace(/^\/(uz|ru|en)/, `/${lang}`);
    router.push(newPath);
  };

  const menu = [
    {
      label: t("HOME"),
      key: "/",
    },
    {
      label: t("NEWS"),
      key: "/news",
    },
    {
      label: t("INNOWEEK"),
      key: "#about",
      dropdown: [
        { label: "INNOWEEK HAQIDA", key: "#about" },
        { label: "QAMROV", key: "#stats" },
        { label: "DASTUR", key: "#resume" },
        { label: "SPIKERLAR", key: "#team" },
        { label: "HAMKORLAR", key: "#clients" },
        { label: "BIZ HAQIMIZDA", key: "#otziv" },
      ],
    },
    {
      label: t("GALLERY"),
      key: "/gallery",
    },
    {
      label: t("FAQ"),
      key: "#faq",
    },
    {
      label: "Spikerlar",
      key: "#spikers",
    },
    {
      label: t("CONTACT"),
      key: "#contact",
    },
  ];

  const handleMenuClick = (key: string) => {
    setActiveMenu(key);
  };

  return (
    <header id="header" className="header flex items-center fixed-top bg-white dark:!bg-gray-800 text-gray-900">
      <div className="header-container py-2 container-fluid container-xl position-relative d-flex align-items-center justify-content-between">
        <Link
          href="/"
          className="logo d-flex align-items-center me-auto me-xl-0 bg-gray-800 rounded-lg p-2 !pl-4"
        >
          <Image src={innoweekLogo} alt="Logo" className="w-[80px] h-[36px]" />
        </Link>

        <nav id="navmenu" className="navmenu !uppercase">
          <ul>
            {menu.map((item, index) => (
              <li key={index} className={item.dropdown ? "dropdown" : ""}>
                <Link
                  href={item.key}
                  className={`${activeMenu === item.key ? "active" : ""
                    } !font-raleway !font-semibold !text-black dark:!text-amber-50`}
                  onClick={() => handleMenuClick(item.key)}
                >
                  {item.dropdown ? <span>{item.label}</span> : item.label}
                </Link>
                {item.dropdown && (
                  <ul>
                    {item.dropdown.map((subItem, subIndex) => (
                      <li  key={subIndex}>
                        <Link
                          href={subItem.key}
                          onClick={() => handleMenuClick(subItem.key)}
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
          <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
        </nav>

        <div className="flex items-center justify-end gap-2">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className=" rounded-md"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          <div>
            <select
              value={activeLang}
              onChange={(e) => changeLang(e.target.value)}
              className="border rounded px-2 py-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="uz">{langSwitch("uz")}</option>
              <option value="en">{langSwitch('en')}</option>
              <option value="ru">{langSwitch("ru")}</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
}