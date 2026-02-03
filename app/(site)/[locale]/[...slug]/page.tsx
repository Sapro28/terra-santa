import { notFound } from 'next/navigation';

import { locales, type Locale } from '@/i18n/config';

import SectionRenderer from '@/components/sections/SectionRenderer';

import { getSanityClient } from '@/sanity/lib/getClient';
import {
  latestAnnouncementsQuery,
  navHeaderBySlugQuery,
  firstSitePageByHeaderQuery,
  sitePageByHeaderAndSlugQuery,
  legacySitePageBySlugQuery,
  upcomingEventsQuery,
} from '@/sanity/lib/queries';

type BuilderPage = {
  title?: string;
  slug?: string;
  sections?: Array<{ _type: string; [key: string]: any }>;
};

type NavHeader = {
  title?: string;
  slug?: string;
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
  const first = segments[0] ?? '';

  if (segments.length === 1) {
    const header = await client.fetch<NavHeader | null>(navHeaderBySlugQuery, {
      slug: first,
      lang,
    });

    if (header) {
      const firstChildPage = await client.fetch<BuilderPage | null>(
        firstSitePageByHeaderQuery,
        { headerSlug: first, lang },
      );

      if (!firstChildPage) notFound();

      return (
        <SectionRenderer
          locale={locale}
          sections={firstChildPage.sections || []}
          announcements={announcements}
          upcomingEvents={upcomingEvents}
          pageTitle={firstChildPage.title || header.title}
        />
      );
    }
  }

  if (segments.length === 2) {
    const page = await client.fetch<BuilderPage | null>(
      sitePageByHeaderAndSlugQuery,
      {
        headerSlug: segments[0],
        slug: segments[1],
        lang,
      },
    );

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

  const slugPath = segments.join('/');
  const legacyPage = await client.fetch<BuilderPage | null>(
    legacySitePageBySlugQuery,
    {
      slug: slugPath,
      lang,
    },
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
