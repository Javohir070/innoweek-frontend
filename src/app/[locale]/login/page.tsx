"use client";
import { Link, useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { FetchInstance } from "@/api/FetchInstance";
import { toast } from "react-toastify";
import { useState } from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

const initialForm = {
  phone_or_email: "",
  password: "",
};

const Login = () => {
  const t = useTranslations("login");
  const router = useRouter();

  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError({});

    try {
      const res = await FetchInstance("/api/v1.0/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (res?.success) {
        localStorage.setItem("token", res.data.access_token);
        toast.success(t("login_success"));
        router.push("/profile");
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

  return (
    <div className="mt-10 pt-20 pb-15 flex items-center justify-center !w-1/2 mx-auto dark:bg-[radial-gradient(circle,#0085d4_0%,#031119_40%)] dark:bg-[#151a28] min-h-[85vh]">
      <div className="bg-white dark:!bg-transparent rounded-2xl p-8 max-w-9/12 w-full shadow-2xl shadow-[#10374d74] border dark:!border-gray-700 relative ">
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-15 h-15 rounded-full bg-[#0085d4] flex items-center justify-center shadow-lg border-4 border-white dark:border-[#151a28]">
          <svg width="30" height="30" fill="#fff" viewBox="0 0 24 24">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm-1-13h2v6h-2zm0 8h2v2h-2z" />
          </svg>
        </div>
        <h2 className="!text-2xl !mt-2 font-extrabold !mb-4 !text-[#0085d4] text-center tracking-wide">
          {t("login_title")} {/* Changed to login_title */}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
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
          </div>
          <div className="relative">
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
                {t("logging_in")}
              </>
            ) : (
              t("login_title")
            )}
          </button>
        </form>

        <p className="text-center mt-4">
          {t("no_account")} {/* Do you have an account? */}
          <Link href="/register" className="text-[#0085d4] ml-1">
            {t("register")} {/* Register */}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
