import { BASE_URL } from "@/api/axios";
import { Image as AntdImage, Spin } from "antd";
import { useParams } from "react-router-dom";
import { useNewsDetail } from "@/hooks/queries/useNews";

export default function NewsDetailPage() {
  const params = useParams();
  const newsId = params?.newsId as string;
  const locale = params?.locale as string;

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

  return (
    <div className="container pb-10 pt-20 mt-4 prose min-h-[65vh]">
      {data.image && (
        <AntdImage
          src={`${BASE_URL}/upload/news/${data?.image}_big_720.png`}
          alt={data.title}
          width={320}
          height={180}
          rootClassName="float-left w-full lg:w-1/4 mr-4"
          className="object-cover rounded-lg"
          preview={false}
        />
      )}
      <span className="!text-lg m-0 leading-6 md:!text-2xl md:leading-9 text-black dark:!text-white !font-bold pt-4 ">
        {data.title}
      </span>
      <span
        className="prose prose-lg max-w-none text-black dark:text-white"
        dangerouslySetInnerHTML={{ __html: data.description }}
      />
    </div>
  );
}
