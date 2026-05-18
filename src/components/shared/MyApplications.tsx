import { FetchInstance } from "@/api/FetchInstance";
import { assetUrl } from "@/lib/assetUrl";
import section from "@/assets/img/section_bg_2.jpg";
import { IApplication, IResponse } from "@/types";
import { useTranslations } from "@/i18n/useTranslations";
import { useRouter } from "@/lib/navigation";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const MyApplications = () => {
  const t = useTranslations("my_applications");
  const router = useRouter();
  const params = useParams();
  const [applications, setApplications] = useState<IApplication[]>([]);
  const [loading, setLoading] = useState(true);

  const getApplications = async () => {
    try {
      setLoading(true);
      const res: IResponse<IApplication[]> = await FetchInstance("/api/eco-ideathon");
      setApplications(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getApplications();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('uz-UZ', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    });
  };

  return (
    <div
      className="min-h-32 p-4 lg:p-6 rounded-2xl !shadow-lg overflow-hidden border border-gray-200 dark:!border-gray-700 shadow-gray-300 dark:shadow-blue-500 h-full"
      style={{
        backgroundImage: `url(${assetUrl(section)})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4">
        <h2 className="text-xl font-bold mb-4 text-black">{t("title")}</h2>
        
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-gray-600">{t("loading")}</span>
          </div>
        ) : applications.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">{t("no_applications")}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {applications.map((application) => (
              <div
                key={application.id}
                className="bg-white rounded-lg border border-gray-200 p-3 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-black">
                      {application.project_name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {application.full_name} • {application.age} {t("years_old")}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      application.status
                    )}`}
                  >
                    {application.status === 'pending' && t("status.pending")}
                    {application.status === 'approved' && t("status.approved")}
                    {application.status === 'rejected' && t("status.rejected")}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                  <div>
                    <p className="text-sm text-gray-500">{t("phone")}</p>
                    <p className="text-sm font-medium m-0">{application.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{t("email")}</p>
                    <p className="text-sm font-medium m-0">{application.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{t("region")}</p>
                    <p className="text-sm font-medium m-0">{application.region.name_uz}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{t("submitted_date")}</p>
                    <p className="text-sm font-medium m-0">{formatDate(application.created_at)}</p>
                  </div>
                </div>

                <div className="mb-3">
                  <p className="text-sm text-gray-500 mb-1">{t("project_brief")}</p>
                  <p className="text-sm text-gray-700 overflow-hidden" style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical'
                  }}>
                    {application.project_brief}
                  </p>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <button 
                      onClick={() => router.push(`/${params.locale}/eco-ediethon/${application.id}`)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      {t("view_details")}
                    </button>
                    {/* {application.presentation && (
                      <a
                        href={`${BASE_URL}${application.presentation}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 hover:text-green-800 text-sm font-medium"
                      >
                        Taqdimotni yuklab olish
                      </a>
                    )} */}
                  </div>
                  <p className="text-xs text-gray-400">{t("application_id")} {application.id}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyApplications;
