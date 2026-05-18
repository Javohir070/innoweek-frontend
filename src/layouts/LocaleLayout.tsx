import { Outlet, useParams, Navigate } from "react-router-dom";
import { useEffect } from "react";
import Layout from "@/components/Layout/Layout";
import { locales, setAppLocale, type Locale } from "@/i18n";
import LoadingPage from "@/components/ui/LoadingPage";
import { Suspense } from "react";

export default function LocaleLayout() {
  const { locale } = useParams<{ locale: string }>();

  useEffect(() => {
    if (locale && locales.includes(locale as Locale)) {
      setAppLocale(locale as Locale);
      document.documentElement.lang = locale;
    }
  }, [locale]);

  if (!locale || !locales.includes(locale as Locale)) {
    return <Navigate to="/uz" replace />;
  }

  return (
    <Layout>
      <Suspense fallback={<LoadingPage />}>
        <Outlet />
      </Suspense>
    </Layout>
  );
}
