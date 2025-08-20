"use client";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import minin1 from "@/assets/minin 1.png";
import minin2 from "@/assets/innoweek 1.png";
import QRCode from "react-qr-code";
import Image from "next/image";
import { ITicketItem } from "@/types";
import html2canvas from "html2canvas";
import { useRef } from "react";

interface Props {
  ticket_id: string;
}

const MyTicket: React.FC<Props> = ({ ticket_id }) => {
  console.log(ticket_id);

  const t = useTranslations("ticket");
  const [ticketData, setTicketData] = useState<ITicketItem | null>(null);

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

  useEffect(() => {
    // if (value) {
    //   handleSubmit();
    // } else {
    //   getTicket();
    // }
  }, []);

  return (
    <section
      id="portfolio"
      className="testimonials section-light-background bg-transparent min-h-[70vh] py-2"
    >
      {/* <div className="min-h-[70vh] flex items-center justify-center gap-16 mt-6">
        <div className="flex flex-col justify-center">
          <div
            ref={ticketRef}
            style={{
              background:
                "linear-gradient(to bottom, #fde047 0%, #f97316 100%)",
            }}
            className="rounded-xl p-6 w-[340px] shadow-lg flex flex-col gap-1"
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
              <h2 className="text-white text-lg font-bold tracking-wider">
                {t("electronic_ticket")}
              </h2>
              <div className="flex flex-row items-center justify-between">
                <div className="text-white text-xl font-semibold">
                  {ticketData?.last_name ?? ""}
                  <br />
                  {ticketData?.first_name}
                </div>
                <QRCode
                  value="1HB5XMLmzFVj8ALj6mfBsbifRoD4miY36v"
                  className="w-[60%] h-100"
                />
              </div>
            </div>
            <div className="text-white text-sm text-center">
              {t("ticket_to_enter")}
            </div>
            <div className="flex items-center gap-2 text-white text-sm mt-2">
              <span>🕒</span>
              <span>
                {t("validity_period")}: <b>11.10.2025</b>
              </span>
            </div>
            <div className="flex items-center gap-2 text-white text-sm">
              <span>📅</span>
              <span>
                {t("date_and_time_of_visit")}: <b>9-11.10.2025 11:00</b>
              </span>
            </div>
            <div className="flex items-center gap-2 text-white text-sm">
              <span>📍</span>
              <span>{t("address")}</span>
            </div>
            <div className="text-white text-xs mt-2">
              {t("forbidden_for_others")}
            </div>
          </div>
          <button
            onClick={handleDownload}
            className="mt-4 mx-auto bg-[#e3a127] text-white rounded p-2"
          >
            {t("download_as_image")}
          </button>
        </div>
      </div> */}
    </section>
  );
};

export default MyTicket;

