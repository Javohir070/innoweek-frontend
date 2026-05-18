import { useTranslations } from "@/i18n/useTranslations";

export default function LoadingPage() {
  const t = useTranslations("common");

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0085d4]"></div>
      <span className="ml-3 text-lg text-gray-600">{t("loading")}</span>
    </div>
  );
}
