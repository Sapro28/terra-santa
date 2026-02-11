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
import DraftModeIndicator from '@/components/DraftModeIndicator';

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
  const isDraftMode = dm.isEnabled;

  console.log('=== LAYOUT RENDER ===');
  console.log('Draft Mode Enabled:', isDraftMode);
  console.log('Locale:', locale);

  if (isDraftMode) noStore();

  const client = await getSanityClient();

  console.log(
    'Using client:',
    isDraftMode ? 'PREVIEW CLIENT' : 'PUBLISHED CLIENT',
  );

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
        <main className="pt-(--site-header-height)">{children}</main>
        <Footer settings={siteSettings} />

        <AnnouncementsPopup announcement={popupAnnouncement} locale={locale} />

        {process.env.NODE_ENV === 'development' && <DraftModeIndicator />}

        {isDraftMode ? (
          <>
            <SanityLive />
            <VisualEditingComponent />
          </>
        ) : null}
      </div>
    </NextIntlClientProvider>
  );
}
