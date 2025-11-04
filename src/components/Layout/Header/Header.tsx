import LanguageSwitcher from "@/components/Atoms/ALanguageSwitcher/ALanguageSwitcher";
import { locales } from "@/lib/i18n/locales";
import { cn } from "@/lib/utils/cn";
import Link from "@/components/Atoms/AFlexibleLink/AFlexibleLink";
import Container from '@/components/Layout/Container/Container'
import ALogo from "@/components/Atoms/ALogo/ALogo";

import { navigation } from "@/lib/utils/getSitemap";

type HeaderProps = {
  className: string;
  locale: typeof locales[number];
};
export default function Header(props: HeaderProps) {
  const { className, locale, ...rest } = props;
  return (
    <header 
      className={cn(`${className} sticky bg-theme-secondary top-0 py-2 z-10`)}
      {...rest}
    >
      <Container className={'grid grid-rows-1 grid-cols-[1fr_auto] items-center'}>
      <div>
        <Link href="/" locale={locale} className='hover:none w-min inline-block'>
          <ALogo className='bg-theme-secondary' iconClassName='bg-theme-quarternary' />
        </Link>
      </div>
      <ul className="w-min flex gap-2 justify-between ml-4">
        {navigation[locale]?.map(
          (item) => <li key={item.url}>
          <Link href={item.url}>{item.title}</Link>
        </li>
        )}
        {/* <li>
          <Link href={"/about"} locale={locale}>About</Link>
        </li>
        <li>
          <Link href={"/people"} locale={locale}>People</Link>
        </li>
        <li>
          <Link href={"/contact"} locale={locale}>Contact</Link>
        </li> */}
        <li className='ml-4'>
          <LanguageSwitcher locale={locale} />
        </li>
      </ul>
      </Container>
    </header>
  );
}
