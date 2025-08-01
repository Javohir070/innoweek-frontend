"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FetchInstance } from "@/api/FetchInstance";
import { IResponse } from "@/types";
import { Select } from "antd";
import innoweekLogo from "@/assets/img/logo_inno.png";
import { useTranslations } from "next-intl";
import { Link, useRouter as Router } from "@/i18n/navigation";
import { usePathname, useParams, useRouter } from "next/navigation";
import { LoginOutlined } from "@ant-design/icons";
import { IoMdPerson } from "react-icons/io";
import dynamic from "next/dynamic";
import GoogleTranslate from "../GoogleTranslate/GoogleTranslate";

import uzFlag from "@/assets/img/uz.avif";
import ruFlag from "@/assets/img/rus.webp";
import enFlag from "@/assets/img/eng.webp";



interface UserProfile {
  id: number;
  user_type: number;
  first_name: string;
  last_name: string;
  middle_name: string | null;
  company_name: string | null;
  company_inn: string | null;
  company_logo: string | null;
  pinfl: string | null;
  passport_serial: string | null;
  passport_number: string | null;
  address: string | null;
  position: string | null;
  phone: string | null;
  avatar: string | null;
  username: string | null;
  email: string | null;
  email_verified_at: string | null;
  confirmed: boolean;
  status: string;
  created_at: string;
  updated_at: string;
  country_id: number;
  country_name: string | null;
  region_id: number | null;
  district_id: number | null;
  p_type_id: number | null;
  department_id: number | null;
  birth_date: string | null;
  profession_id: number | null;
  organization: string | null;
  gender: string | number | null;
  ticket: {
    id: number;
    user_id: number;
    archive_id: number;
    ticket_id: string;
    status: string;
    created_at: string;
    updated_at: string;
  };
  role?: string;
  country?: string | object | null;
  profession?: object | null;
}

const ProfileDropdown = dynamic(() => import("./ProfileDropdown"), { ssr: false });

export default function Header() {
  const [user, setUser] = useState<UserProfile | null>(null);
  // Fetch user info on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await FetchInstance<IResponse<UserProfile>>("/api/v1.0/user/me", { method: "POST" });
        if (res?.success && res.data) {
          setUser(res.data);
        } else {
          setUser(null);
        }
      } catch (err: any) {
        // If unauthorized (401), treat as logged out
        setUser(null);
      }
    };
    fetchUser();
  }, []);
  const [activeMenu, setActiveMenu] = useState("#hero");
  const t = useTranslations("header");
  const registerLangs = useTranslations("header");
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


  console.log("user data in header", user);


  const menu = [
    { label: t("HOME"), key: "/" },
    { label: t("NEWS"), key: "/news" },
    {
      label: t("INNOWEEK"),
      key: "#about",
      dropdown: [
        { label: t("INNOWEEK HAQIDA"), key: "#about" },
        { label: t("QAMROV"), key: "#stats" },
        { label: t("DASTUR"), key: "#resume" },
        { label: t("SPIKERLAR"), key: "#team" },
        { label: t("HAMKORLAR"), key: "#clients" },
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
    uz: `UZ`,
    en: "EN",
    ru: "RU",
  };

  // const shortLabel = {
  //   uz: (
  //     <span className="flex items-center gap-1">
  //       <Image src={uzFlag} alt="UZ" width={20} height={14} /> UZ
  //     </span>
  //   ),
  //   en: (
  //     <span className="flex items-center gap-1">
  //       <Image src={enFlag} alt="EN" width={20} height={14} /> EN
  //     </span>
  //   ),
  //   ru: (
  //     <span className="flex items-center gap-1">
  //       <Image src={ruFlag} alt="RU" width={20} height={14} /> RU
  //     </span>
  //   ),
  // };
  // 

  return (
    <header className="header flex items-center fixed-top bg-white dark:bg-gray-800 text-gray-900 shadow w-full z-50">
      <div className="container-fluid container-xl py-2 flex justify-between items-center w-full">
        <Link
          href="/"
          className="logo d-flex align-items-center me-auto me-xl-0 rounded-lg"
        >
          <Image src={innoweekLogo} alt="Logo" className="w-[110px]" />
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
          {user ? (
            <ProfileDropdown
              user={{
                first_name: user?.first_name,
                last_name: user?.last_name,
                avatar: user?.avatar,
                id: user?.id
              }}
              onLogout={() => {
                setUser(null);
                localStorage.removeItem("auth_token");
                window.location.href = "/";
              }}
            />
          ) : (
            <>
              <button
                className="!outline-none px-4 py-1 border-[1px] border-gray-800 !text-gray-800 hover:bg-gray-800 hover:!text-white !rounded-full whitespace-nowrap"
                onClick={() => {
                  router.push(`/register`);
                }}
              >
                {registerLangs("REGISTER")}
              </button>
              <div className="cta-button rounded-full mt-1">
                <button
                  className="!bg-transparent"
                  onClick={() => {
                    router.push(`/login`);
                  }}
                >
                  <span className="text-sm font-medium">
                    <LoginOutlined className="inline-block text-2xl" />
                  </span>
                </button>
              </div>
            </>
          )}

          <div className=" bayroq w-full  !-mr-4 ml-2">
            {
              activeLang === "uz" ? (
                <Image className="!w-[22px] !h-[22px] object-cover rounded-full shadow m-2" src={uzFlag} alt="UZ" width={20} height={20} />
              ) : activeLang === "en" ? (
                <Image className="!w-[22px] !h-[22px] object-cover rounded-full shadow m-2" src={enFlag} alt="EN" width={20} height={20} />
              ) : (
                <Image className="!w-[22px] !h-[22px] object-cover rounded-full shadow m-2" src={ruFlag} alt="RU" width={20} height={20} />
              )
            }
          </div>
          <Select
            value={shortLabel[activeLang as keyof typeof shortLabel]}
            onChange={changeLang}
            style={{ width: 80, textAlign: "center" }}
            dropdownMatchSelectWidth={false}
            options={langOptions}
            // dropdownRender={(menu) => (
            //   <div className="!p-0 text-center bg-white text-blue-600 font-medium">
            //     {menu}
            //   </div>
            // )}
            className="text-center uppercase font-semibold"
          // popupClassName="!p-0 text-center"
          />
          <div className=" hidden md:block">
            <GoogleTranslate />
          </div>
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
            <svg
              className="w-7 h-7 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-7 h-7"
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
              <div className="flex flex-col items-start ">
                <li className="">
                  <button
                    className="mt-2 px-4  bg-gray-800 text-white py-2 rounded"
                    onClick={() => {
                      setIsMenuOpen(false);
                      router.push(`/register`);
                    }}
                  >
                    {registerLangs("REGISTER")}
                  </button>
                </li>
                <div className="cta-button rounded-full my-2.5">
                  <button
                    className="!bg-transparent"
                    onClick={() => {
                      router.push(`/login`);
                    }}
                  >
                    <span className="text-sm font-medium flex items-center gap-2 ">
                      <h3 className="text-black m-0">{t("login")}</h3>
                      <LoginOutlined className="inline-block text-2xl" />
                    </span>
                  </button>
                </div>
                <div className="flex items-center mt-2">
                  <div className=" bayroq w-full mt-1   mr-2">
                    {
                      activeLang === "uz" ? (
                        <Image className="!w-[22px] !h-[22px] object-cover rounded-full" src={uzFlag} alt="UZ" width={20} height={14} />
                      ) : activeLang === "en" ? (
                        <Image className="!w-[22px] !h-[22px] object-cover rounded-full" src={enFlag} alt="EN" width={20} height={14} />
                      ) : (
                        <Image className="!w-[22px] !h-[22px] object-cover rounded-full" src={ruFlag} alt="RU" width={20} height={14} />
                      )
                    }
                  </div>
                  <li className="">
                    <Select
                      value={shortLabel[activeLang as keyof typeof shortLabel]}
                      onChange={(lang) => {
                        changeLang(lang);
                        setIsMenuOpen(false);
                      }}
                      style={{ width: "100%" }}
                      dropdownMatchSelectWidth={false}
                      options={langOptions}
                      // dropdownClassName="!p-0 !text-center"
                      classNames={{
                        popup: {
                          root: "!p-0 !text-center",
                        },
                      }}
                      className=" text-center uppercase  mt-2"
                    />
                  </li>
                </div>
                <div className="">
                  <GoogleTranslate />
                </div>
              </div>
            </ul>
          </div>
        </>
      )}
    </header>
  );
}
