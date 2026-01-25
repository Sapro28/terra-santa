import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n/config';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const intl = createMiddleware({ locales, defaultLocale });

export const proxy = (request: NextRequest) => {
  const pathname = request.nextUrl.pathname;

  if (pathname === '/studio' || pathname.startsWith('/studio/')) {
    return NextResponse.next();
  }

  for (const locale of locales) {
    const prefixedStudio = `/${locale}/studio`;
    if (
      pathname === prefixedStudio ||
      pathname.startsWith(`${prefixedStudio}/`)
    ) {
      const url = request.nextUrl.clone();
      url.pathname = pathname.replace(prefixedStudio, '/studio');
      return NextResponse.redirect(url);
    }
  }

  const first = pathname.split('/')[1];
  const looksLikeLocale = first?.length === 2;

  if (looksLikeLocale && first && !locales.includes(first as any)) {
    const rest = pathname.slice(1 + first.length);

    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}${rest || ''}`;
    return NextResponse.redirect(url);
  }

  return intl(request);
};

export const config = {
  matcher: ['/((?!api|_next|studio|.*\\..*).*)'],
};
