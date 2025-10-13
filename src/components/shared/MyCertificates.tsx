"use client";

import { BASE_URL, FetchInstance } from "@/api/FetchInstance";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import section from "@/assets/img/section_bg_2.jpg";
import { useParams } from "next/navigation";
import { notification } from "antd";

interface Certificate {
  id: number;
  file_path: string;
  created_at: string;
  schedule_id: number;
  schedule: {
    id: number;
    title: string;
    date: string;
  };
}

interface CertificateResponse {
  status: number;
  success: boolean;
  data: Certificate[];
}

interface MainCertificateResponse {
  status: number;
  success: boolean;
  message: string;
  data: Certificate;
}

const MyCertificates = () => {
  const t = useTranslations("profile");
  const params = useParams();

  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [mainCertificate, setMainCertificate] = useState<Certificate | null>(
    null
  );
  const [mainCertificateLoading, setMainCertificateLoading] =
    useState<boolean>(true);

  const [loading, setLoading] = useState<boolean>(true);

  const getMyCertificatesList = async () => {
    setLoading(true);

    try {
      const res = await FetchInstance<CertificateResponse>(
        `/api/certificate/check/user?lang=${params?.locale}`
      );
      if (res?.success && res?.data) {
        setCertificates([...certificates, ...res?.data]);
      } else {
        setCertificates([]);
        // setError(t("certificates_not_found"));
      }
    } catch (error) {
      console.error("Error fetching certificates:", error);
      setCertificates([]);
      // setError(t("error_loading_certificates"));
    } finally {
      setLoading(false);
    }
  };

  const getMainCertificate = async () => {
    try {
      setMainCertificateLoading(true);
      const res = await FetchInstance<MainCertificateResponse>(
        "/api/certificate/main/user"
      );
      if (res?.success) {
        // Check if file_path is full URL or relative path
        const filePath = res.data.file_path.startsWith("http")
          ? res.data.file_path
          : `${BASE_URL}${res.data.file_path}`;

        setMainCertificate({
          id: res.data.id,
          file_path: filePath,
          created_at: "2025-10-11",
          schedule_id: 1,
          schedule: {
            title: "Innoweek 2025 sertifikat",
            date: "2025-10-11",
            id: 1,
          },
        });
      } else {
        notification.error({
          message: t("error_loading_main_certificate"),
          description: t("please_try_again_later"),
        });
      }
    } catch (error) {
      console.log(error);
      notification.error({
        message: t("error_loading_main_certificate"),
        description: t("please_try_again_later"),
      });
    } finally {
      setMainCertificateLoading(false);
    }
  };

  const handleDownloadCertificate = (
    filePath: string,
    certificateId: number
  ) => {
    // Check if file_path is full URL or relative path
    const downloadUrl = filePath.startsWith("http")
      ? filePath
      : `${BASE_URL}${filePath}`;

    // Yangi oyna ochib yuklab olish
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = `certificate_${certificateId}.pdf`;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("uz-UZ", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
  };

  useEffect(() => {
    getMainCertificate();
    getMyCertificatesList();
  }, []);

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
        backgroundImage: `url(${section.src})`,
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
      {mainCertificateLoading ? (
        <div className="flex justify-center items-center p-8">
          <div className="w-8 h-8 border-4 border-[#0085d4] border-t-transparent rounded-full animate-spin"></div>
          <span className="ml-3 text-gray-600">
            {t("loading_certificates")}
          </span>
        </div>
      ) : (
        <div>
          {!!mainCertificate ? (
            <div
              key={mainCertificate.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden mb-4"
            >
              <div className="flex items-center p-6">
                {/* Left side - Certificate Preview */}
                <div className="flex-shrink-0 mr-8">
                  <div className="w-64 h-40 bg-gray-300 rounded-lg flex items-center justify-center">
                    <object
                      data={
                        mainCertificate.file_path.startsWith("http")
                          ? mainCertificate.file_path
                          : `${BASE_URL}${mainCertificate.file_path}`
                      }
                      type="application/pdf"
                      className="w-full h-full"
                    >
                      <p className="text-center text-gray-600">
                        {t("pdf_support_required")}
                      </p>
                    </object>
                  </div>
                </div>

                {/* Right side - Information */}
                <div className="flex-1 text-black">
                  <div className="mb-3">
                    <div className="text-sm opacity-80 mb-1">
                      {t("event_name")}:
                    </div>
                    <div className="text-2xl font-bold">
                      {mainCertificate.schedule?.title}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <div className="text-sm opacity-80 mb-1">
                        {t("event_date")}:
                      </div>
                      <div className="text-lg font-semibold">
                        {mainCertificate.schedule?.date
                          ? formatDate(mainCertificate.schedule.date)
                          : t("not_available")}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm opacity-80 mb-1">
                        {t("issue_date")}:
                      </div>
                      <div className="text-lg font-semibold">
                        {formatDate(mainCertificate.created_at)}
                      </div>
                    </div>
                  </div>

                  <div className="mt-2">
                    <button
                      onClick={() =>
                        handleDownloadCertificate(
                          mainCertificate.file_path,
                          mainCertificate.id
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
          ) : (
            <div className="text-center p-8 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="text-6xl mb-4">📜</div>
              <h3 className="text-xl font-semibold text-black dark:text-white mb-2">
                {t("main_certificates_not_found")}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t("no_certificates_available")}
              </p>
            </div>
          )}
        </div>
      )}

      <div>
        {certificates.length === 0 ? (
          <div className="text-center p-8 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="text-6xl mb-4">📜</div>
            <h3 className="text-xl font-semibold text-black dark:text-white mb-2">
              {t("certificates_not_found")}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {t("no_certificates_available")}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {certificates.map((certificate) => (
              <div
                key={certificate.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className="flex items-center p-6">
                  {/* Left side - Certificate Preview */}
                  <div className="flex-shrink-0 mr-8">
                    <div className="w-64 h-40 bg-gray-300 rounded-lg flex items-center justify-center">
                      <object
                        data={
                          certificate.file_path.startsWith("http")
                            ? certificate.file_path
                            : `${BASE_URL}${certificate.file_path}`
                        }
                        type="application/pdf"
                        className="w-full h-full"
                      >
                        <p className="text-center text-gray-600">
                          {t("pdf_support_required")}
                        </p>
                      </object>
                    </div>
                  </div>

                  {/* Right side - Information */}
                  <div className="flex-1 text-black">
                    <div className="mb-3">
                      <div className="text-sm opacity-80 mb-1">
                        {t("event_name")}:
                      </div>
                      <div className="text-2xl font-bold">
                        {certificate.schedule?.title}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                      <div>
                        <div className="text-sm opacity-80 mb-1">
                          {t("event_date")}:
                        </div>
                        <div className="text-lg font-semibold">
                          {certificate.schedule?.date
                            ? formatDate(certificate.schedule.date)
                            : t("not_available")}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm opacity-80 mb-1">
                          {t("issue_date")}:
                        </div>
                        <div className="text-lg font-semibold">
                          {formatDate(certificate.created_at)}
                        </div>
                      </div>
                    </div>

                    <div className="mt-2">
                      <button
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCertificates;
