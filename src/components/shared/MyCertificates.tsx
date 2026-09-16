import { assetUrl } from "@/lib/assetUrl";
import { useTranslations } from "@/i18n/useTranslations";
import section from "@/assets/img/section_bg_2.jpg";
import { useParams } from "react-router-dom";
import {
  ARCHIVE_2025,
  ARCHIVE_2026,
  useCertificates,
  type Certificate,
} from "@/hooks/queries/useCertificates";

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("uz-UZ", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
}

function handleDownloadCertificate(filePath: string, certificateId: number) {
  const link = document.createElement("a");
  link.href = filePath;
  link.download = `certificate_${certificateId}.pdf`;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function CertificateCard({
  certificate,
  t,
}: {
  certificate: Certificate;
  t: (key: string) => string;
}) {
  const fileUrl = certificate.file_path;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center p-6 gap-6">
        <div className="flex-shrink-0">
          <div className="w-full md:w-64 h-40 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
            <embed
              src={fileUrl}
              type="application/pdf"
              className="w-full h-full"
            />
          </div>
        </div>

        <div className="flex-1 text-black">
          <div className="mb-3">
            <div className="text-sm opacity-80 mb-1">{t("event_name")}:</div>
            <div className="text-xl md:text-2xl font-bold">
              {certificate.schedule?.title || t("main_certificate_title")}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <div className="text-sm opacity-80 mb-1">{t("event_date")}:</div>
              <div className="text-lg font-semibold">
                {certificate.schedule?.date
                  ? formatDate(certificate.schedule.date)
                  : formatDate(certificate.created_at)}
              </div>
            </div>
            <div>
              <div className="text-sm opacity-80 mb-1">{t("issue_date")}:</div>
              <div className="text-lg font-semibold">
                {formatDate(certificate.created_at)}
              </div>
            </div>
          </div>

          <div className="mt-2">
            <button
              type="button"
              onClick={() =>
                handleDownloadCertificate(
                  certificate.file_path,
                  certificate.id
                )
              }
              className="bg-[#0085d4] text-white px-6 py-2 font-semibold !rounded-lg transition-colors flex items-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                />
              </svg>
              {t("download")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function EmptyCertificates({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="text-center p-8 bg-gray-50 dark:bg-gray-800 rounded-lg">
      <div className="text-6xl mb-4">📜</div>
      <h3 className="text-xl font-semibold text-black dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300">{text}</p>
    </div>
  );
}

function CertificateSection({
  title,
  certificates,
  emptyTitle,
  emptyText,
  t,
}: {
  title: string;
  certificates: Certificate[];
  emptyTitle: string;
  emptyText: string;
  t: (key: string) => string;
}) {
  return (
    <div className="mb-4">
      <h3 className="text-xl font-bold text-black dark:text-white mb-4">
        {title}
      </h3>
      {certificates.length === 0 ? (
        <EmptyCertificates title={emptyTitle} text={emptyText} />
      ) : (
        <div className="space-y-6">
          {certificates.map((certificate) => (
            <CertificateCard
              key={certificate.id}
              certificate={certificate}
              t={t}
            />
          ))}
        </div>
      )}
    </div>
  );
}

const MyCertificates = () => {
  const t = useTranslations("profile");
  const { locale } = useParams<{ locale: string }>();
  const lang = locale || "uz";

  const certificates2026 = useCertificates(lang, ARCHIVE_2026);
  const certificates2025 = useCertificates(lang, ARCHIVE_2025);

  const loading = certificates2026.isLoading || certificates2025.isLoading;

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="w-8 h-8 border-4 border-[#0085d4] border-t-transparent rounded-full animate-spin"></div>
        <span className="ml-3 text-gray-600">{t("loading_certificates")}</span>
      </div>
    );
  }

  return (
    <div
      className="min-h-32 p-4 lg:p-6 rounded-2xl !shadow-lg overflow-hidden border border-gray-200 dark:!border-gray-700 shadow-gray-300 dark:shadow-blue-500 h-full"
      style={{
        backgroundImage: `url(${assetUrl(section)})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-black dark:text-white">
          {t("My_ertificate")}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 m-0 my-2">
          {t("all_your_certificates")}
        </p>
      </div>

      <CertificateSection
        title={t("certificates_year_2026")}
        certificates={certificates2026.data ?? []}
        emptyTitle={t("certificates_not_found")}
        emptyText={t("no_certificates_available")}
        t={t}
      />

      <CertificateSection
        title={t("certificates_year_2025")}
        certificates={certificates2025.data ?? []}
        emptyTitle={t("certificates_not_found")}
        emptyText={t("no_certificates_available")}
        t={t}
      />
    </div>
  );
};

export default MyCertificates;
