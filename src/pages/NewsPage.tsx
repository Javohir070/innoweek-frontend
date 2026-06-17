import { BASE_URL } from "@/api/axios";
import NewsCard from "@/components/ui/NewsCard";
import { useTranslations } from "@/i18n/useTranslations";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Pagination, Spin } from "antd";
import { useNewsList } from "@/hooks/queries/useNews";

export default function NewsPage() {
  const t = useTranslations("news");
  const params = useParams();
  const locale = (params?.locale as string) || "uz";
  const [limit, setLimit] = useState(12);
  const [page, setPage] = useState(1);

  const { data: response, isLoading } = useNewsList(locale, page, limit);
  const data = response?.data ?? [];
  const total = response?.pagination?.total ?? 0;

  return (
    <section
      id="portfolio"
      className="testimonials section-light-background bg-transparent min-h-[85vh]"
    >
      <div className="container section-title mt-5 pb-4">
        <h2 className="text-black dark:!text-white">INNOWEEK</h2>
        <div className="text-black dark:!text-white">{t("Latest News")}</div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Spin size="large" />
        </div>
      ) : (
        <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {data.map((item) => (
            <NewsCard
              createdAt={item?.created_at}
              description={item?.description}
              id={item?.id}
              image={`${BASE_URL}/upload/news/${item?.image}_big_720.png`}
              title={item?.title}
              key={item?.id}
            />
          ))}
        </div>
      )}

      <div className="flex items-center justify-end mt-6 container">
        <Pagination
          current={page}
          pageSize={limit}
          total={total}
          showSizeChanger
          pageSizeOptions={[12, 24, 48, 100]}
          onChange={(p, l) => {
            setPage(p);
            setLimit(l);
          }}
        />
      </div>
    </section>
  );
}
