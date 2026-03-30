"use client";

import { BASE_URL, FetchInstance } from "@/api/FetchInstance";
import { INewsListItem, IResponse } from "@/types";
import { Image as AntdImage, Spin } from "antd";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function NewsDetailPage() {
  const params = useParams();
  const news_id = params?.news_id as string;
  const locale = params?.locale as string;

  const [data, setData] = useState<INewsListItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!news_id || !locale) return;

    let cancelled = false;
    setLoading(true);

    (async () => {
      try {
        const res = await FetchInstance<IResponse<INewsListItem>>(
          `/api/v1.0/news/get/${news_id}?lang=${locale}`,
          { method: "GET" }
        );
        if (!cancelled) setData(res?.data ?? null);
      } catch {
        if (!cancelled) setData(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [news_id, locale]);

  if (loading) {
    return (
      <div className="container flex min-h-[65vh] items-center justify-center pt-20">
        <Spin size="large" />
      </div>
    );
  }

  if (!data) {
    return <div className="container section-title">Yangilik topilmadi</div>;
  }

  return (
    <div className="container pb-10 pt-20 mt-4 prose min-h-[65vh]">
      {data.image && (
        <AntdImage
          src={`${BASE_URL}/upload/news/${data?.image}_big_720.png`}
          alt={data.title}
          width={320}
          height={180}
          rootClassName="float-left w-full lg:w-1/4 mr-4"
          className="object-cover rounded-lg"
          preview={false}
        />
      )}
      <span className="!text-lg m-0 leading-6 md:!text-2xl md:leading-9 text-black dark:!text-white !font-bold pt-4 ">
        {data.title}
      </span>
      <span
        className="prose prose-lg max-w-none text-black dark:text-white"
        dangerouslySetInnerHTML={{ __html: data.description }}
      />
    </div>
  );
}
