import { pageQuery, PageQueryProps } from "@/adapters/sanity/queries/page.query";
import { sanityClient } from "@/sanity/lib/client";

export const sitemap = {
  get: async ({slug}: {slug: string[]}) => {
    const pages = await sanityClient<PageQueryProps>({ query: pageQuery, params: { slug, language: "en" } });
    return pages;
  },
};
