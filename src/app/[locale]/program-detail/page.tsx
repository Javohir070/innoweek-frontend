import SpeakersSection from "@/components/landing/Speakers";

export default function ProgramDetailPage() {
    return (
        <section className="min-h-screen flex items-center justify-center bg-white dark:bg-[#031119] transition-colors duration-300">
            <div className="container text-center">
                <h1 className="text-3xl font-bold text-black dark:text-white mb-4">Program Detail</h1>
                <SpeakersSection />
            </div>
        </section>
    );
}
