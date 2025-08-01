"use client";
import { useRouter, usePathname } from "next/navigation";
import { IoMdPerson } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import { useTranslations } from "next-intl";
import Avatar from "@/assets/img/avatar.png";
import Image from "next/image";
import { Dropdown, MenuProps } from "antd";

interface ProfileDropdownProps {
    user: {
        first_name: string;
        last_name: string;
        avatar?: string | null;
        id?: number | string;
    };
    onLogout: () => void;
}

export default function ProfileDropdown({ user, onLogout }: ProfileDropdownProps) {
    const router = useRouter();
    const t = useTranslations("profile");
    const pathname = usePathname();
    // Extract locale from pathname (assumes /[locale]/...)
    const locale = pathname?.split("/")[1] || "uz";

    const getShortName = (first: string, last: string) => {
        return `${first?.charAt(0)?.toUpperCase() || ""}.${last || ""}`;
    };

    const handleProfileClick = () => {
        router.push(`/${locale}/profile`);
    };

    const handleLogout = () => {
        if (typeof window !== "undefined") {
            localStorage.clear();
            // Optionally, you can remove only the token: localStorage.removeItem('token');
            window.location.reload();
        }
        onLogout();
    };

    const items: MenuProps["items"] = [
        {
            key: "profile",
            label: (
                <div
                    className="flex items-center gap-2 pr-4 pl-2 py-2 hover:bg-gray-100 transition rounded cursor-pointer"
                    onClick={handleProfileClick}
                >
                    <IoMdPerson className="text-lg text-gray-600" />
                    <p className="font-medium text-gray-800 !m-0">{t("profile_title")}</p>
                </div>
            ),
        },
        {
            type: "divider",
        },
        {
            key: "logout",
            label: (
                <div
                    className="pr-4 pl-2 flex items-center gap-2 py-2 text-red-600 font-medium hover:bg-red-50 rounded cursor-pointer"
                    onClick={handleLogout}
                >
                    <FiLogOut />
                    {t("logout")}
                </div>
            ),
        },
    ];

    return (
        <Dropdown menu={{ items }} trigger={["click"]} placement="bottom" arrow>
            <div className="flex items-center gap-2 cursor-pointer">
                <div className="relative flex items-center !w-8 !h-8 rounded-full border border-gray-300 bg-white overflow-hidden shadow-sm cursor-pointer hover:ring-1 hover:border-blue-600 hover:ring-gray-300 transition">
                    <Image
                        width={32}
                        height={32}
                        src={Avatar}
                        alt={user.first_name?.[0]?.toUpperCase()}
                        className="w-full h-full object-cover bg-white"
                    />
                </div>
                <p className="m-0   font-semibold text-gray-800">
                    {user.first_name}
                </p>
            </div>
        </Dropdown>
    );
}
