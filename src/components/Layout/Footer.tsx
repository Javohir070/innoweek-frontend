import React from "react";
import bg from "@/assets/img/footer_bg.png";
import footer_logo from "@/assets/img/logo.webp";
import Image from "next/image";
import { RiFacebookBoxFill, RiInstagramFill, RiTelegram2Fill, RiTwitchFill, RiTwitterFill } from "react-icons/ri";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white relative">
      {/* Orqa fon uchun div - o'z rasmingizni qo'yishingiz mumkin */}
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
          {/* Logo va Follow Us qismi */}
          <div className="md:w-1/4">
            <div className="flex flex-row items-center gap-4">
              <Image
                src={footer_logo}
                alt="Footer Logo"
                className="w-32"
                // width={128}
                // height={128}
              />
              {/* <h2 className="text-xl font-bold uppercase mb-6">INNOWEEK</h2> */}
            </div>
            <p className="text-lg mb-6">Follow Us</p>
            <ul className="list-none p-0 flex flex-row gap-4">
              <li className="mb-2">
                <a
                  href="#"
                  className="text-white hover:text-white transition"
                >
                  <RiFacebookBoxFill className="inline-block text-2xl" />
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#"
                  className="text-white hover:text-white transition"
                >
                  <RiTwitterFill className="inline-block text-2xl" />
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#"
                  className="text-white hover:text-white transition"
                >
                  <RiInstagramFill className="inline-block text-2xl" />
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#"
                  className="text-white hover:text-white transition"
                >
                  <RiTelegram2Fill className="inline-block text-2xl" />
                </a>
              </li>
            </ul>

          </div>

          {/* Linklar qismi */}
          <div className="md:w-3/4 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {/* 1-ustun */}
            <div>
              {/* <h3 className="text-lg font-semibold mb-4 uppercase">
                Navigation
              </h3> */}
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-white cursor-pointer  hover:text-blue-500 transition">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white cursor-pointer  hover:text-blue-500 transition">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white cursor-pointer  hover:text-blue-500 transition">
                    Observer
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white cursor-pointer  hover:text-blue-500 transition">
                    Events
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white cursor-pointer  hover:text-blue-500 transition">
                    Media Hub
                  </a>
                </li>
              </ul>
            </div>

            {/* 2-ustun */}
            <div>
              {/* <h3 className="text-lg font-semibold mb-4 uppercase">
                Resources
              </h3> */}
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-white cursor-pointer  hover:text-blue-500 transition">
                    Community
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white cursor-pointer  hover:text-blue-500 transition">
                    Leadership
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white cursor-pointer  hover:text-blue-500 transition">
                    Reports
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white cursor-pointer  hover:text-blue-500 transition">
                    Past Summits
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white cursor-pointer  hover:text-blue-500 transition">
                    Media Gallery
                  </a>
                </li>
              </ul>
            </div>

            {/* 3-ustun */}
            <div>
              {/* <h3 className="text-lg font-semibold mb-4 uppercase">
                Information
              </h3> */}
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-white cursor-pointer  hover:text-blue-500 transition">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white cursor-pointer  hover:text-blue-500 transition">
                    Experiences
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white cursor-pointer  hover:text-blue-500 transition">
                    Interactive Tools
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white cursor-pointer  hover:text-blue-500 transition">
                    Frames
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white cursor-pointer  hover:text-blue-500 transition">
                    Speakers
                  </a>
                </li>
              </ul>
            </div>

            {/* 4-ustun */}
            <div>
              {/* <h3 className="text-lg font-semibold mb-4 uppercase">Legal</h3> */}
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-white cursor-pointer  hover:text-blue-500 transition">
                    Copyrights
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white cursor-pointer  hover:text-blue-500 transition">
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white cursor-pointer  hover:text-blue-500 transition">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white cursor-pointer  hover:text-blue-500 transition">
                    Awards
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white cursor-pointer  hover:text-blue-500 transition">
                    Videos
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Pastgi qism */}
        <div className="border-t border-gray-700 mt-12 pt-6 text-center text-sm">
          All Rights Reserved © 2025
        </div>
      </div>
    </footer>
  );
};

export default Footer;
