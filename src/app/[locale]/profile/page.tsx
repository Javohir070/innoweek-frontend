"use client";

import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
// import Ticket from "../ticket/page";
import { IoPersonSharp } from "react-icons/io5";
import { FetchInstance } from "@/api/FetchInstance";
import { CountryObj, IResponse } from "@/types";
import section from "@/assets/img/section_bg_2.jpg";
import { PiCertificateFill } from "react-icons/pi";
import { FaTicketAlt } from "react-icons/fa";
import MyEvents from "@/components/shared/MyEvents";
import MyTicket from "@/components/shared/MyTicket";
import MyApplications from "@/components/shared/MyApplications";

export interface UserProfile {
  id: number;
  user_type: number;
  first_name: string;
  last_name: string;
  middle_name: string | null;
  company_name: string | null;
  company_inn: string | null;
  company_logo: string | null;
  pinfl: string | null;
  passport_serial: string | null;
  passport_number: string | null;
  address: string | null;
  position: string | null;
  phone: string | null;
  avatar: string | null;
  username: string | null;
  email: string | null;
  email_verified_at: string | null;
  confirmed: boolean;
  status: string;
  created_at: string;
  updated_at: string;
  country_id: number;
  country_name: string | null;
  region_id: number | null;
  district_id: number | null;
  p_type_id: number | null;
  department_id: number | null;
  birth_date: string | null;
  profession_id: number | null;
  organization: string | null;
  gender: string | number | null;
  ticket: {
    id: number;
    user_id: number;
    archive_id: number;
    ticket_id: string;
    status: string;
    created_at: string;
    updated_at: string;
  };
  role?: string;
  country?: string | CountryObj | null;
  profession?: ProfessionObj | null;
}

interface ProfessionObj {
  id: number;
  user_id: number;
  name_uz?: string;
  name_en?: string;
  name_ru?: string;
  status?: string;
  created_at?: string | null;
  updated_at?: string | null;
}

const SIDEBAR_ITEMS = [
  { key: "profile", labelKey: "sidebar_profile", icon: <IoPersonSharp /> },
  { key: "programm", labelKey: "sidebar_program", icon: <FaTicketAlt /> },
  {
    key: "certificate",
    labelKey: "sidebar_certificate",
    icon: <PiCertificateFill />,
  },
  { key: "ticket", labelKey: "sidebar_ticket", icon: <FaTicketAlt /> },
  { key: "applications", labelKey: "sidebar_eco_ediethon", icon: <FaTicketAlt /> },
];

export default function ProfilePage() {
  const t = useTranslations("profile");
  const coming = useTranslations("cooming_soon");
  const params = useParams();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("profile");

  const tez_kunda = () => (
    <div
      className="min-h-32 flex justify-center items-center  rounded-2xl !shadow-lg overflow-hidden border border-gray-200 dark:!border-gray-700 shadow-gray-300 dark:shadow-blue-500 h-full"
      style={{
        backgroundImage: `url(${section.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h3 className="!text-gray-800 !font-bold">{coming("cooming_soon")}</h3>
    </div>
  );

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await FetchInstance<IResponse<UserProfile>>(
          "/api/v1.0/user/me",
          {
            method: "POST",
          }
        );
        if (response) {
          setProfile(response?.data);
        } else {
          setError(t("error_fetch_profile"));
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : t("error_unknown")
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [t]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0085d4]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0085d4]/10 to-[#031119]/10">
        <div className="text-center p-8 bg-white dark:bg-[#151a28] rounded-2xl shadow-xl !max-w-6xl !w-full">
          <div className="text-5xl mb-4">⚠️</div>
          <h3 className="text-xl font-bold text-gray-700 dark:text-white mb-2">
            {t("error_occurred")}
          </h3>
          <p className="text-gray-500 dark:text-gray-300">{error}</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0085d4]/10 to-[#031119]/10">
        <div className="text-center p-8 bg-white dark:bg-[#151a28] rounded-2xl shadow-xl !max-w-6xl !w-full">
          <div className="text-5xl mb-4">👤</div>
          <h3 className="text-xl font-bold text-gray-700 dark:text-white mb-2">
            {t("no_profile_found")}
          </h3>
          <p className="text-gray-500 dark:text-gray-300">
            Please register first to view your profile
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 pb-8 px-2 container md:px-4 mt-16">
      <div className="max-w-full mx-auto flex flex-col md:flex-row gap-6 min-h-[75vh]">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-white dark:!bg-transparent rounded-2xl !shadow-lg border border-gray-200 dark:!border-gray-700 shadow-gray-300 dark:shadow-blue-500">
          <div className="py-4 px-3 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between gap-2.5 space-x-3">
              {/* <div className="!w-12 !h-12 m-0 rounded-full bg-gradient-to-r  flex items-center justify-center px-3 py-3 font-bold text-lg">
                {profile.first_name?.charAt(0)}
                {profile.last_name?.charAt(0)}
              </div> */}
              <div>
                <h3 className="font-medium !text-gray-900 dark:!text-white !mb-0">
                  {profile.first_name} {profile.last_name}
                </h3>
                <p className="text-sm !text-gray-600 dark:text-gray-400 m-0">
                  {(() => {
                    if (
                      profile.profession &&
                      typeof profile.profession === "object"
                    ) {
                      const locale = params?.locale || "uz";
                      if (locale === "en")
                        return profile.profession.name_en || "-";
                      if (locale === "ru")
                        return profile.profession.name_ru || "-";
                      return profile.profession.name_uz || "-";
                    }
                    return "-";
                  })()}
                </p>
              </div>
            </div>
          </div>
          <nav className="p-2">
            {SIDEBAR_ITEMS.map((item) => (
              <button
                key={item.key}
                className={`w-full flex items-center space-x-3 px-4 py-3 mb-1 rounded-lg transition-all duration-200 ${
                  activeTab === item.key
                    ? "bg-[#0085d4]/10 dark:bg-[#e3a127]/20 text-[#0085d4] dark:text-[#e3a127] font-semibold"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
                onClick={() => setActiveTab(item.key)}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{t(item.labelKey)}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {activeTab === "profile" && (
            <div
              className="min-h-32 dark:!bg-[#151a28] rounded-2xl !shadow-lg overflow-hidden border border-gray-200 dark:!border-gray-700 shadow-gray-300 dark:shadow-blue-500 h-full"
              style={{
                backgroundImage: `url(${section.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Profile Header */}
              <div className="bg-gradient-to-r from-[#0085d4]/20 to-white/30 p-6 text-center relative">
                <div className="absolute top-4 right-4 border-gray-800 border backdrop-blur-md px-3 py-1 rounded-full text-xs">
                  <span className="font-semibold">
                    {profile?.status === "active" ? t("active") : t("inactive")}
                  </span>
                </div>
                <div className="w-20 h-20 mx-auto rounded-full bg-white/20 backdrop-blur-md border-4 border-white flex items-center justify-center text-3xl font-bold mb-3 text-[#0085d4] uppercase">
                  {profile.first_name?.charAt(0)}
                  {profile.last_name?.charAt(0)}
                </div>
                <h1 className="text-2xl mt-0 font-bold !text-[#0085d4] capitalize !text-shadow-2xs">
                  {profile.first_name} {profile.last_name}
                </h1>
                <p className="m-0 text-[#0085d4] bottom-3">
                  {(() => {
                    if (
                      profile.profession &&
                      typeof profile.profession === "object"
                    ) {
                      const locale = params?.locale || "uz";
                      if (locale === "en")
                        return profile.profession.name_en || "-";
                      if (locale === "ru")
                        return profile.profession.name_ru || "-";
                      return profile.profession.name_uz || "-";
                    }
                    return "-";
                  })()}
                </p>
              </div>

              {/* Profile Details */}
              <div className="p-6">
                <h3 className="!font-semibold !text-center !text-gray-600 dark:!text-gray-400 uppercase !text-[20px] tracking-wider mb-4 pb-2 border-b border-gray-200 dark:!border-gray-700">
                  {t("personal_information")}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <ProfileField
                      label={t("gender")}
                      value={
                        String(profile.gender) === "1"
                          ? t("male")
                          : String(profile.gender) === "2"
                          ? t("female")
                          : profile.gender
                          ? String(profile.gender)
                          : "-"
                      }
                    />
                    <ProfileField
                      label={t("country")}
                      value={(() => {
                        if (
                          profile.country &&
                          typeof profile.country === "object"
                        ) {
                          const locale = params?.locale || "uz";
                          if (locale === "en")
                            return (
                              profile.country.name_en ||
                              profile.country.name_uz ||
                              profile.country.name_ru ||
                              "-"
                            );
                          if (locale === "ru")
                            return (
                              profile.country.name_ru ||
                              profile.country.name_uz ||
                              profile.country.name_en ||
                              "-"
                            );
                          return (
                            profile.country.name_uz ||
                            profile.country.name_en ||
                            profile.country.name_ru ||
                            "-"
                          );
                        }
                        if (
                          typeof profile.country === "string" &&
                          profile.country
                        ) {
                          return profile.country;
                        }
                        return "-";
                      })()}
                    />
                    {profile?.phone && (
                      <ProfileField
                        label={t("phone")}
                        value={profile.phone || "-"}
                      />
                    )}
                    {profile?.email && (
                      <div className="mt-6">
                        <ProfileField
                          label={t("email")}
                          value={profile.email || "-"}
                        />
                      </div>
                    )}
                  </div>

                  {/* Professional Information */}
                  <div className="space-y-4">
                    <ProfileField
                      label={t("organization")}
                      value={profile.organization || "-"}
                    />
                    <ProfileField
                      label={t("position")}
                      value={profile.position || "-"}
                    />
                    <ProfileField
                      label={t("profession")}
                      value={(() => {
                        if (
                          profile.profession &&
                          typeof profile.profession === "object"
                        ) {
                          const locale = params?.locale || "uz";
                          if (locale === "en")
                            return (
                              profile.profession.name_en ||
                              profile.profession.name_uz ||
                              profile.profession.name_ru ||
                              "-"
                            );
                          if (locale === "ru")
                            return (
                              profile.profession.name_ru ||
                              profile.profession.name_uz ||
                              profile.profession.name_en ||
                              "-"
                            );
                          return (
                            profile.profession.name_uz ||
                            profile.profession.name_en ||
                            profile.profession.name_ru ||
                            "-"
                          );
                        }
                        return "-";
                      })()}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
       
          {activeTab === "certificate" && tez_kunda()}

          {activeTab === "ticket" && (
            <div className="bg-white dark:!bg-[#151a28] rounded-2xl !shadow-lg border border-gray-200 dark:!border-gray-700 overflow-hidden shadow-gray-300 dark:shadow-blue-500 h-full">
              <div className="px-4 pt-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                <h3 className="font-semibold !text-gray-800 dark:text-white">
                  {t("My_Ticket")}
                </h3>
              </div>
              <div className="p-0 md:p-8 min-h-[400px]">
                <MyTicket ticket_id={profile?.ticket?.ticket_id} />
              </div>
            </div>
          )}
          {activeTab == "programm" && <MyEvents />}
          {activeTab === "applications" && <MyApplications />}
        </div>
      </div>
    </div>
  );
}

function ProfileField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-start py-2 border-b border-gray-100 dark:border-gray-800 last:border-0">
      <p className="text-sm m-0 p-0 font-medium !text-gray-600 dark:!text-gray-300">
        {label}
      </p>
      <p className="text-right m-0 p-0 text-gray-900 dark:text-white font-medium break-all max-w-[60%]">
        {value || "-"}
      </p>
    </div>
  );
}
