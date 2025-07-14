

import CustomLayout from "@/components/Layout/Layout";
import { routing } from "@/i18n/routing";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return [{ locale: "uz" }, { locale: "en" }];
}


export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: "uz" | "en" | "ru" }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
 

  return (
    <>
          <NextIntlClientProvider locale={locale}>
              <CustomLayout>{children}</CustomLayout>
          </NextIntlClientProvider>
    </>
      
  );
}
