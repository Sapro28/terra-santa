import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale, getMessages } from 'next-intl/server';

import { draftMode } from 'next/headers';
import { unstable_noStore as noStore } from 'next/cache';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

import { siteSettingsQuery } from '@/sanity/lib/queries';
import { sanityFetch } from '@/sanity/lib/live';

const locales = ['ar', 'en', 'it'] as const;
type Locale = (typeof locales)[number];

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) notFound();
  setRequestLocale(locale);

  const dm = await draftMode();
  if (dm.isEnabled) noStore();

  const messages = await getMessages();

  const { data: siteSettings } = await sanityFetch({
    query: siteSettingsQuery,
    params: { lang: locale },
  });

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
        <Header locale={locale} settings={siteSettings} />
        <main>{children}</main>
        <Footer settings={siteSettings} />
      </div>
    </NextIntlClientProvider>
  );
}
