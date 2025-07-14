"use client"
import Image from 'next/image'
import { useState } from 'react'
import innoweekLogo from '@/assets/img/services/123.png'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

export default function Header() {
  const [activeMenu, setActiveMenu] = useState("#hero")
  const t = useTranslations('header')

  const menu = [
    {
      label: t('HOME'),
      key: "/"
    },
    {
      label: t('NEWS'),
      key: "/news"
    },
    {
      label: t('INNOWEEK'),
      key: "#about",
      dropdown: [
        { label: "INNOWEEK HAQIDA", key: "#about" },
        { label: "QAMROV", key: "#stats" },
        { label: "DASTUR", key: "#resume" },
        { label: "SPIKERLAR", key: "#team" },
        { label: "HAMKORLAR", key: "#clients" },
        { label: "BIZ HAQIMIZDA", key: "#otziv" }
      ]
    },
    {
      label: t('GALLERY'),
      key: "#lavhalar"
    },
    {
      label: t('FAQ'),
      key: "#faq"
    },
    {
      label: "Spikerlar",
      key: "#spikers"
    },
    {
      label: t('CONTACT'),
      key: "#contact"
    }
  ];

  const handleMenuClick = (key: string) => {
    setActiveMenu(key)
  }
 

  return (
    <header id="header" className="header flex items-center fixed-top">
      <div className="header-container container-fluid container-xl position-relative d-flex align-items-center justify-content-between">
        <Link href="/" className="logo d-flex align-items-center me-auto me-xl-0">
          <Image src={innoweekLogo} alt="Logo" className='w-[80px] h-[36px]' />
        </Link>

        <nav id="navmenu" className="navmenu !uppercase">
          <ul>
            {menu.map((item, index) => (
              <li key={index} className={item.dropdown ? "dropdown" : ""}>
                <Link 
                  href={item.key} 
                  className={`${activeMenu === item.key ? 'active' : ''} !font-raleway !font-semibold`}
                  onClick={() => handleMenuClick(item.key)}
                >
                  {item.dropdown ? <span>{item.label}</span> : item.label}
                </Link>
                {item.dropdown && (
                  <ul>
                    {item.dropdown.map((subItem, subIndex) => (
                      <li key={subIndex}>
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

        <div className="lang-switcher">
          {/* <div className="btnlan lang-icon" id="langToggle">
            <h1>{activeLang.toUpperCase()}</h1>
          </div>
          <div className="lang-options" id="langMenu">
            <button onClick={() => changeLang('uz')}>{"O'zbekcha"}</button>
            <button onClick={() => changeLang('ru')}>{"Русский"}</button>
            <button onClick={() => changeLang('en')}>{"English"}</button>
          </div> */}
        </div>
      </div>
    </header>
  )
}