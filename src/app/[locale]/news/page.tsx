"use client";
import { BASE_URL, FetchInstance } from "@/api/FetchInstance";
import NewsCard from "@/components/ui/NewsCard";
import { INewsListItem, IResponse } from "@/types";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Pagination } from "antd";

const NewsList = () => {
  const t = useTranslations("news");
  const params = useParams();
  const [data, setData] = useState<INewsListItem[]>([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const getNews = async () => {
    try {
      const res = await FetchInstance<IResponse<INewsListItem[]>>(
        `/api/v1.0/news/all?limit=${limit}&page=${page}&lang=${params?.locale}&archive_id=8`
      );
      setData(res?.data);
      setTotal(res?.pagination?.total || 0);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getNews();
  }, [limit, page]);

  return (
    <section
      id="portfolio"
      className="testimonials section-light-background bg-transparent min-h-[85vh]"
    >
      <div className="container section-title mt-5 pb-4">
        <h2 className="text-black dark:!text-white">INNOWEEK</h2>
        <div className="text-black dark:!text-white">{t("Latest News")}</div>
      </div>

      <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 gap-4">
        {data?.map((item) => (
          <NewsCard
            createdAt={item?.created_at}
            description={item?.description}
            id={item?.id}
            image={`http://testinno.innoweek.uz/upload/news/${item?.image}_big_720.png`}
            title={item?.title}
            key={item?.id}
          />
        ))}
      </div>
      <div className="flex items-center justify-end mt-6">
        <Pagination
          current={page}
          pageSize={limit}
          total={total}
          showSizeChanger
          pageSizeOptions={[5, 10, 20, 50, 100]}
          onChange={(p, l) => {
            setPage(p);
            setLimit(l);
          }}
        />
      </div>
    </section>
  );
};

export default NewsList;
