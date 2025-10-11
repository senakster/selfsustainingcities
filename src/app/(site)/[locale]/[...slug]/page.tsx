import { notFound } from "next/navigation";
import Hero from "@/components/Layout/Hero/Hero";
import SectionsResolver from "@/components/Layout/SectionsResolver/SectionsResolver";
import { locales } from "@/lib/i18n/locales";
import { getPage, getPagesParams } from "@/serverfunctions/load-page";
import isDraftMode from "@/sanity/lib/helpers/isDraftMode"

type PageProps = { slug: string[], locale: string }

export const revalidate = 10; // seconds

export async function generateStaticParams({ params }: { params: { locale: string, slug: string[] } }) {
  const { locale } = params;
  const data = await getPagesParams({ locale });
  const pageParams = data.map(({ slugs, language }) => ({ slug: [ ...slugs], locale: language }))
  return pageParams;  
}

export default async function Page({ params }: { params: Promise<PageProps> }) {
  const { slug, locale } = await params;
  const isPreview = await isDraftMode()
  const page = await getPage({ slug, language: locale, isPreview });
  
  if (!page) {
    notFound();
  }

  const { hero, content, language } = page;
  
  return (
    <div className="py-12">
      <Hero {...hero} />
      <SectionsResolver sections={content || []} locale={language as typeof locales[number]} />
      {isPreview ? <p>preview</p> : null}
    </div>
  );
}
