import type { Metadata } from "next";
import { Nunito_Sans, Raleway, Roboto } from "next/font/google";
import { ThemeProvider } from "next-themes"; // next-themes ni import qilamiz
import "@ant-design/v5-patch-for-react-19";
import "./globals.css";
import "@/assets/vendor/bootstrap/css/bootstrap.min.css";
import "@/assets/vendor/bootstrap-icons/bootstrap-icons.css";
import "@/assets/vendor/aos/aos.css";
import "@/assets/vendor/swiper/swiper-bundle.min.css";
import "@/assets/vendor/glightbox/css/glightbox.min.css";

const roboto_font = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "INNOWEEK - International Week of Innovative Ideas",
  description:
    "InnoWeek.Uz - bu mahalliy va xorijiy tadqiqot markazlari, investitsion fondlar, texnologik agentlik, texnoparklar va biznes-inkubatorlar uchun yagona platforma bo'lib xizmat qiladi desak adashmaymiz. 2021 yildan buyon doimiy o'tkazlib kelinmoqda...",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
  },
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: "uz" | "en" | "ru" }>;
}>) {
  const { locale } = await params;
  return (
    <html lang={locale || "uz"} suppressHydrationWarning>
      <body
        className={`${roboto_font.variable} ${raleway.variable} ${nunitoSans.variable} antialiased !font-nunito-sans !p-0`}
      >
        <ThemeProvider attribute="class" defaultTheme="light">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
