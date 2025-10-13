import { sanityClient } from "@/sanity/lib/client";
import { SitemapItem, sitemapQuery } from "@/adapters/sanity/queries/sitemap.query";



export const sitemapEn = async () => await sanityClient<SitemapItem>({ query: sitemapQuery, params: {language: 'en'} });

export const sitemapDa = async () => await sanityClient<SitemapItem>({ query: sitemapQuery, params:{language: 'da'}});

export default async () => ([...await sitemapEn(), ...await sitemapDa()])