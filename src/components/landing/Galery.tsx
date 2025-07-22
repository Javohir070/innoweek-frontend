"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Image as AntdImage } from "antd";
import galery_1 from "@/assets/img/abstract/gallery_1732534936.jpg";
import { BASE_URL, FetchInstance } from "@/api/FetchInstance";
import { IGalleryItem, IResponse } from "@/types";
import { useTranslations } from "next-intl";
import "antd/dist/reset.css";

const GalerySection = () => {
  const t = useTranslations("gallery");
  const [data, setData] = useState<IGalleryItem[]>([]);

  const getGalery = async () => {
    try {
      const res = await FetchInstance<IResponse<IGalleryItem[]>>(
        "/api/v1.0/gallery/list?limit=10&archive_id=7"
      );
      setData(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getGalery();
  }, []);

  // Ant Design Image.PreviewGroup uchun rasm url'lari
  const images = data.map((item) => item?.image ? `${BASE_URL}${item?.image}` : galery_1.src);

  return (
    <section id="lavhalar" className="portfolio section bg-transparent dark:bg-gray-900">
      <div className="container section-title" data-aos="fade-up">
        <h2 className="text-black  dark:!text-white">
          {t("INNOWEEK")}
        </h2>
        <div className="text-black  dark:!text-gray-300">
          {t("GALLERY")}
        </div>
      </div>
      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div
          className="isotope-layout"
          data-default-filter="*"
          data-layout="masonry"
          data-sort="original-order"
        >
          <AntdImage.PreviewGroup items={images}>
            <div
              className="row g-4 isotope-container"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              {data?.map((item, idx) => (
                <div
                  className="col-xl-3 col-lg-4 col-md-6 portfolio-item isotope-item filter-ui"
                  key={item?.id}
                >
                  <article className="portfolio-entry">
                    <figure className="entry-image dark:brightness-90">
                      <AntdImage
                        src={item?.image ? `${BASE_URL}${item?.image}` : galery_1.src}
                        width={305}
                        height={225}
                        alt="Lavha 1"
                        className="img-fluid rounded-lg cursor-pointer"
                        style={{ objectFit: "cover" }}
                        preview={{ visible: false }}
                        onClick={() => {
                          // AntdImage.PreviewGroup avtomatik ochiladi
                        }}
                      />
                    </figure>
                  </article>
                </div>
              ))}
            </div>
          </AntdImage.PreviewGroup>
        </div>
      </div>
    </section>
  );
};

export default GalerySection;