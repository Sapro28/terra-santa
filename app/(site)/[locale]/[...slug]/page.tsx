import { notFound } from 'next/navigation';

import { locales, type Locale } from '@/i18n/config';

import SectionRenderer from '@/components/sections/SectionRenderer';

import { getSanityClient } from '@/sanity/lib/getClient';
import {
  latestAnnouncementsQuery,
  pageBySlugQuery,
  legacySitePageBySlugQuery,
  upcomingEventsQuery,
  upcomingEventsBySectionIdQuery,
  latestEventsQuery,
  latestEventsBySectionIdQuery,
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
  const announcements = await client.fetch<Announcement[]>(
    latestAnnouncementsQuery,
    { lang },
  );

  const segments = Array.isArray(slug) ? slug : [];
  const slugPath = segments.join('/');

  if (segments.length === 1) {
    const page = await client.fetch<BuilderPage | null>(pageBySlugQuery, {
      slug: segments[0],
      lang,
    });

    if (page) {
      const { upcoming, upcomingBySectionId, latest, latestBySectionId } =
        await fetchEventListsForPage({
          client,
          lang,
          sections: page.sections || [],
        });

      return (
        <SectionRenderer
          locale={locale}
          sections={page.sections || []}
          announcements={announcements}
          upcomingEvents={upcoming}
          upcomingEventsBySectionId={upcomingBySectionId}
          latestEvents={latest}
          latestEventsBySectionId={latestBySectionId}
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

  const { upcoming, upcomingBySectionId, latest, latestBySectionId } =
    await fetchEventListsForPage({
      client,
      lang,
      sections: legacyPage.sections || [],
    });

  return (
    <SectionRenderer
      locale={locale}
      sections={legacyPage.sections || []}
      announcements={announcements}
      upcomingEvents={upcoming}
      upcomingEventsBySectionId={upcomingBySectionId}
      latestEvents={latest}
      latestEventsBySectionId={latestBySectionId}
      pageTitle={legacyPage.title}
    />
  );
}

async function fetchEventListsForPage({
  client,
  lang,
  sections,
}: {
  client: any;
  lang: Locale;
  sections: Array<{ _type: string; [key: string]: any }>;
}) {
  const upcomingSectionIds = new Set<string>();
  const latestSectionIdToLimit = new Map<string, number>();
  let needsGlobalUpcoming = false;
  let needsGlobalLatest = false;
  let globalLatestLimit = 0;

  for (const s of sections) {
    if (s?._type === 'sectionUpcomingEvents') {
      if (s.sectionId) upcomingSectionIds.add(String(s.sectionId));
      else needsGlobalUpcoming = true;
    }

    if (s?._type === 'sectionLatestEvents') {
      const limit = typeof s.limit === 'number' && s.limit > 0 ? s.limit : 6;

      if (s.sectionId) {
        const prev = latestSectionIdToLimit.get(String(s.sectionId)) ?? 0;
        latestSectionIdToLimit.set(String(s.sectionId), Math.max(prev, limit));
      } else {
        needsGlobalLatest = true;
        globalLatestLimit = Math.max(globalLatestLimit, limit);
      }
    }
  }

  const [upcoming, latest, upcomingBySectionId, latestBySectionId] =
    await Promise.all([
      needsGlobalUpcoming
        ? client.fetch<Announcement[]>(upcomingEventsQuery, { lang })
        : Promise.resolve([]),
      needsGlobalLatest
        ? client.fetch<Announcement[]>(latestEventsQuery, {
            lang,
            limit: Math.max(globalLatestLimit, 1),
          })
        : Promise.resolve([]),
      (async () => {
        const entries = await Promise.all(
          [...upcomingSectionIds].map(async (sectionId) => {
            const items = await client.fetch<Announcement[]>(
              upcomingEventsBySectionIdQuery,
              { lang, sectionId },
            );
            return [sectionId, items] as const;
          }),
        );
        return Object.fromEntries(entries) as Record<string, Announcement[]>;
      })(),
      (async () => {
        const entries = await Promise.all(
          [...latestSectionIdToLimit.entries()].map(async ([sectionId, limit]) => {
            const items = await client.fetch<Announcement[]>(
              latestEventsBySectionIdQuery,
              { lang, sectionId, limit },
            );
            return [sectionId, items] as const;
          }),
        );
        return Object.fromEntries(entries) as Record<string, Announcement[]>;
      })(),
    ]);

  return { upcoming, upcomingBySectionId, latest, latestBySectionId };
}
