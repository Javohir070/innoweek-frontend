// Strict form validation: all required fields must be filled and valid
import { useEffect, useState } from "react";
import { useTranslations } from "@/i18n/useTranslations";
import { Input, Select, Radio, Checkbox, Form } from "antd";
import {
  IProfessionItem,
  IResponse,
  IValidateResponce,
  IComplateResponce,
  ICountryItem,
} from "@/types";
import { FetchInstance } from "@/api/FetchInstance";
import { toast } from "react-toastify";
import { useRouter } from "@/lib/navigation";
import AcceptTerms from "@/components/ui/AcceptTerms";
import { useParams } from "react-router-dom";
import RecaptchaProvider from "@/components/auth/RecaptchaProvider";
import { useRecaptcha } from "@/hooks/useRecaptcha";
import { isRecaptchaEnabled } from "@/lib/recaptcha";

type RegisterError = {
  phone?: string;
  status?: string;
  email?: string;
};

interface FormValues {
  firstName: string;
  lastName: string;
  phone?: string;
  email?: string;
  country?: string;
  profession_id: string;
  organization?: string;
  position?: string;
  password: string;
  password_confirmation: string;
  gender: string;
  acceptTerms: boolean;
}

function RegisterRolePageInner({
  getRecaptchaToken,
  showRecaptchaHint = false,
  recaptchaReady = true,
}: {
  getRecaptchaToken?: () => Promise<string | null>;
  showRecaptchaHint?: boolean;
  recaptchaReady?: boolean;
}) {
  const t = useTranslations("register_modal");
  const router = useRouter();
  const [form] = Form.useForm<FormValues>();

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
  const [registerType, setRegisterType] = useState<"local" | "international">(
    "local"
  );
  const params = useParams();

  const handleSubmit = async (values: FormValues) => {
    setLoading(true);
    if (getRecaptchaToken) {
      const token = await getRecaptchaToken();
      if (!token) {
        setError({
          status:
            "Captcha tekshiruvi muvaffaqiyatsiz. Google Console: v3 site key, domenlar (localhost, innoweek.uz). Sahifani yangilang.",
        });
        return;
      }
    }
    setError({});

    let mappedForm: Record<string, string | number | boolean | undefined> = {};

    if (registerType === "local") {
      mappedForm = {
        first_name: values.firstName,
        last_name: values.lastName,
        phone: values.phone,
        profession_id: values.profession_id,
        organization: values.organization,
        position: values.position,
        gender: values.gender,
        password: values.password,
        password_confirmation: values.password_confirmation,
      };
    } else if (registerType === "international") {
      mappedForm = {
        first_name: values.firstName,
        last_name: values.lastName,
        email: values.email,
        country_id: values.country,
        profession_id: values.profession_id,
        organization: values.organization,
        position: values.position,
        gender: values.gender,
        password: values.password,
        password_confirmation: values.password_confirmation,
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
      if (res?.success) {
        setRegisterBody(mappedForm);
        setAuthKey(res?.data?.auth_key);
        localStorage?.setItem("auth_key", res?.data?.auth_key);
        setStep("otp");
        toast.success(t("sended_sms"));
      } else {
        // Xatolik yuz berdi - error yoki message ni tekshiramiz
        const errorMessage =
          (res as any)?.error?.message || "Xatolik yuz berdi";
        if ((res as any)?.error?.errors) {
          for (const key in (res as any).error.errors) {
            if (
              Object.prototype.hasOwnProperty.call(
                (res as any).error.errors,
                key
              )
            ) {
              console.log(key);
              if (key === "phone") {
                setError({ status: t("phone_allready_registered") });
              }
              if (key === "email") {
                setError({ status: t("email_allready_registered") });
              }
            }
          }
        } else {
          setError({ status: errorMessage });
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
        localStorage?.setItem("token", (res as any)?.data?.token);
        localStorage?.setItem("userRole", (res as any)?.data?.role);
        toast.success(t("register_success"));
        router.push("/login");
      } else {
        setOtpError((res as any)?.error?.message || "");
      }
    } catch (_error) {
      setOtpError("Xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getProfessions = async () => {
      try {
        const res = await FetchInstance<IResponse<IProfessionItem[]>>(
          "/api/v1.0/profession/list?lang=" + params?.locale
        );
        if (res?.success) {
          setProfessions(res.data.reverse());
        }
      } catch (err) {
        console.log("Profession fetch error:", err);
      }
    };

    const getCountries = async () => {
      try {
        const res = await FetchInstance<IResponse<ICountryItem[]>>(
          `/api/v1.0/json/countries?lang=${params?.locale}`
        );
        if (res?.success) {
          setCountries(res.data);
        }
      } catch (err) {
        console.log("Country fetch error:", err);
      }
    };

    getProfessions();
    getCountries();
  }, []);

  return (
    <div className="mt-10 pt-20 pb-15 flex items-center justify-center !w-full dark:bg-[radial-gradient(circle,#0085d4_0%,#031119_40%)] dark:bg-[#151a28] min-h-[65vh]">
      <div className="bg-white dark:!bg-transparent rounded-2xl p-8 max-w-10/12 w-full shadow-2xl shadow-[#10374d74] border dark:!border-gray-700 relative">
        {step === "register" && (
          <>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold !text-[#0085d4]">
                {t("register_modal_title")}
              </h2>
             
            </div>

            {/* Registration type toggle */}
            <div className="flex justify-center mb-8 gap-4">
              <button
                className={`px-6 py-1 rounded-l-lg !border-2 transition-all !rounded-2xl ${
                  registerType === "local"
                    ? "bg-[#0085d4] text-white border-[#0085d4]"
                    : "bg-white text-[#0085d4] border-[#0085d4] hover:bg-[#0085d4"
                }`}
                onClick={() => {
                  setRegisterType("local");
                  form.resetFields();
                }}
              >
                {t("local")}
              </button>
              <button
                className={`px-6 py-1 rounded-r-lg border-2 border-l-0 transition-all !rounded-2xl ${
                  registerType === "international"
                    ? "bg-[#0085d4] text-white border-[#0085d4]"
                    : "bg-white text-[#0085d4] border-[#0085d4] hover:bg-[#0085d4] "
                }`}
                onClick={() => {
                  setRegisterType("international");
                  form.resetFields();
                }}
              >
                {t("international")}
              </button>
            </div>

            {showRecaptchaHint && (
              <p className="text-center text-[11px] text-gray-500 dark:text-gray-400 mb-6 leading-relaxed px-2">
                Google reCAPTCHA v3: checkbox yo‘q; himoya «Ro‘yxatdan o‘tish»
                bosilganda ishlaydi.
              </p>
            )}

            {/* Local registration form */}
            {registerType === "local" && (
              <Form
                form={form}
                className="flex flex-col"
                onFinish={handleSubmit}
                layout="vertical"
                size="large"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                  <Form.Item
                    name="firstName"
                    rules={[
                      { required: true, message: "Ism kiritish majburiy!" },
                    ]}
                  >
                    <Input
                      type="text"
                      placeholder={t("first_name")}
                      className="border-2 border-[#0085d4] rounded-lg"
                    />
                  </Form.Item>
                  <Form.Item
                    name="lastName"
                    rules={[
                      {
                        required: true,
                        message: "Familiya kiritish majburiy!",
                      },
                    ]}
                  >
                    <Input
                      type="text"
                      placeholder={t("last_name")}
                      className="border-2 border-[#0085d4] rounded-lg"
                    />
                  </Form.Item>
                  <Form.Item
                    name="phone"
                    rules={[
                      {
                        required: true,
                        message: "Telefon raqam kiritish majburiy!",
                      },
                      {
                        pattern: /^\d{9}$/,
                        message:
                          "Telefon raqam 9 ta raqamdan iborat bo'lishi kerak!",
                      },
                    ]}
                  >
                    {/* <span className="">+998</span> */}
                    <Input
                      type="tel"
                      placeholder={t("phone")}
                      // className="outline-none w-full !ml-2 !border-none !shadow-none"
                      maxLength={9}
                      onChange={(e) => {
                        const val = e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 9);
                        form.setFieldValue("phone", val);
                      }}
                      prefix={<span className="text-gray-500">+998</span>}
                    />
                  </Form.Item>
                  <Form.Item
                    name="profession_id"
                    rules={[
                      {
                        required: true,
                        message: "Ishtirok turi tanlash majburiy!",
                      },
                    ]}
                  >
                    <Select
                      placeholder={t("participation_type")}
                      className="w-full border-2 border-[#0085d4] rounded-lg"
                      options={professions?.map((item) => ({
                        value: item.id,
                        label: item.name,
                      }))}
                    />
                  </Form.Item>
                  <Form.Item name="organization">
                    <Input
                      type="text"
                      placeholder={t("organization")}
                      className="border-2 border-[#0085d4] rounded-lg"
                    />
                  </Form.Item>
                  <Form.Item name="position">
                    <Input
                      type="text"
                      placeholder={t("position")}
                      className="border-2 border-[#0085d4] rounded-lg"
                    />
                  </Form.Item>
                    <Form.Item
                    name="password"
                    rules={[
                      { required: true, message: "Parol kiritish majburiy!" },
                      {
                      min: 4,
                      message: "Parol kamida 4 ta belgidan iborat bo'lishi kerak!",
                      },
                    ]}
                    >
                    <Input.Password
                      placeholder={t("password")}
                      className="border-2 border-[#0085d4] rounded-lg"
                    />
                    </Form.Item>
                  <Form.Item
                    name="password_confirmation"
                    dependencies={["password"]}
                    rules={[
                      {
                        required: true,
                        message: "Parolni tasdiqlash majburiy!",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error("Parollar mos kelmadi!")
                          );
                        },
                      }),
                    ]}
                  >
                    <Input.Password
                      placeholder={t("confirm_password")}
                      className="border-2 border-[#0085d4] rounded-lg"
                    />
                  </Form.Item>
                  <Form.Item
                    name="gender"
                    rules={[
                      { required: true, message: "Jinsni tanlash majburiy!" },
                    ]}
                  >
                    <Radio.Group className="flex gap-6 items-center">
                      <Radio value="1" className="accent-[#0085d4]">
                        <span className="pl-2">{t("male")}</span>
                      </Radio>
                      <Radio value="2" className="accent-[#0085d4]">
                        <span className="pl-2">{t("female")}</span>
                      </Radio>
                    </Radio.Group>
                  </Form.Item>
                  <Form.Item
                    name="acceptTerms"
                    valuePropName="checked"
                    rules={[
                      {
                        required: true,
                        message: "Shartlarni qabul qilish majburiy!",
                      },
                    ]}
                  >
                    <Checkbox className="mr-2 accent-[#0085d4]">
                      <AcceptTerms />
                    </Checkbox>
                  </Form.Item>
                </div>

                {error.status && (
                  <span className="text-red-500 text-xs">{error.status}</span>
                )}

                <Form.Item>
                  <button
                    type="submit"
                    disabled={loading || (showRecaptchaHint && !recaptchaReady)}
                    className={`w-[200px] font-bold !rounded-full p-2 flex items-center justify-center gap-2 shadow-lg transition-all duration-200 text-lg tracking-wide mx-auto ${
                      loading
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
                </Form.Item>
              </Form>
            )}
            {/* International registration form */}
            {registerType === "international" && (
              <Form
                form={form}
                className="flex flex-col"
                onFinish={handleSubmit}
                layout="vertical"
                size="large"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                  <Form.Item
                    name="firstName"
                    rules={[
                      { required: true, message: "Ism kiritish majburiy!" },
                    ]}
                  >
                    <Input
                      type="text"
                      placeholder={t("first_name")}
                      className="border-2 border-[#0085d4] rounded-lg"
                    />
                  </Form.Item>
                  <Form.Item
                    name="lastName"
                    rules={[
                      {
                        required: true,
                        message: "Familiya kiritish majburiy!",
                      },
                    ]}
                  >
                    <Input
                      type="text"
                      placeholder={t("last_name")}
                      className="border-2 border-[#0085d4] rounded-lg"
                    />
                  </Form.Item>
                  <Form.Item
                    name="email"
                    rules={[
                      { required: true, message: "Email kiritish majburiy!" },
                      {
                        type: "email",
                        message: "To'g'ri email formatini kiriting!",
                      },
                    ]}
                  >
                    <Input
                      type="email"
                      placeholder={t("email")}
                      className="border-2 border-[#0085d4] rounded-lg"
                    />
                  </Form.Item>
                  <Form.Item
                    name="country"
                    rules={[
                      { required: true, message: "Davlatni tanlash majburiy!" },
                    ]}
                  >
                    <Select
                      placeholder={t("country")}
                      className="w-full border-2 border-[#0085d4] rounded-lg"
                      options={countries?.map((item) => ({
                        value: item.id,
                        label: item.name,
                      }))}
                    />
                  </Form.Item>
                  <Form.Item
                    name="profession_id"
                    rules={[
                      {
                        required: true,
                        message: "Ishtirok turi tanlash majburiy!",
                      },
                    ]}
                  >
                    <Select
                      placeholder={t("participation_type")}
                      className="w-full border-2 border-[#0085d4] rounded-lg"
                      options={professions?.reverse()?.map((item) => ({
                        value: item.id,
                        label: item.name,
                      }))}
                    />
                  </Form.Item>
                  <Form.Item name="organization">
                    <Input
                      type="text"
                      placeholder={t("organization")}
                      className="border-2 border-[#0085d4] rounded-lg"
                    />
                  </Form.Item>
                  <Form.Item name="position">
                    <Input
                      type="text"
                      placeholder={t("position")}
                      className="border-2 border-[#0085d4] rounded-lg"
                    />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    rules={[
                      { required: true, message: "Parol kiritish majburiy!" },
                      {
                        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
                        message:
                          "Parol kamida 6 ta belgi, 1 ta katta harf, 1 ta kichik harfdan iborat bo'lishi kerak!",
                      },
                    ]}
                  >
                    <Input.Password
                      placeholder={t("password")}
                      className="border-2 border-[#0085d4] rounded-lg"
                    />
                  </Form.Item>
                  <Form.Item
                    name="password_confirmation"
                    dependencies={["password"]}
                    rules={[
                      {
                        required: true,
                        message: "Parolni tasdiqlash majburiy!",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error("Parollar mos kelmadi!")
                          );
                        },
                      }),
                    ]}
                  >
                    <Input.Password
                      placeholder={t("confirm_password")}
                      className="border-2 border-[#0085d4] rounded-lg"
                    />
                  </Form.Item>
                  <Form.Item
                    name="gender"
                    rules={[
                      { required: true, message: "Jinsni tanlash majburiy!" },
                    ]}
                  >
                    <Radio.Group className="flex gap-6 items-center">
                      <Radio value="1" className="accent-[#0085d4]">
                        <span className="pl-2">{t("male")}</span>
                      </Radio>
                      <Radio value="2" className="accent-[#0085d4]">
                        <span className="pl-2">{t("female")}</span>
                      </Radio>
                    </Radio.Group>
                  </Form.Item>
                  <Form.Item
                    name="acceptTerms"
                    valuePropName="checked"
                    rules={[
                      {
                        required: true,
                        message: "Shartlarni qabul qilish majburiy!",
                      },
                    ]}
                  >
                    <Checkbox className="mr-2 accent-[#0085d4]">
                      <AcceptTerms />
                    </Checkbox>
                  </Form.Item>
                </div>

                {error.status && (
                  <span className="text-red-500 text-xs">{error.status}</span>
                )}

                <Form.Item>
                  <button
                    type="submit"
                    disabled={loading || (showRecaptchaHint && !recaptchaReady)}
                    className={`w-[200px] font-bold !rounded-full p-2 flex items-center justify-center gap-2 shadow-lg transition-all duration-200 text-lg tracking-wide mx-auto ${
                      loading
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
                </Form.Item>
              </Form>
            )}
          </>
        )}

        {/* OTP form faqat step === "otp" bo'lsa ko'rinadi */}
        {step === "otp" && (
          <form className="flex flex-col gap-6" onSubmit={handleOtpSubmit}>
            <div className="text-center">
              <h3 className="text-xl font-bold !text-[#0085d4]">
                {registerType === "international"
                  ? t("otp_title_email")
                  : t("otp_title")}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {registerType === "international"
                  ? t("otp_description_email")
                  : t("otp_description")}
              </p>
            </div>

            <div className="flex justify-center">
              <Input
                type="text"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                className="border-2 border-[#0085d4] rounded-lg w-48 text-center text-xl tracking-widest bg-white text-gray-900 dark:!bg-transparent dark:text-white focus:border-[#e3a127] focus:ring-[#e3a127] focus:outline-none focus:ring-0"
                placeholder="______"
                required
              />
            </div>

            {otpError && (
              <div className="text-center text-red-500 text-sm">{otpError}</div>
            )}

            <button
              type="submit"
              disabled={loading || (showRecaptchaHint && !recaptchaReady)}
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

function RegisterWithRecaptcha() {
  const { getToken, ready } = useRecaptcha("register");
  return (
    <RegisterRolePageInner
      showRecaptchaHint
      recaptchaReady={ready}
      getRecaptchaToken={getToken}
    />
  );
}

export default function RegisterRolePage() {
  if (!isRecaptchaEnabled()) {
    return <RegisterRolePageInner />;
  }
  return (
    <RecaptchaProvider>
      <RegisterWithRecaptcha />
    </RecaptchaProvider>
  );
}
