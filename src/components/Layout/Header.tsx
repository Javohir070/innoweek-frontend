"use client";
import Image from "next/image";
import { useState } from "react";
import { Select } from "antd";
import innoweekLogo from '@/assets/img/services/1234.png'
import { useTranslations } from "next-intl";
import { Link, useRouter as Router} from "@/i18n/navigation";
import { usePathname, useParams, useRouter } from "next/navigation";

export default function Header() {
  const [activeMenu, setActiveMenu] = useState("#hero");
  const t = useTranslations("header");
  const langSwitch = useTranslations("langs");
  const router = Router();
  const routerLang = useRouter()
  const pathname = usePathname();
  const params = useParams();
  const [activeLang, setActiveLang] = useState(params.locale ?? "uz");

  const changeLang = (lang: string) => {
    setActiveLang(lang);
    const newPath = pathname.replace(/^\/(uz|ru|en)/, `/${lang}`);
    routerLang.push(newPath)
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
        // { label: "BIZ HAQIMIZDA", key: "#otziv" },
      ],
    },
    {
      label: t("GALLERY"),
      key: "/gallery",
    },
    // {
    //   label: t("FAQ"),
    //   key: "#faq",
    // },
    // {
    //   label: "Spikerlar",
    //   key: "#spikers",
    // },
    {
      label: t("CONTACT"),
      key: "#contact",
    },
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
    "#spikers"
  ];

  const handleMenuClick = (key: string) => {
    setActiveMenu(key);
  };

  return (
    <header
      id="header"
      className="header flex items-center fixed-top bg-white dark:!bg-gray-800 text-gray-900 shadow"
    >
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
              <li key={index} className={item.dropdown ? "dropdown " : "hover:scale-105"}>
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
                      if (pathname === `/${activeLang}` || pathname === `/${activeLang}/`) {
                        const el = document.querySelector(item.key);
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                        setActiveMenu(item.key);
                      } else {
                        // Boshqa sahifada bo'lsa, landingga push va hash qo'shish
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
                      <li key={subIndex}

                      >
                        <Link
                          href={subItem.key}
                          onClick={(e) => {
                            if (sectionAnchors.includes(subItem.key)) {
                              e.preventDefault();
                              if (pathname === `/${activeLang}` || pathname === `/${activeLang}/`) {
                                const el = document.querySelector(subItem.key);
                                if (el) el.scrollIntoView({ behavior: "smooth" });
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

          <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
        </nav>

        <div className="flex items-center justify-end gap-2">
          {/* <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className=" rounded-md"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button> */}

          <div className="flex gap-3">
            <div className="cta-button bg-gray-500 hover:bg-blue-500 rounded-full">
              <button className="btn !outline-none" onClick={() => { router.push(`/register/user`) }}>
                <span className="text-white">{"Ro'yxatdan o'tish"}</span>
              </button>
            </div>
            <Select
              value={activeLang}
              onChange={changeLang}
              style={{ width: 100 }}
              options={[
                { value: "uz", label: langSwitch("uz") },
                { value: "en", label: langSwitch("en") },
                { value: "ru", label: langSwitch("ru") },
              ]}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
