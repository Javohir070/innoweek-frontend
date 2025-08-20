"use client";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import minin1 from "@/assets/minin 1.png";
import minin2 from "@/assets/innoweek 1.png";
import QRCode from "react-qr-code";
import Image from "next/image";
import { IResponse, ITicketDetail } from "@/types";
import html2canvas from "html2canvas";
import { useRef } from "react";
import { FetchInstance } from "@/api/FetchInstance";
import section from "@/assets/img/section_bg_2.jpg";

interface Props {
  ticket_id: string;
}

const MyTicket: React.FC<Props> = ({ ticket_id }) => {
  console.log(ticket_id);

  const t = useTranslations("ticket");
  const [ticketData, setTicketData] = useState<ITicketDetail | null>(null);

  const ticketRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (ticketRef.current) {
      const canvas = await html2canvas(ticketRef.current, {
        useCORS: true,
        backgroundColor: null,
      });
      const link = document.createElement("a");
      link.download = "ticket.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    }
  };

  const getTicket = async () => {
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
  };

  useEffect(() => {
    getTicket();
  }, []);

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
                src={minin1}
                alt="Logo"
                className="h-12 object-fit-contain"
              />
              <Image
                src={minin2}
                alt="Logo"
                className="h-12 object-fit-contain"
              />
            </div>
            <div className="text-center">
              <h2 className=" text-lg font-bold tracking-wider !text-gray-900">
                {t("electronic_ticket")}
              </h2>
              <div className="flex flex-row items-center justify-between">
                <div className=" text-xl font-semibold">
                  {ticketData?.user?.first_name?.toUpperCase() ?? ""}
                  <br />
                  {ticketData?.user?.last_name?.toUpperCase() ?? ""}
                </div>
                <QRCode
                  value={ticket_id}
                  className="w-[50%]"
                />
              </div>
            </div>
            <div className=" text-sm text-center">
              {t("ticket_to_enter")}
            </div>
            <div className="flex items-center gap-2  text-sm mt-2">
              <span>🕒</span>
              <span>
                {t("validity_period")}: <b>11.10.2025</b>
              </span>
            </div>
            <div className="flex items-center gap-2  text-sm">
              <span>📅</span>
              <span>
                {t("date_and_time_of_visit")}:2025-10-09 dan 2025-10-11 gacha{" "}
                <b></b>
              </span>
            </div>
            <div className="flex items-center gap-2  text-sm">
              <span>📍</span>
              <span>{t("address")}</span>
            </div>
            <div className=" text-xs mt-2">
              {t("forbidden_for_others")}
            </div>
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
