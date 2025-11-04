import 'server-only'

import { sanityClient } from "@/sanity/lib/client";
import { pageQuery, PageQueryProps } from "@/adapters/sanity/queries/page.query";
import { pagesParamsQuery } from '@/adapters/sanity/queries/static-page-params.query';


export async function getPage({ slug, language, isPreview, tags = [] }: { slug: string[], language: string, isPreview?: boolean, tags: string[] }) {
  const currentSlug = slug[0] || null;
  const parentSlug = slug[1] || null;
  const grandParentSlug = slug[2] || null;
  const page = await sanityClient<PageQueryProps>({ query: pageQuery, params: { slug: currentSlug, language, parentSlug, grandParentSlug }, isPreview, tags: [slug.join('-'), ...tags]});
  return page;
}

export async function getPagesParams({ locale, isPreview }: { locale: string, isPreview?: boolean }) {
  const pagesParams = await sanityClient<{slugs: string[], language: string }[]>({ query: pagesParamsQuery, params: { locale }, isPreview });
  return pagesParams;
}