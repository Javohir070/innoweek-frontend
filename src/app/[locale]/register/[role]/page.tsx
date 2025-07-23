"use client"
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { create } from "zustand";

// Define types for the form and store
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

interface RegisterStoreType {
    data: Record<string, RegisterFormType>;
    save: (role: string, form: RegisterFormType) => void;
}

const initialForm: RegisterFormType = {
    firstName: "",
    lastName: "",
    gender: "",
    birth_date: "",
    country: "",
    phone: "",
    organization: "",
    position: "",
    email: "",
    password: "",
    passwordRepeat: "",
    acceptTerms: false,
};

const useRegisterStore = create<RegisterStoreType>((set) => ({
    data: {},
    save: (role, form) => set((state) => ({ data: { ...state.data, [role]: form } })),
}));

export default function RegisterRolePage() {
    const t = useTranslations("register_modal");
    const router = useRouter();
    const params = useParams();
    const role = typeof params.role === "string" ? params.role : Array.isArray(params.role) ? params.role[0] : "";
    const [form, setForm] = useState<RegisterFormType>(initialForm);
    const [saved, setSaved] = useState(false);
    const registerStore = useRegisterStore();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target as HTMLInputElement;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        localStorage.setItem(`register_${role}`, JSON.stringify(form));
        registerStore.save(role, form);
        setSaved(true);
    };

    return (
        <div className=" py-40 flex items-center justify-center !w-full dark:bg-[radial-gradient(circle,#0085d4_0%,#031119_45%)] dark:bg-[#151a28]">


            <div className="bg-white dark:!bg-transparent rounded-2xl p-10 max-w-7/12 w-full shadow-2xl border dark:!border-gray-700  relative">
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full bg-[#0085d4] flex items-center justify-center shadow-lg border-4 border-white dark:border-[#151a28]">
                    <svg width="40" height="40" fill="#fff" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm-1-13h2v6h-2zm0 8h2v2h-2z" /></svg>
                </div>
                <h2 className="text-2xl !mt-6 font-extrabold !mb-4 !text-[#0085d4] text-center tracking-wide">
                    {t("register_modal_title")} <span className="text-[#e3a127]">{role ? t(role as string) : ""}</span>
                </h2>
                {saved ? (
                    <div className="text-green-600 text-center font-semibold mb-4">{t("form_sent_message")}</div>
                ) : (
                    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <input
                                    name="firstName"
                                    type="text"
                                    placeholder="First name"
                                    className="border-2 border-[#0085d4] rounded-lg px-4 py-3 w-full bg-white text-gray-900 dark:!bg-transparent dark:text-white focus:border-[#e3a127] focus:ring-[#e3a127] focus:outline-none focus:ring-0 "
                                    required
                                    value={form.firstName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <input
                                    name="lastName"
                                    type="text"
                                    placeholder="Last name"
                                    className="border-2 border-[#0085d4] rounded-lg px-4 py-3 w-full bg-white text-gray-900 dark:!bg-transparent dark:text-white focus:border-[#e3a127] focus:ring-[#e3a127] focus:outline-none focus:ring-0 "
                                    required
                                    value={form.lastName}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <select
                                    name="gender"
                                    className="border-2 border-[#0085d4] rounded-lg px-4 py-3 w-full bg-white text-gray-900 dark:!bg-transparent dark:text-white focus:border-[#e3a127] focus:ring-[#e3a127] focus:outline-none focus:ring-0 "
                                    value={form.gender}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="" disabled>Select gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div>
                                <input
                                    name="birth_date"
                                    type="date"
                                    placeholder="Enter your birthday"
                                    className="border-2 border-[#0085d4] rounded-lg px-4 py-3 w-full bg-white text-gray-900 dark:!bg-transparent dark:text-white focus:border-[#e3a127] focus:ring-[#e3a127] focus:outline-none focus:ring-0 "
                                    required
                                    value={form.birth_date}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <input
                                    name="country"
                                    type="text"
                                    placeholder="Enter your country"
                                    className="border-2 border-[#0085d4] rounded-lg px-4 py-3 w-full bg-white text-gray-900 dark:!bg-transparent dark:text-white focus:border-[#e3a127] focus:ring-[#e3a127] focus:outline-none focus:ring-0 "
                                    required
                                    value={form.country}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <input
                                    name="phone"
                                    type="tel"
                                    placeholder="Enter your phone"
                                    className="border-2 border-[#0085d4] rounded-lg px-4 py-3 w-full bg-white text-gray-900 dark:!bg-transparent  dark:text-white focus:border-[#e3a127] focus:ring-[#e3a127] focus:outline-none focus:ring-0 "
                                    required
                                    value={form.phone}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <input
                                    name="organization"
                                    type="text"
                                    placeholder="Enter organization name"
                                    className="border-2 border-[#0085d4] rounded-lg px-4 py-3 w-full bg-white text-gray-900 dark:!bg-transparent dark:text-white focus:border-[#e3a127] focus:ring-[#e3a127] focus:outline-none focus:ring-0 "
                                    required
                                    value={form.organization}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <input
                                    name="position"
                                    type="text"
                                    placeholder="Enter your position"
                                    className="border-2 border-[#0085d4] rounded-lg px-4 py-3 w-full bg-white text-gray-900 dark:!bg-transparent dark:text-white focus:border-[#e3a127] focus:ring-[#e3a127] focus:outline-none focus:ring-0 "
                                    required
                                    value={form.position}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div>
                            <input
                                name="email"
                                type="email"
                                placeholder="Enter your email"
                                className="border-2 border-[#0085d4] rounded-lg px-4 py-3 w-full bg-white text-gray-900 dark:!bg-transparent dark:text-white focus:border-[#e3a127] focus:ring-[#e3a127] focus:outline-none focus:ring-0 "
                                required
                                value={form.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <input
                                    name="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    className="border-2 border-[#0085d4] rounded-lg px-4 py-3 w-full bg-white text-gray-900 dark:!bg-transparent dark:text-white focus:border-[#e3a127] focus:ring-[#e3a127] focus:outline-none focus:ring-0 "
                                    required
                                    value={form.password}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <input
                                    name="passwordRepeat"
                                    type="password"
                                    placeholder="Repeat your password"
                                    className="border-2 border-[#0085d4] rounded-lg px-4 py-3 w-full bg-white text-gray-900 dark:!bg-transparent dark:text-white focus:border-[#e3a127] focus:ring-[#e3a127] focus:outline-none focus:ring-0 "
                                    required
                                    value={form.passwordRepeat}
                                    onChange={handleChange}
                                />

                            </div>
                        </div>
                        <div className="flex items-center mt-2">
                            <input
                                name="acceptTerms"
                                type="checkbox"
                                className="mr-2 accent-[#0085d4]"
                                checked={form.acceptTerms}
                                onChange={handleChange}
                                required
                            />
                            <span className="text-sm text-gray-700 dark:text-gray-300">I accept the Terms of Use</span>
                        </div>
                        <button
                            type="submit"
                            className="bg-[#0085d4] hover:bg-[#e3a127] text-white font-bold !rounded-full p-3 mt-4 flex items-center justify-center gap-2 w-full shadow-lg transition-all duration-200 text-lg tracking-wide"
                        >
                            {t("sign_up")}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}