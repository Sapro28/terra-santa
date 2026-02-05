import { notFound } from 'next/navigation';

import { locales, type Locale } from '@/i18n/config';

import SectionRenderer from '@/components/sections/SectionRenderer';

import { getSanityClient } from '@/sanity/lib/getClient';
import {
  latestAnnouncementsQuery,
  pageBySlugQuery,
  legacySitePageBySlugQuery,
  upcomingEventsQuery,
} from '@/sanity/lib/queries';

type BuilderPage = {
  title?: string;
  slug?: string;
  sections?: Array<{ _type: string; [key: string]: any }>;
};

type Announcement = {
  _id: string;
  title?: string;
  excerpt?: string;
  publishedAt?: string;
  urgent?: boolean;
  slug?: string;
  mainImageUrl?: string;
  mainImageAlt?: string;
};

export default async function CatchAllCmsPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string[] }>;
}) {
  const { locale, slug } = await params;

  if (!locales.includes(locale as Locale)) notFound();

  const lang = locale as Locale;
  const client = await getSanityClient();

  const [announcements, upcomingEvents] = await Promise.all([
    client.fetch<Announcement[]>(latestAnnouncementsQuery, { lang }),
    client.fetch<Announcement[]>(upcomingEventsQuery, { lang }),
  ]);

  const segments = Array.isArray(slug) ? slug : [];
  const slugPath = segments.join('/');

  if (segments.length === 1) {
    const page = await client.fetch<BuilderPage | null>(pageBySlugQuery, {
      slug: segments[0],
      lang,
    });

    if (page) {
      return (
        <SectionRenderer
          locale={locale}
          sections={page.sections || []}
          announcements={announcements}
          upcomingEvents={upcomingEvents}
          pageTitle={page.title}
        />
      );
    }
  }

  const legacyPage = await client.fetch<BuilderPage | null>(
    legacySitePageBySlugQuery,
    { slug: slugPath, lang },
  );

  if (!legacyPage) notFound();

  return (
    <SectionRenderer
      locale={locale}
      sections={legacyPage.sections || []}
      announcements={announcements}
      upcomingEvents={upcomingEvents}
      pageTitle={legacyPage.title}
    />
  );
}
