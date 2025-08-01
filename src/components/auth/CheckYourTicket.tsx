"use client";
import { FetchInstance } from "@/api/FetchInstance";
import { useRouter } from "@/i18n/navigation";
import { IComplateResponce } from "@/types";
import { useTranslations } from "next-intl";
import React, { useState } from "react";


const CheckYourTicket = () => {
  const t = useTranslations("check_ticket");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [userLoading, setUserLoading] = useState(false);
  const [userError, setUserError] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      setUserLoading(true);
      const phoneRegex = /^\d{9}$/;
      const emailRegex = /^[\w.-]+@gmail\.com$/;
      if (phoneRegex.test(value)) {
        console.log("Phone:", value);
        setError("");
        // you can add further logic here
      } else if (emailRegex.test(value)) {
        console.log("Email:", value);
        setError("");
        // you can add further logic here
      } else {
        setError("Faqat 9 xonali telefon raqam yoki @gmail.com email kiriting");
        return;
      }
      const body = { phone_or_email: value };
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
      const res = await FetchInstance<IComplateResponce>(
        "/api/user/check/ticket",
        {
          method: "POST",
          headers,
          body: JSON.stringify(body),
        }
      );
      if (res?.success) {
        router.push(`/ticket?num_or_email=${value}`);
      }

      console.log(res);
    } catch (error) {
      setUserError(error instanceof Error ? error.message : String(error));
      console.log(error);
    } finally {
      setUserLoading(false);
    }
  };

  return (
    <div className="text-center bg-white mt-4 text-black dark:!text-white text-sm">
      {t("are_you_registered")} {" "}
      <span
        className="underline text-[#e3a127] hover:cursor-pointer"
        onClick={() => {
          setOpen(true);
        }}
      >
        {t("check_your_ticket")}
      </span>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="bg-white shadow-2xl border dark:!border-[#313a54] dark:!bg-[#151a28] bg-opacity-90 rounded-lg p-6 w-full max-w-xs relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-lg font-semibold mb-4 text-center  dark:!text-white text-black">
              {t("check_your_ticket")}
            </h2>
            {userLoading ? (
              <div className="text-white text-center mb-2">{t("loading")}</div>
            ) : userError ? (
              <div className="text-red-500 text-center mb-2">{userError}</div>
            ) : null}
            <input
              type="text"
              placeholder={t("input_placeholder")}
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                setError("");
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-[#e3a127]"
            />
            {error && (
              <div className="text-red-500 text-xs mb-2 text-center">
                {error}
              </div>
            )}
            <button
              className="w-full bg-[#e3a127] text-white py-2 rounded hover:bg-[#c98c1e] transition"
              onClick={handleSubmit}
            >
              {t("submit")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckYourTicket;
