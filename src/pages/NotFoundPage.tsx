import { Link } from "@/lib/navigation";

export default function NotFoundPage() {
  return (
    <div className="container section-title min-h-[50vh] flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">404</h1>
      <p>Sahifa topilmadi</p>
      <Link href="/" className="text-[#0085d4] hover:underline">
        Bosh sahifa
      </Link>
    </div>
  );
}
