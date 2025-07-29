import { BASE_URL, FetchInstance } from "@/api/FetchInstance";
import { INewsListItem, IResponse } from "@/types";
import Image from "next/image";

interface INewsById {
  params: Promise<{news_id: string}>
}

const getNewsById = async (id: string)=>{
  try {
    const res = await FetchInstance<IResponse<INewsListItem>>(`/api/v1.0/news/get/${id}`)
    console.log(res);
    
    return res?.data
    
  } catch (error) {
    console.log(error);
    
  }
}

export default async function NewsDetailPage({ params }: INewsById) {
  const { news_id } = await params;
  const data = await getNewsById(news_id);

  if (!data) {
    return (
      <div className="container section-title">
        Yangilik topilmadi
      </div>
    );
  }

  return (
    <div className="container py-10">
      <div className="section-title">
        <h1 className="text-3xl text-black dark:!text-white font-bold pt-4">{data.title}</h1>
        <div className="text-black  dark:!text-gray-400 text-sm">
          {data.created_at && (
            <span>
              {new Date(data.created_at).toLocaleDateString("uz-UZ", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          )}
        </div>
      </div>
      {data.image && (
        <div className="mb-6">
          <Image
            src={`${BASE_URL}/upload/news/${data?.image}_big_720.png`}
            alt={data.title}
            className="w-full max-h-[500px] object-cover rounded-lg"
            width={720}
            height={500}
          />
        </div>
      )}
      {/* <div className="mb-4 text-lg font-semibold">{data.description}</div> */}
      <div className="prose prose-lg max-w-none text-black dark:text-white" dangerouslySetInnerHTML={{ __html: data.description }} />
    </div>
  );
}
