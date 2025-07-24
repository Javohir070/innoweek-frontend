import SpeakersSection from "@/components/landing/Speakers";

export default function ProgramDetailPage() {
    return (
        <section className="bg-white dark:bg-[#031119] transition-colors duration-300">
            <div className="container mx-auto px-4 py-10">
                {/* Title */}
                <div className="text-center mb-10">
                    <h2 className="text-xl text-black dark:text-white font-semibold relative inline-block">
                        <span className="border-t-2 border-blue-500 w-10 inline-block align-middle mr-2" />
                        CAEx BETA HALL
                        <span className="border-t-2 border-blue-500 w-10 inline-block align-middle ml-2" />
                    </h2>
                </div>

                {/* Biz haqimizda - Improved Section */}
                <div className="mb-16">
                    <h3 className="text-2xl font-semibold text-black dark:text-white mb-8">Biz haqimizda</h3>

                    <div className="space-y-8">
                        {/* Location */}
                        <div className="flex items-start">
                            <div className="flex-shrink-0 mr-4">
                                <div className="w-4 h-4 bg-blue-500 rounded-full mt-1.5"></div>
                            </div>
                            <div className="flex-1">
                                <h4 className="text-xl text-blue-600 font-semibold mb-2">Bizning Manzil</h4>
                                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md p-4 border-l-4 border-blue-500">
                                    <p className="text-lg font-semibold text-black dark:text-white">Toshkent Shahar</p>
                                </div>
                            </div>
                        </div>

                        {/* Time */}
                        <div className="flex items-start">
                            <div className="flex-shrink-0 mr-4">
                                <div className="w-4 h-4 bg-blue-500 rounded-full mt-1.5"></div>
                            </div>
                            <div className="flex-1">
                                <h4 className="text-xl text-blue-600 font-semibold mb-2">Boshlanish Vaqti</h4>
                                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md p-4 border-l-4 border-blue-500">
                                    <p className="text-lg font-semibold text-black dark:text-white">12:00 - 13:00</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Spikerlar */}
                <SpeakersSection />
            </div>
        </section>
    );
}