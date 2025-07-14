"use client";
import React, { useEffect, useState } from "react";
import userAvatar from "@/assets/img/person/person-m-7.webp";
import Image from "next/image";
import { BASE_URL, FetchInstance } from "@/api/FetchInstance";
import { IResponse, ISpeakerItem } from "@/types";

const SpeakersSection = () => {
  const [data, setData] = useState<ISpeakerItem[]>([]);

  const getSpeakers = async () => {
    try {
      const res = await FetchInstance<IResponse<ISpeakerItem[]>>(
        `/api/v1.0/speakers/all?limit=10&archive_id=7`
      );
      console.log(res?.data);
      setData(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSpeakers();
  }, []);

  return (
    <section id="team" className="team section light-background bg-transparent">
      <div className="container section-title" data-aos="fade-up">
        <h2 data-uz="INNOWEEK" data-ru="INNOWEEK" data-en="INNOWEEK">
          INNOWEEK
        </h2>
        <div data-uz="SPIKERLAR" data-ru="СПИКЕРЫ" data-en="SPEAKERS">
          {"SPIKERLAR"}
        </div>
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row gy-4">
          {data?.map((item) => (
            <div
              className="col-lg-6"
              data-aos="fade-up"
              data-aos-delay="100"
              key={item?.full_name}
            >
              <div className="team-member  d-flex">
                <div className="member-img">
                  <Image
                    src={item?.image ? `${BASE_URL}${item?.image}` : userAvatar}
                    className="img-fluid"
                    alt={item?.full_name}
                    loading="lazy"
                    width={200}
                    height={200}
                  />
                </div>
                <div className="member-info flex-grow-1">
                  <h4>{item?.full_name}</h4>
                  <span>{item?.position}</span>
                  {/* <p>{item?.position}</p> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpeakersSection;
