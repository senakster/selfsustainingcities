import { notFound } from "next/navigation";
import Hero from "@/components/Layout/Hero/Hero";
import SectionsResolver from "@/components/Layout/SectionsResolver/SectionsResolver";
import { locales } from "@/lib/i18n/locales";
import { getPage, getPagesParams } from "@/serverfunctions/load-page";
import isDraftMode from "@/sanity/lib/helpers/isDraftMode"
import { PageQueryProps } from "@/adapters/sanity/queries/page.query";

type PageProps = { slug: string[], locale: string }

export const dynamic = 'force-static';
export const dynamicParams = true;
export const revalidate = 3600; // 1 hour

export async function generateStaticParams({ params }: { params: { locale: string, slug: string[] } }) {
  const { locale } = params;
  const isPreview = await isDraftMode()
  const data = await getPagesParams({ locale, isPreview });
  const pageParams = data.map(({ slugs }) => ({ slug: [ ...slugs]}))
  return pageParams;  
}

export default async function Page({ params }: { params: Promise<PageProps> }) {
  const { slug, locale } = await params;
  const isPreview = await isDraftMode()
  let page: PageQueryProps | null = null;
  try {
  page = await getPage({ slug: slug, language: locale || locales[0], isPreview, tags: [`${locale}-${slug.join('-')}`] });
  } catch (error) {
    console.error('error', error)
    notFound()
  }
  if  (!page) {
    notFound()
  }
  const { hero, content, language } = page;
  
  return (
    <div className="">
      <Hero headline={hero?.headline} leadText={hero?.leadText} image={hero?.image} className="bg-theme-quarternary" textClasses="text-theme-secondary"/>
      <div className="py-12">
       <SectionsResolver sections={content || []} locale={language as typeof locales[number]} />
      </div>
    </div>
  );
}
