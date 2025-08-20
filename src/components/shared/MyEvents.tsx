"use client";

import { FetchInstance } from "@/api/FetchInstance";
import section from "@/assets/img/section_bg_2.jpg";
import { IEventDetail, IResponse } from "@/types";
import { Card, Empty, Spin, Tag, Divider } from "antd";
import { CalendarIcon, MapPinIcon, ClockIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useLocale } from "next-intl";

const MyEvents = () => {
  const [events, setEvents] = useState<IEventDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const locale = useLocale();

  const getMyEventsList = useCallback(async () => {
    try {
      setLoading(true);
      const res = await FetchInstance<IResponse<IEventDetail[]>>(
        "/api/v1.0/user/events/get"
      );
      console.log(res?.data);
      setEvents(res?.data || []);
    } catch (error) {
      console.error("Error fetching events:", error);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getMyEventsList();
  }, [getMyEventsList]);

  const getLocalizedText = (
    textUz: string | null,
    textRu: string | null,
    textEn: string | null
  ) => {
    if (locale === "uz") return textUz || textEn || textRu || "";
    if (locale === "ru") return textRu || textEn || textUz || "";
    return textEn || textUz || textRu || "";
  };

  if (loading) {
    return (
      <div className="min-h-32 flex justify-center items-center rounded-2xl">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div
      className="min-h-32 p-4 lg:p-6 rounded-2xl !shadow-lg overflow-hidden border border-gray-200 dark:!border-gray-700 shadow-gray-300 dark:shadow-blue-500 h-full"
      style={{
        backgroundImage: `url(${section.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h2 className="text-2xl font-bold mb-6 text-black">Mening tadbirlarim</h2>

      {events.length === 0 ? (
        <Empty description="Hech qanday tadbir topilmadi" className="my-8" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((eventDetail) => {
            const { event } = eventDetail;
            const title = getLocalizedText(
              event.title_uz,
              event.title_ru,
              event.title_en
            );
            const description = getLocalizedText(
              event.description_uz,
              event.description_ru,
              event.description_en
            );
            const address = getLocalizedText(
              event.address_uz,
              event.address_ru,
              event.address_en
            );

            return (
              <Card
                key={eventDetail.id}
                className="shadow-lg w-full hover:shadow-xl transition-shadow duration-300 border-0 overflow-hidden"
                cover={
                  <div
                    className="h-36 !w-full flex items-center justify-center text-center "
                    style={{
                      backgroundImage: `url(${section.src})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <h3 className="!text-xl font-bold text-centerpx-4 w-4/5 mx-auto  text-black pt-4">
                      {title}
                    </h3>
                  </div>
                }
              >
                <Divider />
                <div className="space-y-2">
                  {/* Sana */}
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                    <CalendarIcon size={16} className="text-blue-500" />
                    <span className="text-sm">{event?.date}</span>
                  </div>

                  {/* Vaqt */}
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                    <ClockIcon size={16} className="text-green-500" />
                    <span className="text-sm">
                      {event.started_at} - {event.stopped_at}
                    </span>
                  </div>

                  {/* Manzil */}
                  {address && (
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                      <MapPinIcon size={16} className="text-red-500" />
                      <span className="text-sm">{address}</span>
                    </div>
                  )}

                  {/* Status */}
                  <div className="flex justify-between items-center">
                    <Tag
                      color={
                        event.status === "active"
                          ? "green"
                          : event.status === "completed"
                          ? "blue"
                          : "orange"
                      }
                      className="capitalize"
                    >
                      {event.status || "Kutilmoqda"}
                    </Tag>
                  </div>

                  {/* Tavsif */}
                  {description && (
                    <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
                      {description}
                    </p>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyEvents;
