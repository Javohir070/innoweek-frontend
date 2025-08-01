"use client"
import { FetchInstance } from "@/api/FetchInstance";
import { useRouter, useParams } from "next/navigation";
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
import { useTranslations } from "next-intl";

import img1 from "@/assets/img/ITweek1.jpg";
import img2 from "@/assets/img/service-2.jpg";
import img3 from "@/assets/img/register3.png";
import img4 from "@/assets/img/IMG9513copy4.png";
import img5 from "@/assets/img/4e8be5ce-6ad3-ccab-0647-ec30f3558874listsslider5.webp";
import img6 from "@/assets/img/service-6.jpg";


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

export default function RegisterModal2({ open, onClose }: RegisterModalProps) {
  const t = useTranslations("register_modal");
  const router = useRouter();
  const params = useParams();
  const locale = typeof params.locale === "string" ? params.locale : Array.isArray(params.locale) ? params.locale[0] : "uz";
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
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

  const roles = [
    "participant",
    "speaker",
    "guest",
    "investor",
    "media",
    "student"
  ];

  const roleImages = [img1, img2, img3, img4, img5, img6];

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
    if (form.type === "local") {
      mappedForm.phone = form.phone;
    }
    if (form.type === "international") {
      mappedForm.email = form.email;
      mappedForm.country = form?.country;
      mappedForm.organization = form?.organization;
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
    if (open && selectedRole) {
      getPrefessionList();
    }
  }, [open, selectedRole]);

  if (!open) return null;
  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-[#348fc370] rounded-lg p-8 w-full max-w-6/12 relative shadow-lg dark:shadow-gray-900 border !border-blue-300/30 dark:!border-gray-700"
        onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-xl text-gray-700 dark:text-white hover:text-red-500 dark:hover:text-red-400 transition-colors"
        >
          &times;
        </button>
        <h2 className="text-2xl font-extrabold mb-8 !text-white text-center tracking-wide">
          {t("register_modal_title")}
        </h2>
        <div className="grid grid-cols-2 gap-6 mb-4">
          {roles.map((role, idx) => (
            <div
              key={role}
              className="cursor-pointer rounded-2xl border-2 border-[#0085d4] bg-gradient-to-br from-[#005b90] to-[#579ac1] p-2 flex flex-row justify-between items-center shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-200 hover:border-[#e3a127] group"
              onClick={() => {
                onClose();
                router.push(`/${locale}/register/${role}`);
              }}
            >
              <span className="!text-2xl font-semibold text-left text-white group-hover:text-[#e3a127]">
                {t(role)}
              </span>
              <img
                src={roleImages[idx].src}
                alt={t(role)}
                className="w-24 h-20 object-cover mr-4 rounded-lg border border-[#0085d4] bg-white shadow"
              />
            </div>

          ))}
        </div>
      </div>
    </div>
  );
}
