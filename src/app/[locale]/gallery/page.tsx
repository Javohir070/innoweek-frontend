"use client";

import { BASE_URL, FetchInstance } from "@/api/FetchInstance";
import { IGalleryItem, IResponse } from "@/types";
import Image from "next/image";
import { useEffect, useState } from "react";

const Gallery = () => {
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
      setTotal(res?.pagination?.total || 0)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getGalery();
  }, [limit, page]);
  return (
    <section id="lavhalar" className="portfolio section bg-transparent mt-10">
      <div className="container section-title">
        <h2 data-uz="INNOWEEK" data-ru="INNOWEEK" data-en="INNOWEEK">
          {"INNOWEEK"}
        </h2>
        <div data-uz="GALEREYA" data-ru="ГАЛЕРЕЯ" data-en="GALLERY">
          {"FOTO LAVHALAR"}
        </div>
      </div>
      <div className="container">
        <div
          className="isotope-layout"
          //   data-default-filter="*"
          //   data-layout="masonry"
          //   data-sort="original-order"
        >
          <div
            className="row g-4 isotope-container"
            // data-aos="fade-up"
            // data-aos-delay="300"
          >
            {data?.map((item) => (
              <div
                className="col-xl-3 col-lg-4 col-md-6 portfolio-item isotope-item filter-ui"
                key={item?.id}
              >
                <article className="portfolio-entry">
                  <figure className="entry-image">
                    <Image
                      src={item?.image ? `${BASE_URL}${item?.image}` : ""}
                      className="img-fluid"
                      alt="Lavha 1"
                      loading="lazy"
                      width={200}
                      height={150}
                    />
                    <div className="entry-overlay">
                      <div className="overlay-content">
                        <div className="entry-links">
                          <a
                            href="assets/img/abstract/gallery_1732534936.jpg"
                            className="glightbox"
                            data-gallery="portfolio-gallery-ui"
                            data-glightbox="title: Lavha; description: Haftalik lavha tasviri."
                          >
                            <i className="bi bi-arrows-angle-expand"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </figure>
                </article>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-end mb-4 gap-2">
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1 rounded bg-black/70 disabled:opacity-50"
            >
              Prev
            </button>
            <span className="px-2">{page}</span>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={page * limit >= total}
              className="px-3 py-1 rounded bg-black/70 disabled:opacity-50"
            >
              Next
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
              {[5, 10, 20, 50 , 100].map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <span className="ml-2 text-sm text-gray-500">sahifada</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
