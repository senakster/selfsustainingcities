import { sanityClient } from "@/sanity/lib/client";
import { SitemapItem, sitemapQuery } from "@/adapters/sanity/queries/sitemap.query";



export const sitemapEn = async () => await sanityClient<SitemapItem[]>({ query: sitemapQuery, params: {language: 'en'} });

export const sitemapDa = async () => await sanityClient<SitemapItem[]>({ query: sitemapQuery, params:{language: 'da'}});

export const sitemaps = {
    en: await sitemapEn(),
    da: await sitemapDa()
}

const getSitemap = async () => ([...sitemaps.en, ...sitemaps.da])
export default getSitemap