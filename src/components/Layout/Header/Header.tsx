import LanguageSwitcher from "@/components/Atoms/ALanguageSwitcher/ALanguageSwitcher";
import { locales } from "@/lib/i18n/locales";
import { cn } from "@/lib/utils/cn";
import Link from "@/components/Atoms/AFlexibleLink/AFlexibleLink";

type HeaderProps = {
  className: string;
  locale: typeof locales[number];
};
export default function Header(props: HeaderProps) {
  const { className, locale, ...rest } = props;
  return (
    <header
      className={cn(`grid grid-rows-1 grid-cols-[1fr_auto] ${className}`)}
      {...rest}
    >
      <div>
        <Link href="/" locale={locale}> Logo (home)</Link>
      </div>
      <ul className="w-min flex gap-2 justify-between">
        <li>
          <Link href={"/about"} locale={locale}>About</Link>
        </li>
        <li>
          <Link href={"/people"} locale={locale}>People</Link>
        </li>
        <li>
          <Link href={"/contact"} locale={locale}>Contact</Link>
        </li>
        <li>
          <LanguageSwitcher locale={locale} />
        </li>
      </ul>
    </header>
  );
}
