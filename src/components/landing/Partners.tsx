"use client";

import { useTranslations } from "next-intl";
import partnerImage1 from "@/assets/img/clients/clients-1.webp";
import partnerImage2 from "@/assets/img/clients/clients-2.webp";
import partnerImage3 from "@/assets/img/clients/clients-3.webp";
import partnerImage4 from "@/assets/img/clients/clients-4.webp";
import partnerImage5 from "@/assets/img/clients/clients-5.webp";
import partnerImage6 from "@/assets/img/clients/clients-6.webp";
import partnerImage7 from "@/assets/img/clients/clients-7.webp";
import partnerImage8 from "@/assets/img/clients/clients-8.webp";
import partnerImage9 from "@/assets/img/clients/clients-9.webp";
import Image from "next/image";
import { BASE_URL, FetchInstance } from "@/api/FetchInstance";
import { useEffect, useState } from "react";

// Partners interface
interface Partner {
  id: number;
  name: string;
  logo: string;
  created_at: string;
  updated_at: string;
}

interface PartnersResponse {
  status: number;
  success: boolean;
  data: Partner[];
}

const PartnersSection = () => {
  const t = useTranslations("partners");
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getPartners = async () => {
    try {
      const res = await FetchInstance<PartnersResponse>("/api/partners/list");
      console.log(res?.data);
      
      if (res?.success && res?.data) {
        setPartners(res.data);
      }
    } catch (error) {
      console.error("Error fetching partners:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPartners();
  }, []);

  return (
    <section className="clients section py-[200px] bg-transparent">
      <div id="clients" className="">
        <div
          className="container xl:px-[90px] section-title"
          data-aos="fade-up"
        >
          <h2
            className="text-black dark:!text-white"
            data-uz="INNOWEEK"
            data-ru="INNOWEEK"
            data-en="INNOWEEK"
          >
            {t("INNOWEEK")}
          </h2>
          <div className="text-black dark:!text-white">{t("PARTNERS")}</div>
        </div>

        <div className="clients-slider">
          <div
            className="clients-track track-1"
            data-aos="fade-right"
            data-aos-delay="200"
          >
            {/* API dan kelgan partnerlar */}
            {partners.map((partner) => (
              <div key={`track1-${partner.id}`} className="clients-slide !bg-[#0085d4] dark:!bg-gray-800">
                <Image 
                  src={`${BASE_URL}/${partner.logo}`} 
                  className="img-fluid" 
                  alt={partner.name}
                  width={120}
                  height={80}
                />
              </div>
            ))}
            
            {/* Static partnerlar (agar API dan kam kelsa) */}
            <div className="clients-slide !bg-[#0085d4] dark:!bg-gray-800">
              <Image src={partnerImage1} className="img-fluid" alt="Client 1" />
            </div>
            <div className="clients-slide !bg-[#0085d4] dark:!bg-gray-800">
              <Image src={partnerImage2} className="img-fluid" alt="Client 2" />
            </div>
            <div className="clients-slide !bg-[#0085d4] dark:!bg-gray-800">
              <Image src={partnerImage3} className="img-fluid" alt="Client 3" />
            </div>
            <div className="clients-slide !bg-[#0085d4] dark:!bg-gray-800">
              <Image src={partnerImage4} className="img-fluid" alt="Client 4" />
            </div>
            <div className="clients-slide !bg-[#0085d4] dark:!bg-gray-800">
              <Image src={partnerImage5} className="img-fluid" alt="Client 5" />
            </div>
            <div className="clients-slide !bg-[#0085d4] dark:!bg-gray-800">
              <Image src={partnerImage6} className="img-fluid" alt="Client 6" />
            </div>
            <div className="clients-slide !bg-[#0085d4] dark:!bg-gray-800">
              <Image src={partnerImage7} className="img-fluid" alt="Client 7" />
            </div>

            {/* Ikkinchi qator uchun takrorlash */}
            {partners.map((partner) => (
              <div key={`track1-repeat-${partner.id}`} className="clients-slide !bg-[#0085d4] dark:!bg-gray-800">
                <Image 
                  src={`${BASE_URL}/storage/${partner.logo}`} 
                  className="img-fluid" 
                  alt={partner.name}
                  width={120}
                  height={80}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="clients-slider">
          <div
            className="clients-track track-2"
            data-aos="fade-left"
            data-aos-delay="200"
          >
            {/* API dan kelgan partnerlar */}
            {partners.map((partner) => (
              <div key={`track2-${partner.id}`} className="clients-slide !bg-[#0085d4] dark:!bg-gray-800">
                <Image 
                  src={`${BASE_URL}/storage/${partner.logo}`} 
                  className="img-fluid" 
                  alt={partner.name}
                  width={120}
                  height={80}
                />
              </div>
            ))}
            
            {/* Static partnerlar */}
            <div className="clients-slide !bg-[#0085d4] dark:!bg-gray-800">
              <Image src={partnerImage8} className="img-fluid" alt="Client 8" />
            </div>
            <div className="clients-slide !bg-[#0085d4] dark:!bg-gray-800">
              <Image src={partnerImage9} className="img-fluid" alt="Client 9" />
            </div>
            <div className="clients-slide !bg-[#0085d4] dark:!bg-gray-800">
              <Image src={partnerImage1} className="img-fluid" alt="Client 1" />
            </div>
            <div className="clients-slide !bg-[#0085d4] dark:!bg-gray-800">
              <Image src={partnerImage2} className="img-fluid" alt="Client 2" />
            </div>
            <div className="clients-slide !bg-[#0085d4] dark:!bg-gray-800">
              <Image src={partnerImage3} className="img-fluid" alt="Client 3" />
            </div>
            <div className="clients-slide !bg-[#0085d4] dark:!bg-gray-800">
              <Image src={partnerImage4} className="img-fluid" alt="Client 4" />
            </div>

            {/* Ikkinchi qator uchun takrorlash */}
            {partners.map((partner) => (
              <div key={`track2-repeat-${partner.id}`} className="clients-slide !bg-[#0085d4] dark:!bg-gray-800">
                <Image 
                  src={`${BASE_URL}/${partner.logo}`} 
                  className="img-fluid" 
                  alt={partner.name}
                  width={120}
                  height={80}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
