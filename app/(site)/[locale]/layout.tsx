import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale, getMessages } from 'next-intl/server';

import { draftMode } from 'next/headers';
import { unstable_noStore as noStore } from 'next/cache';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

import {
  headerNavQuery,
  siteSettingsQuery,
  schoolSectionPagesNavQuery,
} from '@/sanity/lib/queries';
import { sanityFetch, SanityLive } from '@/sanity/lib/live';
import { sanityClient } from '@/sanity/lib/client';
import VisualEditingComponent from '@/app/VisualEditing';

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
  const siteSettings = dm.isEnabled
    ? (
        await sanityFetch({
          query: siteSettingsQuery,
          params: { id: `siteSettings-${locale}` },
        })
      ).data
    : await sanityClient.fetch(siteSettingsQuery, {
        id: `siteSettings-${locale}`,
      });

  const headerNav = dm.isEnabled
    ? (
        await sanityFetch({
          query: headerNavQuery,
          params: { lang: locale },
        })
      ).data
    : await sanityClient.fetch(headerNavQuery, { lang: locale });

  const sectionPages = dm.isEnabled
    ? (
        await sanityFetch({
          query: schoolSectionPagesNavQuery,
          params: { lang: locale },
        })
      ).data
    : await sanityClient.fetch(schoolSectionPagesNavQuery, { lang: locale });

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
        <Header
          locale={locale}
          settings={siteSettings}
          headerNav={headerNav}
          sectionPages={sectionPages}
        />
        <main>{children}</main>
        <Footer settings={siteSettings} />

        {dm.isEnabled ? (
          <>
            <SanityLive />
            <VisualEditingComponent />
          </>
        ) : null}
      </div>
    </NextIntlClientProvider>
  );
}
