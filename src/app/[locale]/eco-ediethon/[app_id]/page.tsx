"use client";
import { BASE_URL, FetchInstance } from "@/api/FetchInstance";
import { IApplication, IResponse } from "@/types";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const ApplicationDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const t = useTranslations("application_detail");
  const [application, setApplication] = useState<IApplication | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getApplicationDetail = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res: IResponse<IApplication> = await FetchInstance(`/api/eco-ideathon/${params.app_id}`);
      setApplication(res.data);
    } catch (error) {
      console.log(error);
      setError(t("error_loading"));
    } finally {
      setLoading(false);
    }
  }, [params.app_id, t]);

  useEffect(() => {
    if (params.app_id) {
      getApplicationDetail();
    }
  }, [params.app_id, getApplicationDetail]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('uz-UZ', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
   
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">{t("loading")}</p>
        </div>
      </div>
    );
  }

  if (error || !application) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || t("not_found")}</p>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {t("back")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 mt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-2">
        
          <div className="flex items-center flex-col sm:flex-row sm:items-center sm:justify-between">
             <button
            onClick={() => router.back()}
            className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {t("back")}
          </button>
            <span
              className={`inline-flex px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(
                application.status
              )}`}
            >
              {application.status === 'pending' && t("status.pending")}
              {application.status === 'approved' && t("status.approved")}
              {application.status === 'rejected' && t("status.rejected")}
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Project Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-8 text-white">
            <h2 className="text-2xl font-bold mb-2">{application.project_name}</h2>
            <div className="flex flex-wrap gap-4 text-blue-100">
              <div className="flex items-center">
                <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {application.full_name}
              </div>
              <div className="flex items-center">
                <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 7h6m-6 4h6m4-11v11a2 2 0 01-2 2H6a2 2 0 01-2-2V7h16z" />
                </svg>
                {application.age} {t("years_old")}
              </div>
              <div className="flex items-center">
                <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {application.region.name_uz}
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="px-6 py-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-black mb-4">{t("contact_info")}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <svg className="h-5 w-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <p className="text-sm text-gray-500 m-0">{t("phone_number")}</p>
                  <p className="font-medium m-0">{application.phone}</p>
                </div>
              </div>
              <div className="flex items-center">
                <svg className="h-5 w-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <p className="text-sm text-gray-500 m-0">{t("email_address")}</p>
                  <p className="font-medium m-0">{application.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Project Details */}
          <div className="px-6 py-6 space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-black mb-3">{t("project_brief")}</h3>
              <p className="text-gray-700 leading-relaxed">{application.project_brief}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-black mb-3">{t("project_goal")}</h3>
              <p className="text-gray-700 leading-relaxed">{application.project_goal}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-black mb-3">{t("project_problem")}</h3>
              <p className="text-gray-700 leading-relaxed">{application.project_problem}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-black mb-3">{t("implementation_plan")}</h3>
              <p className="text-gray-700 leading-relaxed">{application.implementation_plan}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-black mb-3">{t("team_info")}</h3>
              <p className="text-gray-700 leading-relaxed">{application.team_info}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-black mb-3">{t("why_chosen")}</h3>
              <p className="text-gray-700 leading-relaxed">{application.why_chosen}</p>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm text-gray-500">
                <p className="m-0">{t("application_number")} {application.id}</p>
                <p className="m-0">{t("submitted_date")} {formatDate(application.created_at)}</p>
                {application.updated_at !== application.created_at && (
                  <p className="m-0">{t("last_update")} {formatDate(application.updated_at)}</p>
                )}
              </div>
              {application.presentation && (
                <div className="mt-4 sm:mt-0 m-0">
                  <a
                    href={`${BASE_URL}/storage/${application.presentation}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    {t("download_presentation")}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetailPage;