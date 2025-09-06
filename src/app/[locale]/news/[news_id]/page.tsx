import { BASE_URL, FetchInstance } from "@/api/FetchInstance";
import { INewsListItem, IResponse } from "@/types";
import Image from "next/image";

interface INewsById {
  params: Promise<{ news_id: string; locale: string }>;
}

const getNewsById = async (id: string, locale: string) => {
  try {
    const res = await FetchInstance<IResponse<INewsListItem>>(
      `/api/v1.0/news/get/${id}?lang=${locale}`
    );
    console.log(res);

    return res?.data;
  } catch (error) {
    console.log(error);
  }
};

export default async function NewsDetailPage({ params }: INewsById) {
  const { news_id, locale } = await params;
  const data = await getNewsById(news_id, locale);
  console.log(data);

  if (!data) {
    return <div className="container section-title">Yangilik topilmadi</div>;
  }

  return (
    <div className="container pb-10 pt-20">
      <div className="section-title pb-2">
        <h1 className="!text-lg m-0 leading-6 md:!text-2xl md:leading-9 text-black dark:!text-white !font-bold pt-4 ">
          {data.title}
        </h1>
      </div>
      {data.image && (
        <div className="mb-6">
          <Image
            src={`${BASE_URL}/upload/news/${data?.image}_big_720.png`}
            alt={data.title}
            className="w-full min-h-[400px] max-h-[600px] object-cover rounded-lg"
            width={720}
            height={500}
          />
        </div>
      )}
      <div
        className="prose prose-lg max-w-none text-black dark:text-white"
        dangerouslySetInnerHTML={{ __html: data.description }}
      />
    </div>
  );
}
