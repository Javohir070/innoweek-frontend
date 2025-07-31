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
  ICountryItem,
} from "@/types";
import { FetchInstance } from "@/api/FetchInstance";
import { toast } from "react-toastify";
import { useRouter } from "@/i18n/navigation";
import AcceptTerms from "@/components/ui/AcceptTerms";
import { useParams } from "next/navigation";

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
  password_confirmation: "",
  acceptTerms: false,
  position: "",
  type: "local",
};

export default function RegisterRolePage() {
  const t = useTranslations("register_modal");
  const router = useRouter();
  const locale = useParams().locale || "uz";

  const [form, setForm] = useState<RegisterFormWithPosition>(initialForm);
  const [error, setError] = useState<RegisterError>({});
  const [professions, setProfessions] = useState<IProfessionItem[]>([]);
  const [countries, setCountries] = useState<ICountryItem[]>([]);
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
    (form.phone.trim() || form.email !== "") &&
    form.profession_id !== "" &&
    form.password.length >= 8 &&
    form.password === form.password_confirmation &&
    form.gender !== "" &&
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (form.password !== form.password_confirmation) {
      setError({ status: "passwords_do_not_match" });
      setLoading(false);
      return;
    }

    if (registerType === "local" && !/^\d{9}$/.test(form.phone)) {
      setError({
        phone: "Telefon raqam 901234567 formatida, 9 ta raqam bo'lishi kerak",
      });
      setLoading(false);
      return;
    } else {
      setError({});
    }
    let mappedForm: Record<string, string | number | boolean | undefined> = {};

    if (registerType === "local") {
      mappedForm = {
        first_name: form.firstName,
        last_name: form.lastName,
        phone: form.phone,
        profession_id: form.profession_id,
        organization: form.organization,
        position: form.position,
        gender: form.gender,
        password: form.password,
        password_confirmation: form.password_confirmation,
      };
    } else if (registerType === "international") {
      mappedForm = {
        first_name: form.firstName,
        last_name: form.lastName,
        email: form.email,
        country_id: form.country,
        profession_id: form.profession_id,
        organization: form.organization,
        position: form.position,
        gender: form.gender,
        password: form.password,
      };
    }

    try {
      const res = await FetchInstance<IValidateResponce>(
        "/api/v1.0/register/validate",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(mappedForm),
        }
      );
      console.log(res);

      if (res?.success) {
        setRegisterBody(mappedForm);
        setAuthKey(res?.data?.auth_key);
        localStorage?.setItem("auth_key", res?.data?.auth_key);
        setStep("otp");
        toast.success(t("sended_sms"));
      } else {
        for (const key in res?.error?.errors) {
          if (Object.prototype.hasOwnProperty.call(res.error.errors, key)) {
            console.log(key);
            if (key === "phone") {
              setError({ status: t("phone_allready_registered") });
            }

            // const errorMessage = res.error.errors[key];
            // console.log(errorMessage);
            // setError({ status: errorMessage });
          }
        }
      }
    } catch (err) {
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
        toast.success(t("registration_successful"));
        router.push("/login");
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
        `/api/v1.0/profession/list?status=active&lang=${locale}`
      );
      setProfessions(res?.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getCountries = async () => {
    try {
      const res = await FetchInstance<IResponse<ICountryItem[]>>(
        `/api/v1.0/json/countries?lang=${locale}`
      );
      console.log(res);

      setCountries(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPrefessionList();
    getCountries();
  }, []);

  return (
    <div className="mt-10 pt-20 pb-15 flex items-center justify-center !w-full dark:bg-[radial-gradient(circle,#0085d4_0%,#031119_40%)] dark:bg-[#151a28] min-h-[65vh]">
      <div className="bg-white dark:!bg-transparent rounded-2xl p-8 max-w-9/12 w-full shadow-2xl shadow-[#10374d74] border dark:!border-gray-700 relative">
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-15 h-15 rounded-full bg-[#0085d4] flex items-center justify-center shadow-lg border-4 border-white dark:border-[#151a28]">
          <svg width="30" height="30" fill="#fff" viewBox="0 0 24 24">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm-1-13h2v6h-2zm0 8h2v2h-2z" />
          </svg>
        </div>

        {/* Register forms faqat step === "register" bo'lsa ko'rinadi */}
        {step === "register" && (
          <>
            <h2 className="!text-2xl !mt-2 font-extrabold !mb-4 !text-[#0085d4] text-center tracking-wide">
              {t("register_modal_title")}
            </h2>

            <div className="flex flex-row justify-center items-center gap-4 mb-8">
              <button
                onClick={() => setRegisterType("local")}
                className={`${
                  registerType == "local"
                    ? "bg-[#0085d4] text-white"
                    : "bg-white !text-[#0085d4]"
                } w-[200px] !rounded-3xl !border-[#0085d4] border text-[#0085d4] px-6 py-2 font-bold`}
              >
                {t("local")}
              </button>
              <button
                onClick={() => setRegisterType("international")}
                className={`${
                  registerType == "international"
                    ? "bg-[#0085d4] text-white"
                    : "bg-white !text-[#0085d4]"
                } w-[200px] !rounded-3xl !border-[#0085d4] border text-[#0085d4] px-6 py-2 font-bold`}
              >
                {t("international")}
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
                      placeholder={t("first_name")}
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
                      placeholder={t("last_name")}
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
                    <div className="flex border-2 border-[#0085d4] !rounded-lg px-3 py-2 w-full">
                      <span className="">+998</span>
                      <input
                        name="phone"
                        type="tel"
                        placeholder={t("phone")}
                        className="outline-none w-full !ml-2"
                        required
                        maxLength={9}
                        pattern="\d{9}"
                        value={form.phone}
                        onChange={(e) => {
                          let val = e.target.value
                            .replace(/\D/g, "")
                            .slice(0, 9);
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
                      className="border-2 border-[#0085d4] rounded-lg px-3 py-2 w-full !font-nunito-sans"
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
                  </div>
                  <div>
                    <input
                      name="organization"
                      type="text"
                      placeholder={t("organization")}
                      className="border-2 border-[#0085d4] rounded-lg px-3 py-2 w-full"
                      required
                      value={form.organization}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <input
                      name="position"
                      type="text"
                      placeholder={t("position")}
                      className="border-2 border-[#0085d4] rounded-lg px-3 py-2 w-full"
                      required
                      value={form.position}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <input
                      name="password"
                      type="password"
                      placeholder={t("password")}
                      className="border-2 border-[#0085d4] rounded-lg px-3 py-2 w-full"
                      required
                      value={form.password}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <input
                      name="password_confirmation"
                      type="password"
                      placeholder={t("confirm_password")}
                      className="border-2 border-[#0085d4] rounded-lg px-3 py-2 w-full"
                      required
                      value={form.password_confirmation}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    {/* <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Jins
                    </label> */}
                    <div className="flex gap-6 items-center">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="gender"
                          value="1"
                          checked={form.gender === "1"}
                          onChange={handleChange}
                          className="accent-[#0085d4]"
                          required
                        />
                        <span className="pl-2">{t("male")}</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="gender"
                          value="2"
                          checked={form.gender === "2"}
                          onChange={handleChange}
                          className="accent-[#0085d4]"
                          required
                        />
                        <span className="pl-2">{t("female")}</span>
                      </label>
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
                    <AcceptTerms />
                  </div>
                </div>
                {/* Foydalanish shartlari */}

                {/* Password inputs */}

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
                      placeholder={t("first_name")}
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
                      placeholder={t("last_name")}
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
                      placeholder={t("email")}
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
                        {t("select_country")}
                      </option>
                      {countries?.map((item) => (
                        <option value={item?.id} key={item?.id}>
                          {item?.name}
                        </option>
                      ))}
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
                        {t("participation_type")}
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
                      placeholder={t("organization")}
                      className="border-2 border-[#0085d4] rounded-lg px-3 py-2 w-full"
                      required
                      value={form.organization}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <input
                      name="position"
                      type="text"
                      placeholder={t("position")}
                      className="border-2 border-[#0085d4] rounded-lg px-3 py-2 w-full"
                      required
                      value={form.position}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <input
                      name="password"
                      type="password"
                      placeholder={t("password")}
                      className="border-2 border-[#0085d4] rounded-lg px-3 py-2 w-full"
                      required
                      value={form.password}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <input
                      name="password_confirmation"
                      type="password"
                      placeholder={t("confirm_password")}
                      className="border-2 border-[#0085d4] rounded-lg px-3 py-2 w-full"
                      required
                      value={form.password_confirmation}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    {/* <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Jins
                    </label> */}
                    <div className="flex gap-6 items-center">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="gender"
                          value="1"
                          checked={form.gender === "1"}
                          onChange={handleChange}
                          className="accent-[#0085d4]"
                          required
                        />
                        <span className="pl-2">{t("male")}</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="gender"
                          value="2"
                          checked={form.gender === "2"}
                          onChange={handleChange}
                          className="accent-[#0085d4]"
                          required
                        />
                        <span className="pl-2">{t("female")}</span>
                      </label>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <input
                      name="acceptTerms"
                      type="checkbox"
                      className="mr-2 accent-[#0085d4]"
                      checked={form.acceptTerms}
                      onChange={handleChange}
                      required
                    />
                    <AcceptTerms />
                  </div>
                </div>
                {/* Foydalanish shartlari */}

                {/* Password inputs */}

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
                  // onClick={handleSubmit}
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
          </>
        )}

        {/* OTP form faqat step === "otp" bo'lsa ko'rinadi */}
        {step === "otp" && (
          <form className="flex flex-col gap-6" onSubmit={handleOtpSubmit}>
            <div className="text-center">
              <h3 className="text-xl font-bold !text-[#0085d4]">
                {t("otp_title")}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
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
