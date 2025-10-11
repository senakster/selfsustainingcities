import { sanityClient } from "@/sanity/lib/client";
import { pageQuery, PageQueryProps } from "@/adapters/sanity/queries/page.query";
import { loadPagesParams } from "@/adapters/sanity/queries/static-page-params.query";
import { notFound } from "next/navigation";
import Hero from "@/components/Layout/Hero/Hero";
import SectionsResolver from "@/components/Layout/SectionsResolver/SectionsResolver";
import { locales } from "@/lib/i18n/locales";


type PageProps = { slug: string[], locale: string }

export async function generateStaticParams({ params }: { params: { locale: string, slug: string[] } }) {
  const { locale } = await params;
  const data = await loadPagesParams({ locale });
  console.log(data.map((page: { slugs: string[], language: string }) => ({ slug: [page.language, ...page.slugs] })))
  return data.map((page: { slugs: string[] }) => ({ slug: [locale, ...page.slugs] }));
}

export default async function Page({ params }: { params: Promise<PageProps> }) {
  const { slug, locale } = await params;

  const page = await sanityClient<PageQueryProps>({ query: pageQuery, params: { slug, language: locale } })

  if (!page) {
    notFound();
  }

  const { hero, content, language } = page;
  
  return (
    <div className="py-12">
      <Hero {...hero} />
      <SectionsResolver sections={content || []} locale={language as typeof locales[number]} />
    </div>
  );
}
