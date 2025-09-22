import { NextRequest, NextResponse } from "next/server";
import { locales } from "@/lib/i18n/locales";

const isLocalePath = (pathname: string) => {
  const firstPath = pathname.split("/")[1];
  return {isLocale: locales.includes(firstPath as (typeof locales)[number]), firstPath};
};

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/studio")) {
    return NextResponse.next();
  }

  const {  isLocale, firstPath } = isLocalePath(pathname);
  if (!isLocale) {
    const newPath = `/${locales[0]}${pathname}`;
    return NextResponse.rewrite(new URL(`${newPath}`, request.url));
  }

  /** order is important */

  // console.log({isLocale, firstPath})
  if (firstPath === 'en') {
    const newPath = '/' + pathname.split("/").slice(2).join("/");
    return NextResponse.redirect(new URL(`${newPath}`, request.url));
  }

  return NextResponse.next();
}

// Match all paths except for the following:
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|assets|favicon.ico|sitemap.xml|studio|robots.txt|\.well-known/appspecific/com.chrome.devtools.json).*)",
    "/",
  ],
};
