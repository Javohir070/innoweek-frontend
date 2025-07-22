"use client";

import { BASE_URL, FetchInstance } from "@/api/FetchInstance";
import { IGalleryItem, IResponse } from "@/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Image as AntdImage } from "antd";
import "antd/dist/reset.css";

const Gallery = () => {
  const t = useTranslations("gallery_page");
  const [data, setData] = useState<IGalleryItem[]>([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0); // umumiy elementlar soni

  const getGalery = async () => {
    try {
      const res = await FetchInstance<IResponse<IGalleryItem[]>>(
        `/api/v1.0/gallery/list?limit=${limit}&page=${page}&archive_id=7`
      );
      setData(res?.data);
      setTotal(res?.pagination?.total || 0);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getGalery();
  }, [limit, page]);

  // Ant Design Image.PreviewGroup uchun rasm url'lari
  const images = data.map((item) => (item?.image ? `${BASE_URL}${item?.image}` : ""));

  return (
    <section id="lavhalar" className="portfolio section bg-transparent mt-10">
      <div className="container section-title">
        <h2 className="text-black dark:!text-white">{t("INNOWEEK")}</h2>
        <div className="text-black dark:!text-white">{t("PHOTO_GALLERY")}</div>
      </div>
      <div className="container">
        <div className="isotope-layout">
          <AntdImage.PreviewGroup items={images}>
            <div className="row g-4 isotope-container">
              {data?.map((item, idx) => (
                <div
                  className="col-xl-3 col-lg-4 col-md-6 portfolio-item isotope-item filter-ui"
                  key={item?.id}
                >
                  <article className="portfolio-entry">
                    <figure className="entry-image">
                      <AntdImage
                        src={item?.image ? `${BASE_URL}${item?.image}` : ""}
                        width={305}
                        height={225}
                        alt="Lavha 1"
                        className="img-fluid rounded-lg cursor-pointer"
                        style={{ objectFit: "cover" }}
                        preview={{ visible: false }}
                      />
                    </figure>
                  </article>
                </div>
              ))}
            </div>
          </AntdImage.PreviewGroup>
        </div>

        <div className="flex items-center justify-end mb-4 gap-2">
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1 rounded !bg-black/10 dark:!bg-black/70 disabled:opacity-50"
            >
              {t("prev")}
            </button>
            <span className="px-2 !mt-1">{page}</span>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={page * limit >= total}
              className="px-3 py-1 rounded  !bg-black/10 dark:!bg-black/70 disabled:opacity-50"
            >
              {t("next")}
            </button>
          </div>
          <div>
            <select
              value={limit}
              onChange={(e) => {
                setLimit(Number(e.target.value));
                setPage(1);
              }}
              className="border rounded px-2 py-1"
            >
              {[5, 10, 20, 50, 100].map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <span className="ml-2 text-sm text-gray-500">{t("per_page")}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
