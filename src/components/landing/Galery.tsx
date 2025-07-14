"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import galery_1 from "@/assets/img/abstract/gallery_1732534936.jpg";
import { BASE_URL, FetchInstance } from "@/api/FetchInstance";
import { IGalleryItem, IResponse } from "@/types";

const GalerySection = () => {
  const [data, setData] = useState<IGalleryItem[]>([]);

  const getGalery = async () => {
    try {
      const res = await FetchInstance<IResponse<IGalleryItem[]>>(
        "/api/v1.0/gallery/list?limit=10&archive_id=7"
      );
      console.log(res);
      setData(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getGalery();
  }, []);

  return (
    <section id="lavhalar" className="portfolio section bg-transparent">
      <div className="container section-title" data-aos="fade-up">
        <h2 data-uz="INNOWEEK" data-ru="INNOWEEK" data-en="INNOWEEK">
          {"INNOWEEK"}
        </h2>
        <div data-uz="GALEREYA" data-ru="ГАЛЕРЕЯ" data-en="GALLERY">
          {"GALEREYA"}
        </div>
      </div>
      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div
          className="isotope-layout"
          data-default-filter="*"
          data-layout="masonry"
          data-sort="original-order"
        >
          <div
            className="row g-4 isotope-container"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            {data?.map((item) => (
              <div
                className="col-xl-3 col-lg-4 col-md-6 portfolio-item isotope-item filter-ui"
                key={item?.id}
              >
                <article className="portfolio-entry">
                  <figure className="entry-image">
                    <Image
                      src={item?.image ? `${BASE_URL}${item?.image}` : galery_1}
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
      </div>
    </section>
  );
};

export default GalerySection;
