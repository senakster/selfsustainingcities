import { client } from "@/sanity/lib/client";
import {
  pageQuery,
  type PageQueryProps,
} from "@/adapters/sanity/queries/page.query";
import { notFound } from "next/navigation";
import {locales } from '@/lib/i18n/locales'
// import SectionsResolver from "@/components/Layout/SectionResolver/SectionsResolver";
// import PortableTextResolver from "@/components/Layout/PortableText/PortableText";
// import { PortableTextMarkDefinition } from "@portabletext/types";
// import Container from "@/components/Layout/Container/Container";
// import AHeading from "@/components/Atoms/AHeading/Aheading";
import Hero from '@/components/Layout/Hero/Hero';

type HomeProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata ({params}: {params: Promise<{locale: string}>}) {
  const page = await client.fetch<PageQueryProps>(pageQuery, { slug: [], language: (await params).locale || locales[0] });
  if (!page) {
    return {
      title: 'Home',
      description: 'Home',
    }
  }
  const { title, slug, seo } = page;
 ;
  return {
    title: `${title} ${slug.filter(Boolean).length > 0 ? '| self-sustaining cities' : ''}`,
    description: seo?.description || title,
    openGraph: {
      title: title,
      description: seo?.description || title,
      images: [seo?.image],
      url: seo?.canonical || '',
    },
  }
}

export default async function Home(props: HomeProps) {
  const { params: _params } = props;
  const params = await _params;
  const page = await client.fetch<PageQueryProps>(pageQuery, { slug: [], language: params.locale || locales[0] });
  if (!page) {
    notFound();
  }

  const { title, hero } = page;
  return (
    <div className="py-12">
      <Hero {...hero} />
        {/* <SectionsResolver sections={[{_type: 'textblock', _key: 'textblock', text: hero.byline.text as PortableTextMarkDefinition}]} /> */}
        
    </div>
  );
}
