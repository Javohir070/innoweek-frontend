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
    <div className="container pb-10 pt-20 mt-4 prose min-h-[65vh]">
      {data.image && (
        <Image
          src={`${BASE_URL}/upload/news/${data?.image}_big_720.png`}
          alt={data.title}
          className="float-left w-full object-cover rounded-lg lg:w-1/4 mr-4"
          width={320}
          height={180}
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
