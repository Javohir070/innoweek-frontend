import axios from "axios";

const ixtiroOrigin =
  import.meta.env.VITE_IXTIRO_API_URL ||
  (import.meta.env.DEV ? "/api-ixtiro" : "https://api-ixtiro.ilmiy.uz");

const tijoratOrigin =
  import.meta.env.VITE_TIJORAT_API_URL ||
  (import.meta.env.DEV ? "/api-tijorat" : "https://back-tijorat.ilmiy.uz");

/** CORS yo‘q — brauzerda faqat same-origin proxy orqali (Vite/nginx) */
const internshipOrigin =
  (import.meta.env.VITE_INTERNSHIP_API_URL || "").trim() || "/api-internship";

export const ixtiroApi = axios.create({
  baseURL: ixtiroOrigin,
  headers: { "Content-Type": "application/json" },
});

export const tijoratApi = axios.create({
  baseURL: tijoratOrigin,
  headers: { "Content-Type": "application/json" },
});

export const internshipApi = axios.create({
  baseURL: internshipOrigin,
  headers: { "Content-Type": "application/json" },
});

export const IXTIRO_SITE_URL =
  import.meta.env.VITE_IXTIRO_SITE_URL || "https://ixtiro.ilmiy.uz";

export const TIJORAT_SITE_URL =
  import.meta.env.VITE_TIJORAT_SITE_URL || "https://tijorat.ilmiy.uz";

export const INTERNSHIP_SITE_URL =
  import.meta.env.VITE_INTERNSHIP_SITE_URL || "https://internship.ilmiy.uz";

export const INTERNSHIP_MEDIA_URL =
  import.meta.env.VITE_INTERNSHIP_MEDIA_URL ||
  "https://api-internship.ilmiy.uz";
