import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale, getMessages } from 'next-intl/server';

import { draftMode } from 'next/headers';
import { unstable_noStore as noStore } from 'next/cache';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnnouncementsPopup from '@/components/AnnouncementsPopup';

import {
  headerNavQuery,
  popupAnnouncementQuery,
  siteSettingsQuery,
} from '@/sanity/lib/queries';
import { SanityLive } from '@/sanity/lib/live';
import { getSanityClient } from '@/sanity/lib/getClient';
import VisualEditingComponent from '@/app/VisualEditing';

import { locales, type Locale } from '@/i18n/config';

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

  // Always fetch through the same client selection logic (draft vs published)
  // to avoid situations where parts of the page are in preview while others
  // are still using the published/CDN client.
  const client = await getSanityClient();

  const messages = await getMessages();
  const siteSettings = await client.fetch(siteSettingsQuery, {
    id: `siteSettings-${locale}`,
  });

  const headerNav = await client.fetch(headerNavQuery, { lang: locale });

  const popupAnnouncement = await client.fetch(popupAnnouncementQuery, {
    lang: locale,
  });

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
        <Header locale={locale} settings={siteSettings} headerNav={headerNav} />
        <main>{children}</main>
        <Footer settings={siteSettings} />

        <AnnouncementsPopup announcement={popupAnnouncement} locale={locale} />

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
