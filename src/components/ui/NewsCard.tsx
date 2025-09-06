import React from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

interface NewsCardProps {
  id: number;
  title: string;
  description: string;
  image: string;
  createdAt: string;
}

const NewsCard: React.FC<NewsCardProps> = ({ title, image, id }) => {
  

  const t = useTranslations("news");

  return (
    <Link href={`/news/${id}`}>
      <div className="group relative bg-white text-black dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 dark:text-white rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] cursor-pointer">
        <div className="absolute inset-0 dark:bg-gradient-to-br dark:from-blue-900/20 dark:via-transparent dark:to-purple-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative h-[250px] overflow-hidden">
          <Image
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            width={300}
            height={200}
          />
          <div className="absolute inset-0 dark:bg-gradient-to-t dark:from-slate-900/80 dark:via-transparent dark:to-transparent"></div>
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-500/90 text-white backdrop-blur-sm">
              INNOWEEK
            </span>
          </div>
        </div>

        <div className="relative p-3 space-y-2">
          <div className="min-h-[80px]">
            <h3 className="!text-[17px]   font-bold dark:!text-white !text-gray-800 leading-tight group-hover:text-blue-400 transition-colors duration-300 mt-2 mb-0 line-clamp-4">
              {title}
            </h3>
          </div>

          <div className="flex items-center justify-between">
            <button className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium text-sm transition-colors duration-200">
              {t("more")}
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </div>
        </div>

        {/* Hover Glow Effect */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 rounded-2xl dark:bg-gradient-to-r dark:from-blue-500/10 dark:via-purple-500/10 dark:to-blue-500/10 blur-xl"></div>
        </div>
      </div>
    </Link>
  );
};

export default NewsCard;
