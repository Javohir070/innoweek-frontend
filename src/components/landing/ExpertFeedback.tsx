"use client";

import React, { useState } from "react";
import Image from "next/image";
import userAvatar from "@/assets/img/person/person-m-7.webp";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { IoMdStar } from "react-icons/io";
import { LuMoveLeft, LuMoveRight } from "react-icons/lu";

const staticData = [
    {
        full_name: "Ali Valiyev",
        position: "InnoWeek 2024'dа barqarorlik va yoshlar startaplariga qaratilgan e’tibor haqiqiy ilhom manbai boʻldi.",
        image: "",
        country: "O'zbekiston",
    },
    {
        full_name: "Dilnoza Karimova",
        position: "Toshkentdagi InnoWeek oddiy koʻrgazma emas — bu Markaziy Osiyo bozoriga kirish uchun strategik eshik.",
        image: "",
        country: "O'zbekiston",
    },
    {
        full_name: "Jasur Akbarov",
        position: "InnoWeek 2024 chinakam global muloqot maydoniga aylandi. Bu yerda shunchaki gʻoyalar emas, balki butun ",
        image: "",
        country: "O'zbekiston",
    },
    {
        full_name: "Madina Rustamova",
        position: "InnoWeek 2024 chinakam global muloqot maydoniga aylandi. Bu yerda shunchaki gʻoyalar emas, balki butun",
        image: "",
        country: "O'zbekiston",
    },
];



const ExpertFeedback = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const data = staticData;
    const pairCount = 2;
    const maxIndex = data.length - pairCount;

    const handlePrev = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setTimeout(() => {
            setCurrentIndex((prev) => (prev - pairCount + data.length) % data.length);
            setIsAnimating(false);
        }, 400); // animatsiya davomiyligi bilan mos
    };

    const handleNext = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setTimeout(() => {
            setCurrentIndex((prev) => (prev + pairCount) % data.length);
            setIsAnimating(false);
        }, 400);
    };

    // Slider uchun translateX hisoblash
    const slidePercent = (currentIndex / data.length) * 100;

    return (
        <section className="py-16 ">
            <div className="container mx-auto">
                <div className="section-title" data-aos="fade-up">
                    <h2 className="text-black dark:!text-white">INNOWEEK</h2>
                    <div className="text-black dark:!text-gray-300">
                        BIZ HAQIMIZDA
                    </div>
                </div>
                <div className="flex relative flex-col md:flex-row items-start gap-18">
                    {/* Chap panel */}
                    <div className="flex flex-col items-center md:items-start w-full md:w-1/3">
                        <h3 className="text-xl !font-bold text-black dark:!text-gray-300 mb-6">
                            EKSPERTLAR FIKRI
                        </h3>
                        <div className="md:absolute md:bottom-10 flex items-center gap-3 mt-6 md:mt-0">
                            <button
                                onClick={handlePrev}
                                className="bg-blue-600 text-white p-2 !rounded-full hover:bg-blue-700 "
                                disabled={isAnimating}
                            >
                                <LuMoveLeft size={28} />
                            </button>
                            <button
                                onClick={handleNext}
                                className="bg-blue-600 text-white p-2 !rounded-full hover:bg-blue-700 "
                                disabled={isAnimating}
                            >
                                <LuMoveRight size={28} />
                            </button>
                        </div>
                    </div>
                    {/* O'ng panel - Slider */}
                    <div className="w-full md:w-2/3 flex justify-center">
                        <div className="overflow-hidden w-[680px]">
                            <div
                                className="flex transition-transform duration-400 ease-in-out"
                                style={{
                                    width: `${data.length * 320 + (data.length - 1) * 24}px`,
                                    transform: `translateX(-${currentIndex * (320 + 24)}px)`
                                }}
                            >
                                {data.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="bg-[#0085d4] dark:bg-gray-800 text-white w-[320px] p-6 rounded-lg flex flex-col justify-center mr-6 last:mr-0"
                                    >
                                        <div className="flex gap-1 ">
                                            {[...Array(5)].map((_, i) => (
                                                <span key={i}><IoMdStar /></span>
                                            ))}
                                        </div>
                                        <p className="italic mb-4 mt-3 text-[15px]">“{item.position}”</p>
                                        <div className="flex items-center gap-4">
                                            <Image
                                                src={userAvatar}
                                                alt={item.full_name}
                                                width={48}
                                                height={48}
                                                className="rounded-full"
                                            />
                                            <div>
                                                <p className="font-semibold m-0">{item.full_name}</p>
                                                <p className="text-sm text-white/80 m-0">
                                                    {item.country}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ExpertFeedback;
