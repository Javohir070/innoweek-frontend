"use client";
import { FetchInstance } from "@/api/FetchInstance";
import { Link, useRouter } from "@/i18n/navigation";
import { IComplateResponce } from "@/types";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

const initialForm = {
  phone_or_email: "",
  password: "",
  password_confirmation: "",
};

const ForgetPassword = () => {
  const t = useTranslations("forgetPassword");
  const router = useRouter();
  const locale = useParams().locale || "uz";

  const [form, setForm] = useState(initialForm);
  const [authKey, setAuthKey] = useState("");
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordConfirmationVisible, setPasswordConfirmationVisible] =
    useState(false);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  // Determine if user is using phone or email for reset
  const isEmail = form.phone_or_email.includes("@") && form.phone_or_email.includes(".");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const togglePasswordConfirmationVisibility = () => {
    setPasswordConfirmationVisible(!passwordConfirmationVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError({});

    try {
      const res = await FetchInstance("/api/v1.0/user/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      console.log(res?.data?.auth_key);
      console.log(authKey);

      if (res?.data?.auth_key) {
        setAuthKey(res.data.auth_key);
        toast.success(t("success"));
      } else {
        setError({ status: t("login_failed") });
      }
    } catch (err) {
      console.error(err);
      setError({ status: t("login_error") });
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
      ...form,
      auth_key: authKey,
      access_code: otp,
    };

    try {
      const res = await FetchInstance<IComplateResponce>(
        "/api/v1.0/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(completeBody),
        }
      );

      if (res?.success) {
        toast.success(t("successful"));
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

  return (
    <div className="mt-10 pt-20 pb-15 flex items-center justify-center w-[95%] sm:!w-9/12 md:!w-6/12 lg:!w-5/12 xl:!w-4/12 mx-auto dark:bg-[radial-gradient(circle,#0085d4_0%,#031119_40%)] dark:bg-[#151a28] min-h-[65vh]">
      <div className="bg-white dark:!bg-transparent rounded-2xl p-8 max-w-11/12 w-full shadow-2xl shadow-[#10374d74] border dark:!border-gray-700 relative ">
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-15 h-15 rounded-full bg-[#0085d4] flex items-center justify-center shadow-lg border-4 border-white dark:border-[#151a28]">
          <svg width="30" height="30" fill="#fff" viewBox="0 0 24 24">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm-1-13h2v6h-2zm0 8h2v2h-2z" />
          </svg>
        </div>
        <h2 className="!text-2xl !mt-2 font-extrabold !mb-4 !text-[#0085d4] text-center tracking-wide">
          {t("title")} {/* Changed to login_title */}
        </h2>

        {!!authKey ? (
          <form className="flex flex-col gap-3" onSubmit={handleOtpSubmit}>
            <div className="w-full">
              <label htmlFor="otp" className="!text-gray-700">
                {isEmail ? t("otp_label_email") : t("otp_label")}
              </label>
              <input
                type="text"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                className="w-full border-2 border-[#0085d4] rounded-lg px-3 py-2 text-center text-xl tracking-widest bg-white text-gray-900 dark:!bg-transparent dark:text-white focus:border-[#e3a127] focus:ring-[#e3a127] focus:outline-none focus:ring-0"
                placeholder="______"
                required
              />
            </div>
            <div className="relative">
              {/* <label htmlFor="password" className="!text-gray-700">
                {t("password")}
              </label> */}
              <input
                type={passwordVisible ? "text" : "password"}
                name="password"
                placeholder={t("password")}
                className="border-2 border-[#0085d4] rounded-lg px-3 py-2 w-full"
                value={form.password}
                onChange={handleChange}
                required
              />
              <span
                className="absolute right-3 top-2/4 transform -translate-y-1/2 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {!passwordVisible ? (
                  <EyeTwoTone twoToneColor="#0085d4" />
                ) : (
                  <EyeInvisibleOutlined />
                )}
              </span>
            </div>
            <div className="relative">
              {/* <label htmlFor="password" className="!text-gray-700">
                {t("password_confirmation")}
              </label> */}
              <input
                type={passwordConfirmationVisible ? "text" : "password"}
                name="password_confirmation"
                placeholder={t("password_confirmation")}
                className="border-2 border-[#0085d4] rounded-lg px-3 py-2 w-full"
                value={form.password_confirmation}
                onChange={handleChange}
                required
              />
              <span
                className="absolute right-3 top-2/4 transform -translate-y-1/2 cursor-pointer"
                onClick={togglePasswordConfirmationVisibility}
              >
                {!passwordConfirmationVisible ? (
                  <EyeTwoTone twoToneColor="#0085d4" />
                ) : (
                  <EyeInvisibleOutlined />
                )}
              </span>
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
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div>
              
              <input
                type="text"
                name="phone_or_email"
                placeholder={t("phone_or_email")}
                className="border-2 border-[#0085d4] rounded-lg px-3 py-2 w-full"
                value={form.phone_or_email}
                onChange={handleChange}
                required
              />
              <label htmlFor="phone_or_email" className="!text-gray-400 m-1 text-sm">
                {t("phone_format")}
              </label>
            </div>

            {error.status && (
              <span className="text-red-500 text-xs">{error.status}</span>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full font-bold !rounded-full p-2 flex items-center justify-center gap-2 shadow-lg transition-all duration-200 text-lg tracking-wide mx-auto ${
                loading
                  ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                  : "bg-[#0085d4] hover:bg-[#e3a127] text-white"
              }`}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  {t("loading")}
                </>
              ) : (
                t("send")
              )}
            </button>
          </form>
        )}

        <p className="text-center mt-4">
          {t("profile")} :
          <Link href="/login" className="text-[#0085d4] ml-1">
            {t("login")}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgetPassword;

{
  /* <div className="relative">
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              placeholder={t("password")}
              className="border-2 border-[#0085d4] rounded-lg px-3 py-2 w-full"
              value={form.password}
              onChange={handleChange}
              required
            />
            <span
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {!passwordVisible ? (
                <EyeTwoTone twoToneColor="#0085d4" />
              ) : (
                <EyeInvisibleOutlined />
              )}
            </span>
          </div> */
}
