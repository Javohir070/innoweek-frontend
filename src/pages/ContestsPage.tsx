import ContestCard from "@/components/contests/ContestCard";
import {
  useInventionContests,
  useTijoratContests,
} from "@/hooks/queries/useContests";
import { useTranslations } from "@/i18n/useTranslations";
import { Link } from "@/lib/navigation";
import { ChevronLeft } from "lucide-react";

function ContestGrid({
  items,
  loading,
  error,
}: {
  items: ReturnType<typeof useInventionContests>["data"];
  loading: boolean;
  error: boolean;
}) {
  const t = useTranslations("contests");

  if (loading) {
    return (
      <div className="flex min-h-[200px] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#0085d4] border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return (
      <p className="rounded-xl bg-red-50 px-4 py-6 text-center text-red-600">
        {t("load_error")}
      </p>
    );
  }

  if (!items?.length) {
    return (
      <p className="rounded-xl bg-white px-4 py-6 text-center text-gray-500">
        {t("empty")}
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {items.map((contest) => (
        <ContestCard key={contest.id} contest={contest} />
      ))}
    </div>
  );
}

export default function ContestsPage() {
  const t = useTranslations("contests");
  const invention = useInventionContests();
  const tijorat = useTijoratContests();

  return (
    <section
      id="portfolio"
      className="testimonials section-light-background bg-transparent min-h-[85vh]"
    >
      <div className="container section-title mt-5 pb-4">
        <h2 className="text-black dark:!text-white">INNOWEEK</h2>
        <div className="text-black dark:!text-white">{t("invention_section")}</div>
      </div>
      <div className="container mx-auto px-4">
        <div className="mb-14">
          {/* <h2 className="mb-6 text-lg font-bold text-gray-900 md:text-xl">
            {t("invention_section")}
          </h2> */}
          <ContestGrid
            items={invention.data}
            loading={invention.isLoading}
            error={invention.isError}
          />
        </div>

        <div>
          <h2 className="mb-6 text-lg font-bold text-gray-900 md:text-xl">
            {t("tijorat_section")}
          </h2>
          <ContestGrid
            items={tijorat.data}
            loading={tijorat.isLoading}
            error={tijorat.isError}
          />
        </div>
      </div>
    </section>
  );
}
