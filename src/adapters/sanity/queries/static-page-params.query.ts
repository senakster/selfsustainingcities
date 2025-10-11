import { supportedLanguages } from "@/lib/i18n/locales";

export const pagesParamsQuery = groq`
*[_type == 'page' && defined(slug.current) && (!defined($locale) || language == $locale)] {
  language,
  _updatedAt,
  'slugs': [slug.current],
  defined(parent->slug.current) => {
    'slugs': [parent->slug.current, slug.current]
  },
  defined(parent->parent->slug.current) => {
    'slugs': [parent->parent->slug.current, parent->slug.current, slug.current]
  },
}`




import { sanityClient } from "@/sanity/lib/client";
import { groq } from "next-sanity";


export async function loadPagesParams({locale}: {locale: string | null}) {
    return await sanityClient<{slugs: string[], language: string}[]>({
      query: pagesParamsQuery,
      tags: ['pages'],
      params: { locale },
    })
  }