"use client";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import Ticket from "../ticket/page";
import { IoPersonSharp } from "react-icons/io5";
import { FetchInstance } from "@/api/FetchInstance";
import { IResponse } from "@/types";

interface UserProfile {
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
  gender: string | null;
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
  country?: string;
}

const SIDEBAR_ITEMS = [
  { key: "profile", label: "Shaxsiy kabinet", icon: <IoPersonSharp /> },
  { key: "certificate", label: "Sertifikatim", icon: <IoPersonSharp /> },
  { key: "ticket", label: "Ticket", icon: <IoPersonSharp /> },
];

export default function ProfilePage() {
  const t = useTranslations("profile");
  const params = useParams();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("profile");

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
console.log(response);

        if (response) {
          setProfile(response?.data);
        } else {
          setError("Failed to fetch profile data");
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

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

  const role = params.role
    ? typeof params.role === "string"
      ? params.role
      : Array.isArray(params.role)
      ? params.role[0]
      : profile.role || "participant"
    : profile.role || "participant";

  return (
    <div className="pt-16 pb-8 px-2 container md:px-4 mt-16">
      <div className="max-w-full mx-auto flex flex-col md:flex-row gap-6 min-h-[75vh]">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-white dark:!bg-transparent rounded-2xl !shadow-lg border border-gray-200 dark:!border-gray-700 shadow-gray-300 dark:shadow-blue-500">
          <div className="py-4 px-3 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between gap-2.5 space-x-3">
              <div className="!w-12 !h-12 m-0 rounded-full bg-gradient-to-r from-[#0085d4] to-[#e3a127] flex items-center justify-center px-3 py-3 text-white font-bold text-lg">
                {profile.first_name?.charAt(0)}
                {profile.last_name?.charAt(0)}
              </div>
              <div>
                <h3 className="font-medium !text-gray-900 dark:!text-white !mb-0">
                  {profile.first_name} {profile.last_name}
                </h3>
                <p className="text-sm !text-gray-600 dark:text-gray-400 m-0">
                  {role}
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
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {activeTab === "profile" && (
            <div className="!bg-white min-h-32 dark:!bg-[#151a28] rounded-2xl !shadow-lg overflow-hidden border border-gray-200 dark:!border-gray-700 shadow-gray-300 dark:shadow-blue-500 h-full">
              {/* Profile Header */}
              <div className="bg-gradient-to-r from-[#0085d4] to-[#e3a127] p-6 text-center relative">
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs text-white">
                  {profile.organization} ({profile.position})
                </div>
                <div className="w-20 h-20 mx-auto rounded-full bg-white/20 backdrop-blur-md border-4 border-white/30 flex items-center justify-center text-3xl text-white font-bold mb-3">
                  {profile.first_name?.charAt(0)}
                  {profile.last_name?.charAt(0)}
                </div>
                <h1 className="text-2xl mt-0 font-bold text-white">
                  {profile.first_name} {profile.last_name}
                </h1>
                <p className="text-white/90 mt-1 text-sm">{profile.email}</p>
              </div>

              {/* Profile Details */}
              <div className="p-6 dark:!bg-gray-900">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="!font-semibold !text-gray-600 dark:!text-gray-400 uppercase !text-[20px] tracking-wider mb-4 pb-2 border-b border-gray-200 dark:!border-gray-700">
                      Personal Information
                    </h3>
                    <ProfileField
                      label={t("gender")}
                      value={profile.gender}
                    />
                    <ProfileField
                      label={t("birth_date")}
                      value={profile.birth_date}
                    />
                    <ProfileField
                      label={t("country")}
                      value={profile.country}
                    />
                    <ProfileField label={t("phone")} value={profile.phone} />
                  </div>

                  {/* Professional Information */}
                  <div className="space-y-4">
                    <h3 className="!font-semibold !text-gray-600 dark:!text-gray-400 uppercase !text-[20px] tracking-wider mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
                      Professional Information
                    </h3>
                    <ProfileField
                      label={t("organization")}
                      value={profile.organization}
                    />
                    <ProfileField
                      label={t("position")}
                      value={profile.position}
                    />
                    <div className="mt-6">
                      <ProfileField label={t("email")} value={profile.email} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "certificate" && (
            <div className="bg-white dark:!bg-[#151a28] rounded-2xl !shadow-lg shadow-gray-300 dark:shadow-blue-500 border border-gray-200 dark:!border-gray-700 overflow-hidden h-full">
              <div className="px-4 pt-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                <h3 className="font-semibold !text-gray-800 !text-2xl dark:text-white">
                  My Certificate
                </h3>
              </div>
              <div className="p-4 md:p-8 flex items-center justify-center !min-h-[400px]">
                <iframe
                  src="/pdf/Certificate%20(2).pdf"
                  className="w-full h-[600px] rounded-lg border dark:!border-gray-700"
                  title="Certificate"
                />
              </div>
            </div>
          )}

          {activeTab === "ticket" && (
            <div className="bg-white dark:!bg-[#151a28] rounded-2xl !shadow-lg border border-gray-200 dark:!border-gray-700 overflow-hidden shadow-gray-300 dark:shadow-blue-500 h-full">
              <div className="px-4 pt-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                <h3 className="font-semibold !text-gray-800 dark:text-white">
                  My Ticket
                </h3>
              </div>
              <div className="p-0 md:p-8 min-h-[400px]">
                <Ticket />
              </div>
            </div>
          )}
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
