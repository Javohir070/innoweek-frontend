"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import minin1 from "@/assets/minin 1.png";
import minin2 from "@/assets/img/logo_inno.png";
import minin3 from "@/assets/img/vazirlik_logo.jpg";
import QRCode from "react-qr-code";
import Image from "next/image";
import { IResponse, ITicketDetail } from "@/types";
import html2canvas from "html2canvas";
import { useRef } from "react";
import { FetchInstance } from "@/api/FetchInstance";
import section from "@/assets/img/section_bg_2.jpg";

interface Props {
  ticket_id: string;
  full_number: string;
}

const MyTicket: React.FC<Props> = ({ ticket_id, full_number }) => {
  const t = useTranslations("ticket");
  const [ticketData, setTicketData] = useState<ITicketDetail | null>(null);

  const ticketRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (ticketRef.current) {
      try {
        const canvas = await html2canvas(ticketRef.current, {
          useCORS: true,
          allowTaint: false,
          scale: 2,
          backgroundColor: null,
          ignoreElements: (element) => {
            // oklch ranglarini o'z ichiga olgan elementlarni e'tiborsiz qoldirish
            const computedStyle = window.getComputedStyle(element);
            return (
              computedStyle.color.includes("oklch") ||
              computedStyle.backgroundColor.includes("oklch") ||
              computedStyle.borderColor.includes("oklch")
            );
          },
        });
        const link = document.createElement("a");
        link.download = `ticket-${ticket_id}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
      } catch (error) {
        console.error("Ticket yuklab olishda xatolik:", error);
        // Fallback: simple screenshot
        try {
          const canvas = await html2canvas(ticketRef.current, {
            useCORS: true,
            allowTaint: true,
            scale: 1,
            backgroundColor: "#ffffff",
          });
          const link = document.createElement("a");
          link.download = `ticket-${ticket_id}.png`;
          link.href = canvas.toDataURL("image/png");
          link.click();
        } catch (fallbackError) {
          alert(
            "Ticketni yuklab olishda xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring."
          );
          console.error("Fallback ham ishlamadi:", fallbackError);
        }
      }
    }
  };

  const getTicket = useCallback(async () => {
    try {
      const response = await FetchInstance<IResponse<ITicketDetail>>(
        `/api/members/get/ticket?data_id=${ticket_id}`
      );
      if (response) {
        setTicketData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [ticket_id]);

  useEffect(() => {
    getTicket();
  }, [getTicket]);

  return (
    <section
      id="portfolio"
      className="testimonials section-light-background bg-transparent min-h-[70vh] py-2"
    >
      <div className="min-h-[70vh] flex items-center justify-center gap-16 mt-6">
        <div className="flex flex-col justify-center">
          <div
            ref={ticketRef}
            style={{
              backgroundImage: `url(${section.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="rounded-xl p-6 min-w-[340px] shadow-lg flex flex-col gap-1"
          >
            <div className="flex justify-between items-center mb-2">
              <Image
                src={minin3}
                alt="Logo"
                className="h-12 w-[70px] object-fit-contain"
              />
              <Image
                src={minin2}
                alt="Logo"
                className="h-12 w-[130px] object-fit-contain"
              />
              <Image
                src={minin1}
                alt="Logo"
                className="h-12 w-[70px] object-fit-contain"
              />
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold">
                {ticketData?.user?.first_name?.toUpperCase() ?? ""}{" "}
                {ticketData?.user?.last_name?.toUpperCase() ?? ""}
              </div>
              {/* <div className="text-lg font-bold tracking-wider !text-gray-900">
                {t("electronic_ticket")}
              </div> */}
              <div className="flex flex-row items-center justify-center">
                <QRCode value={full_number} className="w-[180px] py-3" />
              </div>
            </div>
            <div className=" text-sm text-center">{t("ticket_to_enter")}</div>
            <div className="flex items-center gap-2  text-sm mt-2">
              <span>🕒</span>
              <span>
                {t("validity_period")}: <b>11.10.2025</b>
              </span>
            </div>
            <div className="flex items-center gap-2  text-sm">
              <span>📅</span>
              <span>
                {t("date_and_time_of_visit")}: 09-11.10.2025
                <b></b>
              </span>
            </div>
            <div className="flex items-center gap-2  text-sm">
              <span>📍</span>
              <span>{t("address")}</span>
            </div>
            <div className=" text-xs mt-2">{t("forbidden_for_others")}</div>
          </div>
          <button
            onClick={handleDownload}
            className="mt-4 mx-auto bg-blue-500 text-white rounded p-2"
          >
            {t("download_as_image")}
          </button>
        </div>
      </div>
    </section>
  );
};

export default MyTicket;
