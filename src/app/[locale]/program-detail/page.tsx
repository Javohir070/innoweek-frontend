"use client";

import { Timeline } from "antd";
import SpeakersSection from "@/components/landing/Speakers";
import AboutTimeline from "../AboutTimeline/AboutTimeline";
import Betahall from "../Betahall/Betahall";

export default function ProgramDetailPage() {
    return (
        <section className="bg-white dark:bg-[#031119] transition-colors duration-300">
            <div className="container mx-auto px-4 py-10">
                {/* Title */}


                {/* Biz haqimizda */}
                <AboutTimeline />


                {/* Spikerlar */}
                <SpeakersSection />

                
                {/* Beta Hall */}
                <Betahall />
            </div>
        </section>
    );
}
