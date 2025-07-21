"use client";
import { BASE_URL, FetchInstance } from "@/api/FetchInstance";
import NewsCard from "@/components/ui/NewsCard";
import { INewsListItem, IResponse } from "@/types";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const NewsList = () => {
  const t = useTranslations("news");
  const params = useParams();
  const [data, setData] = useState<INewsListItem[]>([]);

  const getNews = async () => {
    try {
      const res = await FetchInstance<IResponse<INewsListItem[]>>(
        `/api/v1.0/news/all?limit=10&lang=${params?.locale}`
      );
      console.log(res?.data);
      setData(res?.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getNews();
  }, []);

  return (
    <section
      id="portfolio"
      className="testimonials section-light-background bg-transparent min-h-[85vh]"
    >
      <div className="container section-title mt-5 pb-4">
        <h2 className="text-black dark:!text-white">INNOWEEK</h2>
        <div className="text-black dark:!text-white">{t("Latest News")}</div>
      </div>

      <div className="container grid grid-cols-3 gap-4">
        {data?.map((item) => (
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
    </section>
  );
};

export default NewsList;
