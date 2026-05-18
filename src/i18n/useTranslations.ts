import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import type { Locale } from "./index";

export type AppTFunction = ReturnType<typeof useTranslation>["t"] & {
  /** next-intl `t.raw(key)` — nested object/array from messages JSON */
  raw: (key: string) => unknown;
};

/** next-intl `useTranslations(ns)` bilan mos hook */
export function useTranslations(namespace?: string): AppTFunction {
  const { t, i18n } = useTranslation(namespace);

  return useMemo(() => {
    const wrapped = ((key: string, options?: Record<string, unknown>) =>
      t(key, options)) as AppTFunction;

    Object.assign(wrapped, t);

    wrapped.raw = (key: string) => {
      const lng = i18n.language;
      const ns =
        namespace ??
        (Array.isArray(i18n.options.defaultNS)
          ? i18n.options.defaultNS[0]
          : i18n.options.defaultNS) ??
        "common";
      return i18n.getResource(lng, ns as string, key);
    };

    return wrapped;
  }, [t, i18n, namespace]);
}

export function useLocale(): Locale {
  const { locale } = useParams<{ locale: string }>();
  if (locale === "uz" || locale === "en" || locale === "ru") {
    return locale;
  }
  return "uz";
}
