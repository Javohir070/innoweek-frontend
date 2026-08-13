import AppImage from "@/lib/AppImage";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useCurrentUser } from "@/hooks/queries/useUser";
import { Select } from "antd";
import innoweekLogoDark from "@/assets/img/services/111.svg";
import innoweekLogoLight from "@/assets/img/services/111 copy.svg";
import { useTranslations } from "@/i18n/useTranslations";
import { Link, useRouter as Router } from "@/lib/navigation";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { LoginOutlined } from "@ant-design/icons";
import { lazy, Suspense } from "react";
// import { IoMdPerson } from "react-icons/io";
// import GoogleTranslate from "../GoogleTranslate/GoogleTranslate";

import uzFlag from "@/assets/img/uz.avif";
import ruFlag from "@/assets/img/rus.webp";
import enFlag from "@/assets/img/eng.webp";

const ProfileDropdown = lazy(() => import("./ProfileDropdown"));

export default function Header() {
  const queryClient = useQueryClient();
  const { data: user = null } = useCurrentUser();
  const [activeMenu, setActiveMenu] = useState("#hero");
  const t = useTranslations("header");
  const registerLangs = useTranslations("header");
  const router = Router();
  const routerLang = useNavigate();
  const { pathname } = useLocation();
  const params = useParams();
  const [activeLang, setActiveLang] = useState(params.locale ?? "uz");

  // importlar tepasida kerakli state:
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const homePath = `/${activeLang}`;
  const isHome = pathname === homePath || pathname === `${homePath}/`;

  /** Bosh sahifa tepasida header shaffof bo'ladi (hero videosi ustida) */
  const transparent = isHome && !scrolled && !isMenuOpen;

  const changeLang = (lang: string) => {
    setActiveLang(lang);
    const newPath = pathname.replace(/^\/(uz|ru|en)/, `/${lang}`);
    routerLang(newPath);
  };

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
    { label: t("CONTESTS"), key: "/contests" },
    { label: t("InnoMarket"), key: "https://innomarket.uz" },
    {
      label: t("ARCHIVE"),
      key: "#archive",
      dropdown: [
        { label: t("INNOWEEK 2024"), key: "https://2024.innoweek.uz" },
        { label: t("INNOWEEK 2025"), key: "https://2025.innoweek.uz" },
      ],
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
    "#spikers",
  ];

  /** Bo'lim (anchor) tanlanganmi — tanlangan bo'lsa "Bosh sahifa" belgilanmaydi */
  const anchorSelected =
    activeMenu !== "#hero" && sectionAnchors.includes(activeMenu);

  const isActiveItem = (key: string) => {
    if (key.startsWith("http")) return false;
    if (key.startsWith("#")) return activeMenu === key;
    if (key === "/") return !anchorSelected && isHome;
    return pathname.startsWith(`${homePath}${key}`);
  };

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

  return (
    <header
      className={`header flex items-center fixed-top w-full z-50 transition-all duration-300 ${
        transparent
          ? "bg-transparent"
          : "bg-white dark:bg-gray-800 text-gray-900 shadow"
      }`}
    >
      <div className="container-fluid container-xl py-2 flex justify-between items-center w-full">
        <Link
          href="/"
          className="logo d-flex align-items-center me-auto me-xl-0 rounded-lg"
        >
          <AppImage
            src={transparent ? innoweekLogoLight : innoweekLogoDark}
            alt="Logo"
            className="w-[110px]"
          />
        </Link>

        <nav
          id="navmenu"
          className={`navmenu !uppercase transition-colors duration-300 ${
            transparent
              ? "[&>ul>li>a]:!text-white"
              : "[&>ul>li>a]:!text-black dark:[&>ul>li>a]:!text-amber-50"
          }`}
        >
          <ul>
            {menu.map((item, index) => (
              <li
                key={index}
                className={item.dropdown ? "dropdown " : "hover:scale-105"}
              >
                <Link
                  href={item.key}
                  className="!font-raleway !font-semibold hover:!text-blue-500"
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
                  <span
                    className={`inline-block border-b-2 pb-1 !font-raleway !font-semibold transition-colors duration-300 ${
                      isActiveItem(item.key)
                        ? "border-[#0085d4]"
                        : "border-transparent"
                    }`}
                  >
                    {item.label}
                  </span>
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
            <Suspense fallback={null}>
            <ProfileDropdown
              user={{
                first_name: user?.first_name,
                last_name: user?.last_name,
                avatar: user?.avatar,
                id: user?.id,
              }}
              onLogout={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("auth_token");
                queryClient.removeQueries({ queryKey: ["user", "me"] });
                window.location.href = `/${params.locale ?? "uz"}`;
              }}
            />
            </Suspense>
          ) : (
            <>
              <button
                className={`!outline-none px-4 py-1 border-[1px] !rounded-full whitespace-nowrap transition-colors duration-300 ${
                  transparent
                    ? "border-white !text-white hover:bg-white hover:!text-gray-900"
                    : "border-gray-800 !text-gray-800 hover:bg-gray-800 hover:!text-white"
                }`}
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
                    <LoginOutlined
                      className={`inline-block text-2xl transition-colors duration-300 ${
                        transparent ? "!text-white" : ""
                      }`}
                    />
                  </span>
                </button>
              </div>
            </>
          )}

          {/* <div className=" bayroq w-full  !-mr-4 ml-2">
            {activeLang === "uz" ? (
              <AppImage
                className="!w-[22px] !h-[22px] object-cover rounded-full shadow m-2"
                src={uzFlag}
                alt="UZ"
                width={20}
                height={20}
              />
            ) : activeLang === "en" ? (
              <AppImage
                className="!w-[22px] !h-[22px] object-cover rounded-full shadow m-2"
                src={enFlag}
                alt="EN"
                width={20}
                height={20}
              />
            ) : (
              <AppImage
                className="!w-[22px] !h-[22px] object-cover rounded-full shadow m-2"
                src={ruFlag}
                alt="RU"
                width={20}
                height={20}
              />
            )}
          </div> */}
          <Select
            value={shortLabel[activeLang as keyof typeof shortLabel]}
            onChange={changeLang}
            style={{ width: 80, textAlign: "center" }}
            popupMatchSelectWidth={false}
            options={langOptions}
            // dropdownRender={(menu) => (
            //   <div className="!p-0 text-center bg-white text-blue-600 font-medium">
            //     {menu}
            //   </div>
            // )}
            className={`text-center uppercase font-semibold ${
              transparent
                ? "!bg-transparent [&_.ant-select-selector]:!bg-transparent [&_.ant-select-selector]:!border-transparent [&_.ant-select-selector]:!shadow-none [&_.ant-select-selection-item]:!text-white [&_.ant-select-arrow]:!text-white"
                : ""
            }`}
            // popupClassName="!p-0 text-center"
          />
        </div>
      </div>
      {/* MOBIL - Hamburger tugmasi */}
      <div className="xl:hidden absolute top-4 right-4 z-50">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`focus:outline-none transition-colors duration-300 ${
            transparent ? "text-white" : "text-gray-800 dark:text-white"
          }`}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? (
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
                    <span
                      className={`inline-block border-b-2 pb-0.5 transition-colors duration-300 ${
                        isActiveItem(item.key)
                          ? "border-[#0085d4]"
                          : "border-transparent"
                      }`}
                    >
                      {item.label}
                    </span>
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
                      setIsMenuOpen(false);
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
                    {activeLang === "uz" ? (
                      <AppImage
                        className="!w-[22px] !h-[22px] object-cover rounded-full"
                        src={uzFlag}
                        alt="UZ"
                        width={20}
                        height={14}
                      />
                    ) : activeLang === "en" ? (
                      <AppImage
                        className="!w-[22px] !h-[22px] object-cover rounded-full"
                        src={enFlag}
                        alt="EN"
                        width={20}
                        height={14}
                      />
                    ) : (
                      <AppImage
                        className="!w-[22px] !h-[22px] object-cover rounded-full"
                        src={ruFlag}
                        alt="RU"
                        width={20}
                        height={14}
                      />
                    )}
                  </div>
                  <li className="">
                    <Select
                      value={shortLabel[activeLang as keyof typeof shortLabel]}
                      onChange={(lang) => {
                        changeLang(lang);
                        setIsMenuOpen(false);
                      }}
                      style={{ width: "100%" }}
                      popupMatchSelectWidth={false}
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
              </div>
            </ul>
          </div>
        </>
      )}
    </header>
  );
}
