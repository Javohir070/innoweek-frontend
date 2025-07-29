"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { IProfessionItem, IRegisterFormType, IResponse } from "@/types";
import { FetchInstance } from "@/api/FetchInstance";

type RegisterError = {
  phone?: string;
  status?: string;
};

const initialForm: IRegisterFormType = {
  firstName: "",
  lastName: "",
  phone: "",
  profession_id: "",
  birth_date: "",
  gender: "",
  email: "",
  country: "",
  organization: "",
  password: "",
  passwordRepeat: "",
  acceptTerms: false,
};
export default function RegisterRolePage() {
  const t = useTranslations("register_modal");

  const [form, setForm] = useState<IRegisterFormType>(initialForm);
  const [error, setError] = useState<RegisterError>({});
  const [professions, setProfessions] = useState<IProfessionItem[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.password !== form.passwordRepeat) {
      setError({ status: "passwords_do_not_match" });
      return;
    }
  };

  const getPrefessionList = async () => {
    try {
      const res = await FetchInstance<IResponse<IProfessionItem[]>>(
        "/api/v1.0/profession/list"
      );
      setProfessions(res?.data);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPrefessionList();
  }, []);

  return (
    <div className=" mt-10 pt-20 pb-15 flex items-center justify-center !w-full dark:bg-[radial-gradient(circle,#0085d4_0%,#031119_40%)] dark:bg-[#151a28]">
      <div className="bg-white dark:!bg-transparent rounded-2xl p-8 max-w-9/12 w-full shadow-2xl shadow-[#10374d] border dark:!border-gray-700  relative">
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-15 h-15 rounded-full bg-[#0085d4] flex items-center justify-center shadow-lg border-4 border-white dark:border-[#151a28]">
          <svg width="30" height="30" fill="#fff" viewBox="0 0 24 24">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm-1-13h2v6h-2zm0 8h2v2h-2z" />
          </svg>
        </div>
        <h2 className="!text-2xl !mt-2 font-extrabold !mb-4 !text-[#0085d4] text-center tracking-wide">
          {t("register_modal_title")}
        </h2>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-3 gap-6">
            <div>
              <input
                name="firstName"
                type="text"
                placeholder="F.I.Sh"
                className="border-2 border-[#0085d4] rounded-lg px-3 py-2  w-full bg-white text-gray-900 dark:!bg-transparent dark:text-white focus:border-[#e3a127] focus:ring-[#e3a127] focus:outline-none focus:ring-0 "
                required
                value={form.firstName}
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                name="position"
                type="text"
                placeholder="Lavozimingiz"
                className="border-2 border-[#0085d4] rounded-lg px-2 py-2 w-full bg-white text-gray-900 dark:!bg-transparent dark:text-white focus:border-[#e3a127] focus:ring-[#e3a127] focus:outline-none focus:ring-0 "
                required
                value={form.position}
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                name="position"
                type="text"
                placeholder="Ish joyingiz"
                className="border-2 border-[#0085d4] rounded-lg px-2 py-2 w-full bg-white text-gray-900 dark:!bg-transparent dark:text-white focus:border-[#e3a127] focus:ring-[#e3a127] focus:outline-none focus:ring-0 "
                required
                value={form.position}
                onChange={handleChange}
              />
            </div>
            {/* 998 ko'nishi kerak */}
            <div className="flex items-center gap-2 border-2 border-[#0085d4] rounded-lg px-2 py-2 w-full bg-white text-gray-900 dark:!bg-transparent dark:text-white focus:border-[#e3a127] focus:ring-[#e3a127] focus:outline-none focus:ring-0">
              <span className="text-gray-700 dark:text-gray-300 font-semibold">
                +998
              </span>
              <input
                name="phone"
                type="tel"
                placeholder="999999999"
                className="outline-none w-full bg-transparent text-gray-900 dark:text-white"
                required
                value={form.phone}
                onChange={(e) => {
                  // Only allow numbers, max 9 digits
                  let val = e.target.value.replace(/\D/g, "").slice(0, 9);
                  setForm((prev) => ({
                    ...prev,
                    phone: val,
                  }));
                }}
              />
            </div>

            <input
              name="email"
              type="email"
              placeholder="Email manzilingiz"
              className="border-2 border-[#0085d4] rounded-lg px-2 py-2 w-full bg-white text-gray-900 dark:!bg-transparent dark:text-white focus:border-[#e3a127] focus:ring-[#e3a127] focus:outline-none focus:ring-0 "
              required
              value={form.email}
              onChange={handleChange}
            />
            <select
              name="user_type"
              className="border-2 border-[#0085d4] rounded-lg px-2 py-2 w-full bg-white text-gray-900 dark:!bg-transparent dark:text-white focus:border-[#e3a127] focus:ring-[#e3a127] focus:outline-none focus:ring-0 "
              id="user_type"
            >
              <option value="" disabled>
                {t("participation_type")}
              </option>
              {professions?.map((item) => (
                <option value={item?.id} key={item?.id}>
                  {item?.name}
                </option>
              ))}
              {/* <option value="">{"Ishtirokchi"}</option>
              <option value="">{"Homiy"}</option>
              <option value="">{"OAV"}</option> */}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <input
                name="password"
                type="password"
                placeholder="Yangi parolni kiriting"
                className="border-2 border-[#0085d4] rounded-lg px-2 py-2 w-full bg-white text-gray-900 dark:!bg-transparent dark:text-white focus:border-[#e3a127] focus:ring-[#e3a127] focus:outline-none focus:ring-0 "
                required
                value={form.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                name="passwordRepeat"
                type="password"
                placeholder="Parolni takrorlang"
                className="border-2 border-[#0085d4] rounded-lg px-2 py-2 w-full bg-white text-gray-900 dark:!bg-transparent dark:text-white focus:border-[#e3a127] focus:ring-[#e3a127] focus:outline-none focus:ring-0 "
                required
                value={form.passwordRepeat}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input
              name="acceptTerms"
              type="checkbox"
              className="mr-2 accent-[#0085d4]"
              checked={form.acceptTerms}
              onChange={handleChange}
              required
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {"Foydalanish shartlarini qabul qilaman"}
            </span>
          </div>

          <button
            type="submit"
            className="bg-[#0085d4] w-[200px] hover:bg-[#e3a127] text-white font-bold !rounded-full p-2 flex items-center justify-center gap-2 shadow-lg transition-all duration-200 text-lg tracking-wide"
          >
            {t("sign_up")}
          </button>
        </form>
      </div>
    </div>
  );
}
