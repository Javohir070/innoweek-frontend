import { BASE_URL, FetchInstance } from "@/api/FetchInstance";
import { IGalleryItem, IResponse } from "@/types";
import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "@/i18n/useTranslations";
import { Image as AntdImage, Pagination } from "antd";
import galery_1 from "@/assets/img/abstract/gallery_1732534936.jpg";
import { ArrowsAltOutlined } from "@ant-design/icons";
import { assetUrl } from "@/lib/assetUrl";
import "antd/dist/reset.css";

const fallbackImage = assetUrl(galery_1);

const Gallery = () => {
  const t = useTranslations("gallery_page");
  const [data, setData] = useState<IGalleryItem[]>([]);
  const [limit, setLimit] = useState(12);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const getGalery = async () => {
    try {
      const res = await FetchInstance<IResponse<IGalleryItem[]>>(
        `/api/v1.0/gallery/list?limit=${limit}&page=${page}&archive_id=9`
      );
      setData(Array.isArray(res?.data) ? res.data : []);
      setTotal(res?.pagination?.total || 0);
    } catch (error) {
      console.log(error);
      setData([]);
    }
  };

  useEffect(() => {
    getGalery();
  }, [limit, page]);

  const images = useMemo(
    () =>
      data
        .map((item) =>
          item?.image ? `${BASE_URL}${item.image}` : fallbackImage
        )
        .filter((src): src is string => Boolean(src)),
    [data]
  );

  return (
    <section id="lavhalar" className="portfolio section bg-transparent mt-10 ">
      <div className="container section-title">
        <h2 className="text-black dark:!text-white">{t("INNOWEEK")}</h2>
        <div className="text-black dark:!text-white">{t("PHOTO_GALLERY")}</div>
      </div>
      <div className="container">
        <div className="isotope-layout min-h-[50vh]">
          <AntdImage.PreviewGroup items={images.length ? images : undefined}>
            <div className="row g-4 isotope-container">
              {data.map((item) => {
                const src = item?.image
                  ? `${BASE_URL}${item.image}`
                  : fallbackImage;
                return (
                  <div
                    className="col-xl-3 col-lg-4 col-md-6 portfolio-item isotope-item filter-ui"
                    key={item?.id}
                  >
                    <article className="portfolio-entry">
                      <figure className="entry-image">
                        <AntdImage
                          src={src}
                          width={"100%"}
                          height={"100%"}
                          alt="Lavha 1"
                          className="img-fluid rounded-lg cursor-pointer"
                          style={{ objectFit: "cover" }}
                          preview={{
                            src,
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
                );
              })}
            </div>
          </AntdImage.PreviewGroup>
        </div>

        <div className="flex items-center justify-end mb-4 gap-2">
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
            className="!mt-4"
          />
        </div>
      </div>
    </section>
  );
};

export default Gallery;
