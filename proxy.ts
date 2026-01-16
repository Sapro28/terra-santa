import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n/config';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const intl = createMiddleware({ locales, defaultLocale });

export const proxy = (request: NextRequest) => {
  const pathname = request.nextUrl.pathname;
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
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
