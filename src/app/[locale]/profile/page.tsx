"use client";

import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

interface RegisterFormType {
    firstName: string;
    lastName: string;
    gender: string;
    birth_date: string;
    country: string;
    phone: string;
    organization: string;
    position: string;
    email: string;
    password: string;
    passwordRepeat: string;
    acceptTerms: boolean;
}

export default function ProfilePage() {
    const t = useTranslations("profile");
    const params = useParams();
    const role = typeof params.role === "string" ? params.role : Array.isArray(params.role) ? params.role[0] : "";
    const [profile, setProfile] = useState<RegisterFormType | null>(null);

    useEffect(() => {
        let data = null;
        if (role) {
            data = localStorage.getItem(`register_${role}`);
        }
        if (!data) {
            const keys = Object.keys(localStorage).filter((k) => k.startsWith("register_"));
            if (keys.length > 0) data = localStorage.getItem(keys[0]);
        }
        if (data) setProfile(JSON.parse(data));
    }, [role]);

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
        <div className="pt-16 pb-8 px-2">
            <div className="max-w-6xl mx-auto">
                <div className="bg-white dark:bg-[#151a28] rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:!border-gray-700">
                    {/* Profile Header */}
                    <div className="bg-gradient-to-r from-[#0085d4] to-[#e3a127] p-4 text-center">
                        <div className="w-16 h-16 mx-auto rounded-full bg-white/20  backdrop-blur-md border-4 border-white/30 flex items-center justify-center text-3xl text-white font-bold mb-2">
                            {profile.firstName.charAt(0)}{profile.lastName.charAt(0)}
                        </div>
                        <h1 className="text-xl font-bold text-white mt-0">
                            {profile.firstName} {profile.lastName}
                        </h1>
                        <p className="text-white/90 mt-1 mb-0 text-sm">{profile.position} at {profile.organization}</p>
                    </div>

                    {/* Profile Details */}
                    <div className="p-4 md:p-6 dark:!bg-[#151a28] bg-white">
                        <div className="grid grid-cols-2 gap-4">
                            {/* Personal Information */}
                            <div className="space-y-2">
                                <h3 className="font-semibold !text-gray-600 dark:!text-gray-400 uppercase !text-[20px] tracking-wider !mb-2">
                                    Personal Information
                                </h3>
                                <ProfileField label={t("gender")} value={t(profile.gender)} />
                                <ProfileField label={t("birth_date")} value={profile.birth_date} />
                                <ProfileField label={t("country")} value={profile.country} />
                                <ProfileField label={t("phone")} value={profile.phone} />
                            </div>
                            {/* Professional Information */}
                            <div className="space-y-2">
                                <h3 className="font-semibold !text-gray-500 dark:text-gray-400 uppercase !text-[20px] tracking-wider !mb-2">
                                    Professional Information
                                </h3>
                                <ProfileField label={t("organization")} value={profile.organization} />
                                <ProfileField label={t("position")} value={profile.position} />
                                <ProfileField label={t("email")} value={profile.email} />
                            </div>
                        </div>
                    </div>
                    {/* Footer */}
                    <div className="bg-gray-50 dark:!bg-gray-800/90 px-4 py-3 text-center text-xs text-gray-500 dark:text-gray-400">
                        Registered as: <span className="font-medium capitalize">{role || "participant"}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ProfileField({ label, value }: { label: string; value: string }) {
    return (
        <div>
            <p className="text-sm my-1 font-medium text-gray-500 dark:text-gray-400">{label}</p>
            <p className="mt-1 !mb-3 text-gray-900 dark:text-white font-medium">{value || "-"}</p>
        </div>
    );
}