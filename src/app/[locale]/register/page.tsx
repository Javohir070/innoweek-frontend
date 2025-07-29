// Strict form validation: all required fields must be filled and valid
"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import {
  IProfessionItem,
  IRegisterFormType,
  IResponse,
  IValidateResponce,
  IComplateResponce,
} from "@/types";
import { FetchInstance } from "@/api/FetchInstance";
import { toast } from "react-toastify";
import { useRouter } from "@/i18n/navigation";

type RegisterError = {
  phone?: string;
  status?: string;
};

type RegisterFormWithPosition = IRegisterFormType & {
  position: string;
  type: "local" | "international";
};

const initialForm: RegisterFormWithPosition = {
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
  position: "",
  type: "local",
};

export default function RegisterRolePage() {
  const t = useTranslations("register_modal");
  const router = useRouter();

  const [form, setForm] = useState<RegisterFormWithPosition>(initialForm);
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
  const [registerType, setRegisterType] = useState<
    "local" | "international" | null
  >("local");

  // Strict form validation: all required fields must be filled and valid
  const isFormValid =
    form.firstName.trim() !== "" &&
    form.lastName.trim() !== "" &&
    form.position.trim() !== "" &&
    // form.organization.trim() !== "" &&
    form.phone.trim().length === 9 &&
    form.profession_id !== "" &&
    form.password.length >= 6 &&
    form.password === form.passwordRepeat &&
    form.acceptTerms;

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

  const handleType = (type: "local" | "international") => {
    setForm((prev) => ({ ...prev, type }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // Password validation
    if (form.password !== form.passwordRepeat) {
      setError({ status: "passwords_do_not_match" });
      setLoading(false);
      return;
    }

    // Phone validation for local type
    if (form.type === "local" && !/^\d{9}$/.test(form.phone)) {
      setError({
        phone: "Telefon raqam 901234567 formatida, 9 ta raqam bo'lishi kerak",
      });
      setLoading(false);
      return;
    } else {
      setError({});
    }

    const mappedForm: Record<string, string | number | boolean | undefined> = {
      first_name: form.firstName,
      last_name: form.lastName, // Bu maydon qo'shildi
      position: form.position,
      phone: form.phone,
      email: form.email,
      password: form.password,
      profession_id: form.profession_id,
      birth_date: form.birth_date,
      gender: form.gender,
      country: form.country,
      organization: form.organization,
    };

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
        status:
          err instanceof Error
            ? err.message
            : "Bu raqam yoki email oldin ro'yxatdan o'tgan",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!/^\d{6}$/.test(otp)) {
      setOtpError("6 xonali kod kiriting");
      setLoading(false);
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
        router.push("/profile");
      }
    } catch (error) {
      setOtpError(
        error instanceof Error
          ? error.message
          : "Tasdiqlash kodi noto'g'ri kiritildi."
      );
    } finally {
      setLoading(false);
    }
  };

  const getPrefessionList = async () => {
    try {
      const res = await FetchInstance<IResponse<IProfessionItem[]>>(
        "/api/v1.0/profession/list?status=active"
      );
      setProfessions(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPrefessionList();
  }, []);

  return (
    <div className="mt-10 pt-20 pb-15 flex items-center justify-center !w-full dark:bg-[radial-gradient(circle,#0085d4_0%,#031119_40%)] dark:bg-[#151a28]">
      <div className="bg-white dark:!bg-transparent rounded-2xl p-8 max-w-9/12 w-full shadow-2xl shadow-[#10374d74] border dark:!border-gray-700 relative">
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-15 h-15 rounded-full bg-[#0085d4] flex items-center justify-center shadow-lg border-4 border-white dark:border-[#151a28]">
          <svg width="30" height="30" fill="#fff" viewBox="0 0 24 24">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm-1-13h2v6h-2zm0 8h2v2h-2z" />
          </svg>
        </div>
        <h2 className="!text-2xl !mt-2 font-extrabold !mb-4 !text-[#0085d4] text-center tracking-wide">
          {t("register_modal_title")}
        </h2>

        <div className="flex flex-row justify-center items-center gap-4 mb-8">
          <button
            onClick={() => setRegisterType("local")}
            className="w-[200px] bg-[#0085d4] text-white px-6 py-2 rounded-full font-bold"
          >
            Local
          </button>
          <button
            onClick={() => setRegisterType("international")}
            className="w-[200px] bg-[#e3a127] text-white px-6 py-2 rounded-full font-bold"
          >
            International
          </button>
        </div>

        {/* Local registration form */}
        {registerType === "local" && (
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <input
                  name="firstName"
                  type="text"
                  placeholder="Ism"
                  className="border-2 border-[#0085d4] rounded-lg px-3 py-2 w-full"
                  required
                  value={form.firstName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <input
                  name="lastName"
                  type="text"
                  placeholder="Familiya"
                  className="border-2 border-[#0085d4] rounded-lg px-3 py-2 w-full"
                  required
                  value={form.lastName}
                  onChange={handleChange}
                />
              </div>
              <div>
                {/* <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Telefon raqam
                </label> */}
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-[#0085d4] bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                    +998
                  </span>
                  <input
                    name="phone"
                    type="tel"
                    placeholder="Telefon raqam (901234567)"
                    className="border-2 border-[#0085d4] rounded-r-lg px-3 py-2 w-full"
                    required
                    maxLength={9}
                    pattern="\d{9}"
                    value={form.phone}
                    onChange={(e) => {
                      let val = e.target.value.replace(/\D/g, "").slice(0, 9);
                      setForm((prev) => ({
                        ...prev,
                        phone: val,
                      }));
                    }}
                  />
                </div>
                {/* <span className="text-xs text-gray-500 dark:text-gray-400">
                  Format: 901234567
                </span> */}
              </div>
              <div>
                <select
                  name="profession_id"
                  className="border-2 border-[#0085d4] rounded-lg px-3 py-2 w-full"
                  required
                  value={form.profession_id}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Kasbni tanlang
                  </option>
                  {professions?.map((item) => (
                    <option value={item?.id} key={item?.id}>
                      {item?.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <input
                  name="birth_date"
                  type="date"
                  className="border-2 border-[#0085d4] rounded-lg px-3 py-2 w-full"
                  required
                  value={form.birth_date}
                  onChange={handleChange}
                />
              </div>
              <div>
                <select
                  name="gender"
                  className="border-2 border-[#0085d4] rounded-lg px-3 py-2 w-full"
                  required
                  value={form.gender}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Jins
                  </option>
                  <option value="1">Erkak</option>
                  <option value="2">Ayol</option>
                </select>
              </div>
            </div>
            {/* Password inputs */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <input
                  name="password"
                  type="password"
                  placeholder="Parol"
                  className="border-2 border-[#0085d4] rounded-lg px-3 py-2 w-full"
                  required
                  value={form.password}
                  onChange={handleChange}
                />
              </div>
              <div>
                <input
                  name="passwordRepeat"
                  type="password"
                  placeholder="Parolni qayta kiriting"
                  className="border-2 border-[#0085d4] rounded-lg px-3 py-2 w-full"
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
                Foydalanish shartlarini qabul qilaman
              </span>
            </div>

            {error.status && (
              <span className="text-red-500 text-xs">{error.status}</span>
            )}

            <button
              type="submit"
              disabled={loading || !isFormValid}
              className={`w-[200px] font-bold !rounded-full p-2 flex items-center justify-center gap-2 shadow-lg transition-all duration-200 text-lg tracking-wide mx-auto ${
                loading || !isFormValid
                  ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                  : "bg-[#0085d4] hover:bg-[#e3a127] text-white"
              }`}
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
        )}

        {/* International registration form */}
        {registerType === "international" && (
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <input
                  name="firstName"
                  type="text"
                  placeholder="Ism"
                  className="border-2 border-[#0085d4] rounded-lg px-3 py-2 w-full"
                  required
                  value={form.firstName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <input
                  name="lastName"
                  type="text"
                  placeholder="Familiya"
                  className="border-2 border-[#0085d4] rounded-lg px-3 py-2 w-full"
                  required
                  value={form.lastName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="border-2 border-[#0085d4] rounded-lg px-3 py-2 w-full"
                  required
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <select
                  name="country"
                  className="border-2 border-[#0085d4] rounded-lg px-3 py-2 w-full"
                  required
                  value={form.country}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Davlatni tanlang
                  </option>
                  {/* country list mapping */}
                  <option value="2">Country 2</option>
                  {/* ... */}
                </select>
              </div>
              <div>
                <select
                  name="profession_id"
                  className="border-2 border-[#0085d4] rounded-lg px-3 py-2 w-full"
                  required
                  value={form.profession_id}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Kasbni tanlang
                  </option>
                  {professions?.map((item) => (
                    <option value={item?.id} key={item?.id}>
                      {item?.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <input
                  name="organization"
                  type="text"
                  placeholder="Tashkilot"
                  className="border-2 border-[#0085d4] rounded-lg px-3 py-2 w-full"
                  required
                  value={form.organization}
                  onChange={handleChange}
                />
              </div>
              <div>
                <input
                  name="birth_date"
                  type="date"
                  className="border-2 border-[#0085d4] rounded-lg px-3 py-2 w-full"
                  required
                  value={form.birth_date}
                  onChange={handleChange}
                />
              </div>
              <div>
                <select
                  name="gender"
                  className="border-2 border-[#0085d4] rounded-lg px-3 py-2 w-full"
                  required
                  value={form.gender}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Jins
                  </option>
                  <option value="1">Erkak</option>
                  <option value="2">Ayol</option>
                </select>
              </div>
            </div>
            {/* Password inputs */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <input
                  name="password"
                  type="password"
                  placeholder="Parol"
                  className="border-2 border-[#0085d4] rounded-lg px-3 py-2 w-full"
                  required
                  value={form.password}
                  onChange={handleChange}
                />
              </div>
              <div>
                <input
                  name="passwordRepeat"
                  type="password"
                  placeholder="Parolni qayta kiriting"
                  className="border-2 border-[#0085d4] rounded-lg px-3 py-2 w-full"
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
                Foydalanish shartlarini qabul qilaman
              </span>
            </div>

            {error.status && (
              <span className="text-red-500 text-xs">{error.status}</span>
            )}

            <button
              type="submit"
              disabled={loading || !isFormValid}
              className={`w-[200px] font-bold !rounded-full p-2 flex items-center justify-center gap-2 shadow-lg transition-all duration-200 text-lg tracking-wide mx-auto ${
                loading || !isFormValid
                  ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                  : "bg-[#0085d4] hover:bg-[#e3a127] text-white"
              }`}
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
        )}

        {step === "otp" && (
          <form className="flex flex-col gap-6" onSubmit={handleOtpSubmit}>
            <div className="text-center">
              <h3 className="text-xl font-bold text-[#0085d4] mb-2">
                {t("otp_title")}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {t("otp_description")}
              </p>
            </div>

            <div className="flex justify-center">
              <input
                type="text"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                className="border-2 border-[#0085d4] rounded-lg px-4 py-3 w-48 text-center text-xl tracking-widest bg-white text-gray-900 dark:!bg-transparent dark:text-white focus:border-[#e3a127] focus:ring-[#e3a127] focus:outline-none focus:ring-0"
                placeholder="______"
                required
              />
            </div>

            {otpError && (
              <div className="text-center text-red-500 text-sm">{otpError}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-[200px] font-bold !rounded-full p-2 flex items-center justify-center gap-2 shadow-lg transition-all duration-200 text-lg tracking-wide mx-auto ${
                loading
                  ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                  : "bg-[#0085d4] hover:bg-[#e3a127] text-white"
              }`}
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
      </div>
    </div>
  );
}
