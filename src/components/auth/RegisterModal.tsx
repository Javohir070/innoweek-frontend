import { FetchInstance } from "@/api/FetchInstance";
import { IProfessionItem, IResponse } from "@/types";
import React, {
  useState,
  ChangeEvent,
  FormEvent,
  MouseEvent,
  useEffect,
} from "react";

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
  const [form, setForm] = useState<RegisterForm>(initialForm);
  const [error, setError] = useState<RegisterError>({});
  const [professions, setProfessions] = useState<IProfessionItem[]>([]);
  const [step, setStep] = useState<"register" | "otp">("register");
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [registerBody, setRegisterBody] = useState<any>(null);
  const [authKey, setAuthKey] = useState<string>("");

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
      country: form.country,
      organization: form.organization,
      profession_id: form?.profession_id
    };

    // Local uchun telefon, international uchun email
    if (form.type === "local") {
      mappedForm.phone = form.phone;
    }
    if (form.type === "international") {
      mappedForm.email = form.email;
      mappedForm.country =form?.country ; 
      mappedForm.organization = form?.organization
    }
    console.log(mappedForm);
    

    const res = await FetchInstance("/api/v1.0/register/validate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(mappedForm),
    });
    if (res?.success) {
      setRegisterBody(mappedForm);
      setAuthKey(res?.data?.auth_key); 
      setStep("otp");
    }
    // else: xatoliklarni ko‘rsating
  };

  const handleOtpSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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

    const res = await FetchInstance("/api/v1.0/register/complete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(completeBody),
    });

    console.log(res);
    

    // natijani tekshiring va foydalanuvchini keyingi bosqichga yo‘naltiring
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
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-[#151a28] rounded-lg p-8 w-full max-w-md relative"
        onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-xl text-white"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4 text-white">
          {"Ro'yxatdan o'tish"}
        </h2>
        {step === "register" ? (
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {/* Toggle buttons */}
            <div className="flex gap-2 justify-center mb-2">
              <button
                type="button"
                className={`px-6 py-2 rounded border ${
                  form.type === "local"
                    ? "bg-[#e3a127] text-white border-[#e3a127]"
                    : "bg-transparent text-white border-white"
                }`}
                onClick={() => handleType("local")}
              >
                Local
              </button>
              <button
                type="button"
                className={`px-6 py-2 rounded border ${
                  form.type === "international"
                    ? "bg-[#e3a127] text-white border-[#e3a127]"
                    : "bg-transparent text-white border-white"
                }`}
                onClick={() => handleType("international")}
              >
                International
              </button>
            </div>

            {form.type === "local" ? (
              <>
                {/* LOCAL form fields */}
                {/* First Name */}
                <input
                  name="firstName"
                  type="text"
                  placeholder="First Name *"
                  className="border rounded px-3 py-2 bg-transparent text-white"
                  required
                  value={form.firstName}
                  onChange={handleChange}
                />
                {/* Last Name */}
                <input
                  name="lastName"
                  type="text"
                  placeholder="Last Name *"
                  className="border rounded px-3 py-2 bg-transparent text-white"
                  required
                  value={form.lastName}
                  onChange={handleChange}
                />
                {/* Phone Number */}
                <input
                  name="phone"
                  type="tel"
                  placeholder="Phone Number (901234567)"
                  maxLength={9}
                  className={`border rounded px-3 py-2 bg-transparent text-white ${
                    error.phone ? "border-red-500" : ""
                  }`}
                  required
                  value={form.phone}
                  onChange={handleChange}
                />
                {error.phone && (
                  <span className="text-red-500 text-xs">{error.phone}</span>
                )}
                {/* Participation type */}
                <select
                  name="profession_id"
                  className="border rounded px-3 py-2 bg-transparent text-white"
                  required
                  value={form.profession_id}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Participation type *
                  </option>
                  {professions?.map((item) => (
                    <option value="attendee" key={item?.id}>
                      {item?.name}
                    </option>
                  ))}
                </select>
                {/* Date of Birth */}
                <input
                  name="birth_date"
                  type="date"
                  placeholder="Date of Birth *"
                  className="border rounded px-3 py-2 bg-transparent text-white"
                  required
                  value={form.birth_date}
                  onChange={handleChange}
                />
                {/* Gender */}
                <div className="flex items-center gap-4">
                  <span className="text-white">Gender:</span>
                  <label className="flex items-center gap-1 text-white">
                    <input
                      type="radio"
                      name="gender"
                      value="1"
                      checked={form.gender === "1"}
                      onChange={handleChange}
                      required
                    />
                    Male
                  </label>
                  <label className="flex items-center gap-1 text-white">
                    <input
                      type="radio"
                      name="gender"
                      value="2"
                      checked={form.gender === "2"}
                      onChange={handleChange}
                      required
                    />
                    Female
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
                  placeholder="First Name *"
                  className="border rounded px-3 py-2 bg-transparent text-white"
                  required
                  value={form.firstName}
                  onChange={handleChange}
                />
                {/* Last Name */}
                <input
                  name="lastName"
                  type="text"
                  placeholder="Last Name *"
                  className="border rounded px-3 py-2 bg-transparent text-white"
                  required
                  value={form.lastName}
                  onChange={handleChange}
                />
                {/* Email */}
                <input
                  name="email"
                  type="email"
                  placeholder="Email *"
                  className="border rounded px-3 py-2 bg-transparent text-white"
                  required
                  value={form.email || ""}
                  onChange={handleChange}
                />
                {/* Country */}
                <select
                  name="country"
                  className="border rounded px-3 py-2 bg-transparent text-white"
                  required
                  value={form.country || ""}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Country *
                  </option>
                  <option value="Uzbekistan">Uzbekistan</option>
                  <option value="Kazakhstan">Kazakhstan</option>
                  <option value="USA">USA</option>
                  {/* Boshqa davlatlar qo'shishingiz mumkin */}
                </select>
                {/* Participation type */}
                <select
                  name="participation"
                  className="border rounded px-3 py-2 bg-transparent text-white"
                  required
                  value={form.participation}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Participation type *
                  </option>
                  <option value="attendee">Attendee</option>
                  <option value="speaker">Speaker</option>
                  <option value="volunteer">Volunteer</option>
                </select>
                {/* Organization */}
                <input
                  name="organization"
                  type="text"
                  placeholder="Organization *"
                  className="border rounded px-3 py-2 bg-transparent text-white"
                  required
                  value={form.organization || ""}
                  onChange={handleChange}
                />
                {/* Date of Birth */}
                <input
                  name="dob"
                  type="date"
                  placeholder="Date of Birth *"
                  className="border rounded px-3 py-2 bg-transparent text-white"
                  required
                  value={form.dob}
                  onChange={handleChange}
                />
                {/* Gender */}
                <div className="flex items-center gap-4">
                  <span className="text-white">Gender:</span>
                  <label className="flex items-center gap-1 text-white">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={form.gender === "male"}
                      onChange={handleChange}
                      required
                    />
                    Male
                  </label>
                  <label className="flex items-center gap-1 text-white">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={form.gender === "female"}
                      onChange={handleChange}
                      required
                    />
                    Female
                  </label>
                </div>
              </>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="bg-[#e3a127] text-white rounded p-2 mt-2"
            >
              Sign Up
            </button>
          </form>
        ) : (
          <form className="flex flex-col gap-4" onSubmit={handleOtpSubmit}>
            <label className="text-white text-center text-lg mb-2">
              Telefon raqamingizga yuborilgan 6 xonali kodni kiriting
            </label>
            <input
              type="text"
              maxLength={6}
              pattern="\d{6}"
              value={otp}
              onChange={e => setOtp(e.target.value.replace(/\D/g, ""))}
              className="border rounded px-3 py-2 bg-transparent text-white text-center text-xl tracking-widest"
              placeholder="______"
              required
            />
            {otpError && <span className="text-red-500 text-xs">{otpError}</span>}
            <button type="submit" className="bg-[#e3a127] text-white rounded p-2 mt-2">
              Tasdiqlash
            </button>
          </form>
        )}
        <div className="text-center mt-4 text-white text-sm">
          Are you registered?{" "}
          <a href="#" className="text-gray-400 underline">
            Check Your Ticket
          </a>
        </div>
      </div>
    </div>
  );
}
