"use client"
import { FetchInstance } from "@/api/FetchInstance";
import { useRouter } from "@/lib/navigation";
import {
  IComplateResponce,
  IProfessionItem,
  IResponse,
  IValidateResponce,
} from "@/types";
import React, {
  useState,
  ChangeEvent,
  FormEvent,
  MouseEvent,
  useEffect,
} from "react";
import { toast } from "react-toastify";
import CheckYourTicket from "./CheckYourTicket";
import { useTranslations } from "@/i18n/useTranslations";

type RegisterModalProps = {
  open: boolean;
  onClose: () => void;
};

type RegisterForm = {
  type: "local" | "international";
  firstName: string;
  lastName: string;
  phone: string;
  profession_id: string;
  birth_date: string;
  gender: string;
  email?: string;
  country?: string;
  organization?: string;
};

type RegisterError = {
  phone?: string;
  status?: string;
};

const initialForm: RegisterForm = {
  type: "local",
  firstName: "",
  lastName: "",
  phone: "",
  profession_id: "",
  birth_date: "",
  gender: "",
  email: "",
  country: "",
  organization: "",
};

export default function RegisterModal({ open, onClose }: RegisterModalProps) {
  const t = useTranslations("register_modal");
  const [form, setForm] = useState<RegisterForm>(initialForm);
  const [error, setError] = useState<RegisterError>({});
  const [professions, setProfessions] = useState<IProfessionItem[]>([]);
  const [step, setStep] = useState<"register" | "otp">("register");
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [registerBody, setRegisterBody] = useState<
    Record<string, string | number | boolean | undefined>
  >({});
  const [authKey, setAuthKey] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "radio" ? value : value,
    }));
  };

  const handleType = (type: "local" | "international") =>
    setForm((prev) => ({ ...prev, type }));

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    console.log(e);

    const phoneRegex = /^\d{9}$/;
    if (!phoneRegex.test(form.phone)) {
      setError({
        phone: "Telefon raqam 901234567 formatida, 9 ta raqam bo‘lishi kerak",
      });
      return;
    } else {
      setError({});
    }
    const mappedForm: Record<string, string | number | boolean | undefined> = {
      first_name: form.firstName,
      last_name: form.lastName,
      birth_date: form.birth_date,
      gender: form.gender,
      profession_id: form?.profession_id,
    };

    // Local uchun telefon, international uchun email
    // if (form.type === "local") {
    //   mappedForm.phone = form.phone;
    // }
    // if (form.type === "international") {
    //   mappedForm.email = form.email;
    //   mappedForm.country = form?.country;
    //   mappedForm.organization = form?.organization;
    // }

    try {
      const res = await FetchInstance<IValidateResponce>(
        "/api/v1.0/register/validate",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(mappedForm),
        }
      );

      if (res?.success) {
        setRegisterBody(mappedForm);
        setAuthKey(res?.data?.auth_key);
        localStorage?.setItem("auth_key", res?.data?.auth_key);
        setStep("otp");
        toast.success("SMS Jo'natildi!");
      }
    } catch (err) {
      console.log(err);

      setError({
        status: err instanceof Error ? err.message : "Bu raqam  yoki email oldin ro'yxatdan o'tgan",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (!/^\d{6}$/.test(otp)) {
      setOtpError("6 xonali kod kiriting");
      return;
    }
    setOtpError("");

    const completeBody = {
      ...registerBody,
      auth_key: authKey,
      access_code: otp,
    };

    try {
      const res = await FetchInstance<IComplateResponce>(
        "/api/v1.0/register/complete",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(completeBody),
        }
      );
      if (res?.success) {
        router.push("/ticket");
      }
    } catch (error) {
      setOtpError(error instanceof Error ? error.message : "Tasdiqlash kodi notog'ri kiritildi.");
    } finally {
      setLoading(false);
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
    if (open) {
      getPrefessionList();
    }
  }, [open]);

  if (!open) return null;
  return (
    <div
      className="fixed inset-0  bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white dark:!bg-[#151a28] rounded-lg p-8 w-full max-w-md relative shadow-lg dark:shadow-gray-900 border border-gray-200 dark:!border-gray-700"
        onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-xl text-gray-700 dark:text-white hover:text-red-500 dark:hover:text-red-400 transition-colors"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4 text-black dark:!text-white">
          {t("title")}
        </h2>
        {step === "register" ? (
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {/* Toggle buttons */}
            <div className="flex gap-2 justify-center mb-2">
              <button
                type="button"
                className={`px-6 py-2 rounded border transition-colors duration-200 ${form.type === "local"
                  ? "bg-[#e3a127] text-white border-[#e3a127]"
                  : "bg-transparent text-gray-900 dark:text-white border-gray-400 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                onClick={() => handleType("local")}
              >
                {t("local")}
              </button>
              <button
                type="button"
                className={`px-6 py-2 rounded border transition-colors duration-200 ${form.type === "international"
                  ? "bg-[#e3a127] text-white border-[#e3a127]"
                  : "bg-transparent text-gray-900 dark:text-white border-gray-400 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                onClick={() => handleType("international")}
              >
                {t("international")}
              </button>
            </div>

            {form.type === "local" ? (
              <>
                {/* LOCAL form fields */}
                {/* First Name */}
                <input
                  name="firstName"
                  type="text"
                  placeholder={t("first_name")}
                  className="border rounded px-3 py-2 bg-transparent text-gray-900 dark:text-white"
                  required
                  value={form.firstName}
                  onChange={handleChange}
                />
                {/* Last Name */}
                <input
                  name="lastName"
                  type="text"
                  placeholder={t("last_name")}
                  className="border rounded px-3 py-2 bg-transparent text-gray-900 dark:text-white"
                  required
                  value={form.lastName}
                  onChange={handleChange}
                />
                {/* Phone Number */}
                <input
                  name="phone"
                  type="tel"
                  placeholder={t("phone")}
                  maxLength={9}
                  className={`border rounded px-3 py-2 bg-transparent text-gray-900 dark:text-white ${error.phone ? "border-red-500" : ""
                    }`}
                  required
                  value={form.phone}
                  onChange={handleChange}
                />
                {error.phone && (
                  <span className="text-red-500 text-xs">{error.phone && t("phone_error")}</span>
                )}
                {/* Participation type */}
                <select
                  name="profession_id"
                  className="border rounded px-3 py-2 bg-transparent text-gray-900 dark:text-white"
                  required
                  value={form.profession_id}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    {t("participation_type")}
                  </option>
                  {professions?.map((item) => (
                    <option value={item?.id} key={item?.id}>
                      {item?.name}
                    </option>
                  ))}
                </select>
                {/* Date of Birth */}
                <input
                  name="birth_date"
                  type="date"
                  placeholder={t("birth_date")}
                  className="border rounded px-3 py-2 bg-transparent text-gray-900 dark:text-white"
                  required
                  value={form.birth_date}
                  onChange={handleChange}
                />
                {/* Gender */}
                <div className="flex items-center gap-4">
                  <span className="text-gray-900 dark:text-white">{t("gender_label")}</span>
                  <label className="flex items-center gap-1 text-gray-900 dark:text-white">
                    <input
                      type="radio"
                      name="gender"
                      value="1"
                      checked={form.gender === "1"}
                      onChange={handleChange}
                      required
                      className="!mr-1"
                    />
                    {t("male")}
                  </label>
                  <label className="flex items-center gap-1 text-gray-900 dark:text-white">
                    <input
                      type="radio"
                      name="gender"
                      value="2"
                      checked={form.gender === "2"}
                      onChange={handleChange}
                      required
                      className="!mr-1"
                    />
                    {t("female")}
                  </label>
                </div>
              </>
            ) : (
              <>
                {/* INTERNATIONAL form fields */}
                {/* First Name */}
                <input
                  name="firstName"
                  type="text"
                  placeholder={t("first_name")}
                  className="border rounded px-3 py-2 bg-transparent text-gray-900 dark:text-white"
                  required
                  value={form.firstName}
                  onChange={handleChange}
                />
                {/* Last Name */}
                <input
                  name="lastName"
                  type="text"
                  placeholder={t("last_name")}
                  className="border rounded px-3 py-2 bg-transparent text-gray-900 dark:text-white"
                  required
                  value={form.lastName}
                  onChange={handleChange}
                />
                {/* Email */}
                <input
                  name="email"
                  type="email"
                  placeholder={t("email")}
                  className="border rounded px-3 py-2 bg-transparent text-gray-900 dark:text-white"
                  required
                  value={form.email || ""}
                  onChange={handleChange}
                />
                {/* Country */}
                <select
                  name="country"
                  className="border rounded px-3 py-2 bg-transparent text-gray-900 dark:text-white"
                  required
                  value={form.country || ""}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    {t("country")}
                  </option>
                  <option value="Uzbekistan">Uzbekistan</option>
                  <option value="Kazakhstan">Kazakhstan</option>
                  <option value="USA">USA</option>
                  {/* Boshqa davlatlar qo'shishingiz mumkin */}
                </select>
                {/* Participation type */}
                <select
                  name="profession_id"
                  className="border rounded px-3 py-2 bg-transparent text-gray-900 dark:text-white"
                  required
                  value={form.profession_id}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    {t("participation_type")}
                  </option>
                  {professions?.map((item) => (
                    <option value={item?.id} key={item?.id}>
                      {item?.name}
                    </option>
                  ))}
                </select>
                {/* Organization */}
                <input
                  name="organization"
                  type="text"
                  placeholder={t("organization")}
                  className="border rounded px-3 py-2 bg-transparent text-gray-900 dark:text-white"
                  required
                  value={form.organization || ""}
                  onChange={handleChange}
                />
                {/* Date of Birth */}
                <input
                  name="birth_date"
                  type="date"
                  placeholder={t("birth_date")}
                  className="border rounded px-3 py-2 bg-transparent text-gray-900 dark:text-white"
                  required
                  value={form.birth_date}
                  onChange={handleChange}
                />
                {/* Gender */}
                <div className="flex items-center gap-4">
                  <span className="text-gray-900 dark:text-white">{t("gender_label")}</span>
                  <label className="flex items-center gap-1 text-gray-900 dark:text-white">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={form.gender === "male"}
                      onChange={handleChange}
                      required
                    />
                    {t("male")}
                  </label>
                  <label className="flex items-center gap-1 text-gray-900 dark:text-white">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={form.gender === "female"}
                      onChange={handleChange}
                      required
                    />
                    {t("female")}
                  </label>
                </div>
              </>
            )}

            {/* Submit */}
            {error.status && (
              <span className="text-red-500 text-xs">{error.status}</span>
            )}
            <button
              type="submit"
              disabled={loading}
              className="bg-[#e3a127] text-white rounded p-2 mt-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  {t("sending")}
                </>
              ) : (
                t("sign_up")
              )}
            </button>
          </form>
        ) : (
          <form className="flex flex-col gap-4" onSubmit={handleOtpSubmit}>
            <label className="text-gray-900 dark:text-white text-center text-lg mb-2">
              {t("otp_label")}
            </label>
            <input
              type="text"
              maxLength={6}
              pattern="\d{6}"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              className="border rounded px-3 py-2 bg-transparent text-gray-900 dark:text-white text-center text-xl tracking-widest"
              placeholder="______"
              required
            />
            {otpError && (
              <span className="text-red-500 text-xs">{otpError}</span>
            )}
            <button
              type="submit"
              disabled={loading}
              className="bg-[#e3a127] text-white rounded p-2 mt-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  {t("verifying")}
                </>
              ) : (
                t("verify")
              )}
            </button>
          </form>
        )}
        <CheckYourTicket />
      </div>
    </div>
  );
}
