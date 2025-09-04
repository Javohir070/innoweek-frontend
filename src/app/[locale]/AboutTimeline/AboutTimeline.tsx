import { IProgramDetail } from "@/types";
import { useTranslations } from "next-intl";

export default function AboutTimeline({ data }: { data: IProgramDetail }) {
  console.log(data);
  const t = useTranslations("about_timeline");

  return (
    <section className="bg-white pb-0 dark:!bg-transparent transition-colors duration-300 mt-0">
      <div className="container mx-auto px-4 mt-0">
        {/* Title */}
        <div className="text-center mb-10">
          <h2 className="text-xl text-black dark:!text-white !font-bold relative inline-block">
            <span className="border-t-2 border-blue-500 w-10 inline-block align-middle mr-2" />
            {data?.schedule?.title}
            <span className="border-t-2 border-blue-500 w-10 inline-block align-middle ml-2" />
          </h2>
        </div>

        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-black dark:!text-white mb-0">
            {t("about_us")}
          </h3>
          <section
            id="resume"
            className="resume py-[20px] pb-5 section bg-white dark:!bg-[#031119] transition-colors duration-300"
          >
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="resume-wrapper">
                    <div className="resume-block">
                      <div className="resume-block">
                        <div className="timeline">
                          <div className="timeline-item border-gray-200 dark:border-gray-700">
                            <div className="timeline-left">
                              <h4 className="company  mb-0   !text-blue-700 border-l-4 pl-3 !text-2xl !font-bold cursor-pointer hover:!text-blue-500 dark:hover:text-blue-400">
                                {t("our_address")}
                              </h4>
                            </div>
                            <div className="timeline-dot bg-blue-500 dark:bg-blue-600"></div>
                            <div className="timeline-right">
                              <h3
                                className="position mb-0 border bg-gray-100 p-4 !text-black dark:!text-blue-500 dark:bg-gray-800 dark:!border-gray-400/70 cursor-pointer hover:!text-blue-500 rounded-md dark:hover:text-blue-400"
                                style={{
                                  boxShadow:
                                    "0 5px 15px -3px #0085d4, 0 4px 6px -4px #0085d4",
                                }}
                              >
                                {data?.schedule?.address}
                              </h3>
                            </div>
                          </div>
                          <div className="timeline-item border-gray-200 dark:border-gray-700">
                            <div className="timeline-left">
                              <h4 className="company  mb-0   !text-blue-700 border-l-4 pl-3 !text-2xl !font-bold cursor-pointer hover:!text-blue-500 dark:hover:text-blue-400">
                                {t("start_time")}
                              </h4>
                            </div>
                            <div className="timeline-dot bg-blue-500 dark:bg-blue-600"></div>
                            <div className="timeline-right">
                              <h3
                                className="position mb-0 border bg-gray-100 p-4 !text-black dark:!text-blue-500 dark:bg-gray-800 dark:!border-gray-400/70 cursor-pointer hover:!text-blue-500 rounded-md dark:hover:text-blue-400"
                                style={{
                                  boxShadow:
                                    "0 5px 15px -3px #0085d4, 0 4px 6px -4px #0085d4",
                                }}
                              >
                                {data?.schedule?.started_at} -{" "}
                                {data?.schedule?.stopped_at}
                              </h3>
                            </div>
                          </div>

                          {/* <div className="timeline-item border-gray-200 dark:border-gray-700">
                            <div className="timeline-left">
                              <h4 className="company  mb-0   !text-blue-700 border-l-4 pl-3 !text-2xl !font-bold cursor-pointer hover:!text-blue-500 dark:hover:text-blue-400">
                                {t("description")}
                              </h4>
                            </div>
                            <div className="timeline-dot bg-blue-500 dark:bg-blue-600"></div>
                            <div className="timeline-right">
                              <h3
                                className="position mb-0 border bg-gray-100 p-4 !text-black dark:!text-blue-500 dark:bg-gray-800 dark:!border-gray-400/70 cursor-pointer hover:!text-blue-500 rounded-md dark:hover:text-blue-400"
                                style={{
                                  boxShadow:
                                    "0 5px 15px -3px #0085d4, 0 4px 6px -4px #0085d4",
                                }}
                              >
                                {data?.schedule?.description}
                              </h3>
                            </div>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
