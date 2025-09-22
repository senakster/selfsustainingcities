import Header from "@/components/Layout/Header/Header";
import Footer from "@/components/Layout/Footer/Footer";
import { ReactNode } from "react";
import { locales } from "@/lib/i18n/locales";
import type { Metadata } from "next";

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{locale: string}>
};

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export const metadata: Metadata = {
  title: "Self-sustaining Cities",
  description: "Selvforsynende byer",
};

export default async function LocaleLayout(props: LocaleLayoutProps) {
  const { children, params } = props;
  const { locale } = (await params) || {locale: locales[0]}

    return (
      <html
      lang={String(locale || locales[0])}
      className={`antialiased`}
    >
        <body className="h-[100dvh] max-h-full grid grid-cols-1 grid-rows-[auto_1fr_auto] overflow-y-auto overflow-x-hidden">
          <Header className={"sticky top-0"} locale={locale as typeof locales[number]} />
            <main className="">{children}</main>
          <Footer className="sticky bottom-0" />
        </body>
      </html>
    );
}