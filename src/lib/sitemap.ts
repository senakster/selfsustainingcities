import { pageQuery } from "@/adapters/sanity/queries/page.query";
import { client } from "@/sanity/lib/client";

export const sitemap = {
  get: async () => {
    const pages = await client.fetch(pageQuery, { slug: ["/"] });
    return pages;
  },
};
