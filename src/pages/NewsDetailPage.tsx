import { useRef } from "react";
import { BASE_URL } from "@/api/axios";
import { Image as AntdImage, Carousel, Spin } from "antd";
import type { CarouselRef } from "antd/es/carousel";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { ArrowLeft } from "lucide-react";
import { useParams } from "react-router-dom";
import { useNewsDetail } from "@/hooks/queries/useNews";
import { useRouter } from "@/lib/navigation";

export default function NewsDetailPage() {
  const params = useParams();
  const newsId = params?.newsId as string;
  const locale = params?.locale as string;

  const router = useRouter();
  const carouselRef = useRef<CarouselRef>(null);

  const { data: response, isLoading } = useNewsDetail(newsId, locale);
  const data = response?.data;

  if (isLoading) {
    return (
      <div className="container flex min-h-[65vh] items-center justify-center pt-20">
        <Spin size="large" />
      </div>
    );
  }

  if (!data) {
    return <div className="container section-title">Yangilik topilmadi</div>;
  }

  // Combine the main image and gallery items into a single list of slides
  const slides: string[] = [];
  if (data.image) {
    slides.push(`${BASE_URL}/upload/news/${data.image}_big_720.png`);
  }
  (data.gallery ?? [])
    .slice()
    .sort((a, b) => a.order - b.order)
    .forEach((item) => {
      const url = item.image_url
        ? `${BASE_URL}${item.image_url}`
        : `${BASE_URL}/upload/news/${item.image}_big_720.png`;
      slides.push(url);
    });

  const hasMultiple = slides.length > 1;

  return (
    <div className="container pb-10 pt-20 mt-4 prose min-h-[65vh]">
      <div className="flex gap-4 items-start mb-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
        >
          <ArrowLeft className="h-4 w-4" />
          Orqaga
        </button>
        <span className="!text-lg m-0 leading-6 md:!text-2xl md:leading-9 text-black dark:!text-white !font-bold">
          {data.title}
        </span>
      </div>
      {slides.length > 0 && (
        <div className="relative mb-6 w-full overflow-hidden rounded-xl group">
          <AntdImage.PreviewGroup>
            <Carousel
              ref={carouselRef}
              dots={hasMultiple}
              draggable
              autoplay={hasMultiple}
              autoplaySpeed={5000}
            >
              {slides.map((src, index) => (
                <div key={index}>
                  <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden bg-black/5 dark:bg-white/5 max-h-[500px]">
                    {/* Blurred background fills empty space when the image ratio doesn't match */}
                    <div
                      aria-hidden
                      className="absolute inset-0 scale-110 bg-cover bg-center blur-2xl"
                      style={{ backgroundImage: `url(${src})` }}
                    />
                    <AntdImage
                      src={src}
                      alt={`${data.title} - ${index + 1}`}
                      rootClassName="relative z-[1] w-full h-full"
                      className="!h-full !w-full object-contain"
                      preview={{ mask: null }}
                    />
                  </div>
                </div>
              ))}
            </Carousel>
          </AntdImage.PreviewGroup>

          {hasMultiple && (
            <>
              <button
                type="button"
                aria-label="Previous slide"
                onClick={() => carouselRef.current?.prev()}
                className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-black opacity-0 shadow-md transition hover:bg-white group-hover:opacity-100 dark:bg-black/60 dark:text-white"
              >
                <LeftOutlined />
              </button>
              <button
                type="button"
                aria-label="Next slide"
                onClick={() => carouselRef.current?.next()}
                className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-black opacity-0 shadow-md transition hover:bg-white group-hover:opacity-100 dark:bg-black/60 dark:text-white"
              >
                <RightOutlined />
              </button>
            </>
          )}
        </div>
      )}
      <span
        className="prose prose-lg max-w-none text-black dark:text-white"
        dangerouslySetInnerHTML={{ __html: data.description }}
      />
    </div>
  );
}
