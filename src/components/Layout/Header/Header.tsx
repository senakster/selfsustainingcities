import LanguageSwitcher from "@/components/Atoms/ALanguageSwitcher/ALanguageSwitcher";
import { locales } from "@/lib/i18n/locales";
import { cn } from "@/lib/utils/cn";
import Link from "@/components/Atoms/AFlexibleLink/AFlexibleLink";
import Container from '@/components/Layout/Container/Container'
import ALogo from "@/components/Atoms/ALogo/ALogo";

type HeaderProps = {
  className: string;
  locale: typeof locales[number];
};
export default function Header(props: HeaderProps) {
  const { className, locale, ...rest } = props;
  return (
    <header 
      className={cn(`${className} sticky top-0 backdrop-blur-lg py-4 pb-10 mask-[linear-gradient(to_bottom,black_calc(100%-40px),transparent_100%)]`)}
      {...rest}
    >
      <Container className={'grid grid-rows-1 grid-cols-[1fr_auto] text-shadow-lg/30'}>
      <div>
        <Link href="/" locale={locale}>
        <ALogo />
        </Link>
      </div>
      <ul className="w-min flex gap-2 justify-between">
        {/* <li>
          <Link href={"/about"} locale={locale}>About</Link>
        </li>
        <li>
          <Link href={"/people"} locale={locale}>People</Link>
        </li>
        <li>
          <Link href={"/contact"} locale={locale}>Contact</Link>
        </li> */}
        <li>
          <LanguageSwitcher locale={locale} />
        </li>
      </ul>
      </Container>
    </header>
  );
}
