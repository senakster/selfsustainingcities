import { client } from "@/sanity/lib/client";
import {
  pageQuery,
  type PageQueryProps,
} from "@/adapters/sanity/queries/page.query";
import { notFound } from "next/navigation";
import {locales } from '@/lib/i18n/locales'
import SectionsResolver from "@/components/Layout/SectionResolver/SectionsResolver";
import PortableTextResolver from "@/components/Layout/PortableText/PortableText";
import { PortableTextMarkDefinition } from "@portabletext/types";
import Container from "@/components/Layout/Container/Container";
import AHeading from "@/components/Atoms/AHeading/Aheading";
type HomeProps = {
  params: Promise<{ locale: string }>;
};


export default async function Home(props: HomeProps) {
  const { params: _params } = props;
  const params = await _params;
  const page = await client.fetch<PageQueryProps>(pageQuery, { slug: [], language: params.locale || locales[0] });
  if (!page) {
    notFound();
  }

  const { title, hero } = page;
  return (
    <div>
      <div className={'hero flex flex-col gap-12 py-12'}>
        <Container>
          <AHeading tag="h1" className="text-center">{hero.headline || title}</AHeading>
        </Container>
        <Container>
        {hero.byline && <PortableTextResolver text={hero.byline.text as PortableTextMarkDefinition} />}
        </Container>
        </div>
        
        <SectionsResolver sections={[{_type: 'textblock', _key: 'textblock', text: hero.byline.text as PortableTextMarkDefinition}]} />
        
    </div>
  );
}
