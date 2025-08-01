"use client";
import React, { useEffect, useState } from "react";
import { Image as AntdImage } from "antd";
import galery_1 from "@/assets/img/abstract/gallery_1732534936.jpg";
import { BASE_URL, FetchInstance } from "@/api/FetchInstance";
import { IGalleryItem, IResponse } from "@/types";
import { useTranslations } from "next-intl";
import { ArrowsAltOutlined } from "@ant-design/icons";
import "antd/dist/reset.css";

const GalerySection = () => {
  const t = useTranslations("gallery");
  const [data, setData] = useState<IGalleryItem[]>([]);

  const getGalery = async () => {
    try {
      const res = await FetchInstance<IResponse<IGalleryItem[]>>(
        "/api/v1.0/gallery/list?limit=8&archive_id=8"
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
  const images = data.map((item) =>
    item?.image ? `${BASE_URL}${item?.image}` : galery_1.src
  );

  return (
    <section
      id="lavhalar"
      className="portfolio section bg-transparent dark:bg-gray-900"
    >
      <div className="container section-title" data-aos="fade-up">
        <h2 className="text-black  dark:!text-white">{t("INNOWEEK")}</h2>
        <div className="text-black  dark:!text-gray-300">{t("GALLERY")}</div>
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
              {data?.map((item) => (
                <div
                  className="col-xl-3 col-lg-4 col-md-6 portfolio-item isotope-item filter-ui relative"
                  key={item?.id}
                >
                  <article className="portfolio-entry">
                    <figure className="entry-image dark:brightness-90 relative">
                      <AntdImage
                        src={
                          item?.image
                            ? `${BASE_URL}${item?.image}`
                            : galery_1.src
                        }
                        width={"100%"}
                        height={"100%"}
                        alt="Lavha 1"
                        className="img-fluid rounded-lg cursor-pointer relative"
                        style={{ objectFit: "cover" }}
                        preview={{
                          src: item?.image
                            ? `${BASE_URL}${item?.image}`
                            : galery_1.src,
                          mask: (
                            <div
                              className="absolute left-[16px] bottom-[16px] bg-[#0085d4] hover:bg-gray-900 bg-opacity-80 rounded-md p-2 flex items-center gap-2 shadow"
                              style={{ zIndex: 2 }}
                            >
                              <ArrowsAltOutlined style={{ fontSize: 22 }} />
                            </div>
                          ),
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
