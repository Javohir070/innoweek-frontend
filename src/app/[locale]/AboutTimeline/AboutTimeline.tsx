import SpeakersSection from "@/components/landing/Speakers";
import Link from "next/link";

export default function AboutTimeline() {


    return (
        <section className="bg-white pb-0 dark:!bg-transparent transition-colors duration-300 mt-0">
            <div className="container mx-auto px-4 mt-0">
                {/* Title */}
                <div className="text-center mb-10">
                    <h2 className="text-xl text-black dark:!text-white !font-bold relative inline-block">
                        <span className="border-t-2 border-blue-500 w-10 inline-block align-middle mr-2" />
                        CAEx BETA HALL
                        <span className="border-t-2 border-blue-500 w-10 inline-block align-middle ml-2" />
                    </h2>
                </div>

                <div className="mb-16">
                    <h3 className="text-2xl font-semibold text-black dark:!text-white mb-0">
                        Biz haqimizda
                    </h3>
                    <section
                        id="resume"
                        className="resume py-[20px] pb-5 section bg-white dark:!bg-[#031119] transition-colors duration-300"
                    >
                        {/* <div className="container section-title" data-aos="fade-up"></div> */}
                        <div className="container" data-aos="fade-up" data-aos-delay="100">
                            <div className="row">
                                <div className="col-12">
                                    <div className="resume-wrapper">
                                        <div className="resume-block" data-aos="fade-up">
                                            <div
                                                className="resume-block"
                                                data-aos="fade-up"
                                                data-aos-delay="100"
                                            >
                                                <div className="timeline">
                                                    <div
                                                        className="timeline-item border-gray-200 dark:border-gray-700"
                                                        data-aos="fade-up"
                                                        data-aos-delay="200"
                                                    >
                                                        <div className="timeline-left">
                                                            <Link href="/program-detail">
                                                                <h4 className="company  mb-0   !text-blue-700 border-l-4 pl-3 !text-2xl !font-bold cursor-pointer hover:!text-blue-500 dark:hover:text-blue-400">
                                                                    Bizning Manzil
                                                                </h4>
                                                            </Link>
                                                        </div>
                                                        <div className="timeline-dot bg-blue-500 dark:bg-blue-600"></div>
                                                        <div className="timeline-right">
                                                            <Link href="/program-detail">
                                                                <h3
                                                                    className="position mb-0 border bg-gray-100 p-4 !text-black dark:!text-blue-500 dark:bg-gray-800 dark:!border-gray-400/70 cursor-pointer hover:!text-blue-500 rounded-md dark:hover:text-blue-400"
                                                                    style={{
                                                                        boxShadow:
                                                                            "0 5px 15px -3px #0085d4, 0 4px 6px -4px #0085d4",
                                                                    }}
                                                                >
                                                                    Toshkent Shahar
                                                                </h3>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="timeline-item border-gray-200 dark:border-gray-700"
                                                        data-aos="fade-up"
                                                        data-aos-delay="300"
                                                    >
                                                        <div className="timeline-left">
                                                            <h4 className="company  mb-0   !text-blue-700 border-l-4 pl-3 !text-2xl !font-bold cursor-pointer hover:!text-blue-500 dark:hover:text-blue-400">
                                                                Boshlanish Vaqti
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
                                                                12:00 - 13:00
                                                            </h3>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="timeline-item border-gray-200 dark:border-gray-700"
                                                        data-aos="fade-up"
                                                        data-aos-delay="400"
                                                    >

                                                        <div className="timeline-left">
                                                            <h4 className="company  mb-0   !text-blue-700 border-l-4 pl-3 !text-2xl !font-bold cursor-pointer hover:!text-blue-500 dark:hover:text-blue-400">
                                                                Yana nimadr
                                                            </h4>
                                                        </div>
                                                        <div className="timeline-dot bg-blue-500 dark:bg-blue-600"></div>
                                                        <div className="timeline-right">
                                                            <h3
                                                                className="position mb-0 border bg-gray-100 p-4 !text-black dark:!text-blue-500 dark:bg-gray-800 cursor-pointer dark:!border-gray-400/70 hover:!text-blue-500 rounded-md dark:hover:text-blue-400"
                                                                style={{
                                                                    boxShadow:
                                                                        "0 5px 15px -3px #0085d4, 0 4px 6px -4px #0085d4",
                                                                }}
                                                            >
                                                                Master of Fine Arts
                                                            </h3>
                                                        </div>
                                                    </div>
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