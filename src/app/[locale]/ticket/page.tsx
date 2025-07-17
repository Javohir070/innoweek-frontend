"use client";
import React, { useEffect, useState } from "react";
import minin1 from "@/assets/minin 1.png";
import minin2 from "@/assets/innoweek 1.png";
import minin3 from "@/assets/MO123 1.png";
import QRCode from "react-qr-code";
import Image from "next/image";
import { FetchInstance } from "@/api/FetchInstance";
import { useSearchParams } from "next/navigation";
import { IResponse, ITicketItem } from "@/types";
import html2canvas from "html2canvas";
import { useRef } from "react";

const Ticket = () => {
  const searchParams = useSearchParams();
  const value = searchParams.get("num_or_email");
  const [ticketData, setTicketData] = useState<ITicketItem | null>(null);

  const ticketRef = useRef<HTMLDivElement>(null);

  const getTicket = async () => {
    try {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("auth_token")
          : null;
      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
      const res = await FetchInstance<IResponse<ITicketItem>>(
        "/api/v1.0/user/me",
        {
          method: "POST",
          headers,
        }
      );
      if (res?.success) {
        setTicketData(res?.data);
      }
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    try {
      const body = { phone_or_email: value };
      const res = await FetchInstance<IResponse<ITicketItem>>(
        "/api/user/check/ticket",
        {
          method: "POST",
          body: JSON.stringify(body),
        }
      );
      console.log(res);
      if (res?.success) {
        setTicketData(res?.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  const handleDownload = async () => {
    if (ticketRef.current) {
      const canvas = await html2canvas(ticketRef.current, {
        useCORS: true,
        backgroundColor: null, // yoki '#fff'
      });
      const link = document.createElement("a");
      link.download = "ticket.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    }
  };

  useEffect(() => {
    if (value) {
      handleSubmit();
    } else {
      getTicket();
    }
  }, []);

  return (
    <section
      id="portfolio"
      className="testimonials section-light-background bg-transparent min-h-[70vh] py-2"
    >
      <div className="min-h-[70vh] flex items-center justify-center gap-16 mt-24">
        {/* Ticket Card */}
        <div
          ref={ticketRef}
          style={{ background: "linear-gradient(to bottom, #fde047 0%, #f97316 100%)" }}
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
            <Image
              src={minin3}
              alt="Logo"
              className="h-12 object-fit-contain"
            />
          </div>
          <div className="text-center">
            <h2 className="text-white text-lg font-bold tracking-wider">
              ELECTRONIC TICKET
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
            Ticket to enter InnoWeek-2025
          </div>
          <div className="flex items-center gap-2 text-white text-sm mt-2">
            <span>🕒</span>
            <span>
              Validity period: <b>11.10.2025</b>
            </span>
          </div>
          <div className="flex items-center gap-2 text-white text-sm">
            <span>📅</span>
            <span>
              Date and time of visit: <b>9-11.10.2025 11:00</b>
            </span>
          </div>
          <div className="flex items-center gap-2 text-white text-sm">
            <span>📍</span>
            <span>
              {"Toshkent, Mirzo Ulug'bek tumani, Milliy Bog' ko'chasi, 1"}
            </span>
          </div>
          <div className="text-white text-xs mt-2">
            It is strictly forbidden for another person to use this pass.
          </div>
          <button
          onClick={handleDownload}
          className="mt-4 bg-[#e3a127] text-white rounded p-2"
        >
          Download as Image
        </button>
        </div>
        {/* Google Play Card */}
        <div className="bg-[#0a1c4c] rounded-xl p-6 w-[340px] shadow-lg flex flex-col items-center gap-4">
          <div className="text-white text-center text-sm mb-2">
            Download this app to access or use our system!
          </div>
          <QRCode
            value="1HB5XMLmzFVj8ALj6mfBsbifRoD4miY36v"
            className="w-full"
          />
          <a
            href="https://play.google.com/store"
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* <img
              src="/google-play-badge.png"
              alt="Google Play"
              className="h-12 mt-2"
            /> */}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Ticket;
