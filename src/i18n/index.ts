import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import uz from "../../messages/uz.json";
import en from "../../messages/en.json";
import ru from "../../messages/ru.json";

export const locales = ["uz", "en", "ru"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "uz";

const namespaces = Object.keys(uz);

i18n.use(initReactI18next).init({
  resources: {
    uz: uz as Record<string, object>,
    en: en as Record<string, object>,
    ru: ru as Record<string, object>,
  },
  lng: defaultLocale,
  fallbackLng: defaultLocale,
  supportedLngs: [...locales],
  ns: namespaces,
  defaultNS: "common",
  interpolation: {
    escapeValue: false,
  },
});

export function setAppLocale(locale: Locale) {
  void i18n.changeLanguage(locale);
}

export default i18n;
