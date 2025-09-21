import Header from "@/components/Layout/Header/Header";
import Footer from "@/components/Layout/Footer/Footer";
import { ReactNode } from "react";
import { locales } from "@/lib/i18n/locales";

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{locale: typeof locales[number]}>
};

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}


export default async function LocaleLayout(props: LocaleLayoutProps) {
  const { children, params } = props;
  const {locale} = (await params) || {}
    return (
      <html
      lang={String(locale || locales[0])}
      className={`antialiased`}
    >
        <body className="h-[100dvh] max-h-full grid grid-cols-1 grid-rows-[auto_1fr_auto] overflow-hidden">
          <Header className={"border-b"} locale={locale || locales[0]} />
            <main className="overflow-x-hidden overflow-y-auto">{children}</main>
          <Footer className="border-t" />
        </body>
      </html>
    );
}