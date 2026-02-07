import { notFound } from 'next/navigation';

import { locales, type Locale } from '@/i18n/config';

import SectionRenderer from '@/components/sections/SectionRenderer';

import { getSanityClient } from '@/sanity/lib/getClient';
import {
  homePageQuery,
  latestAnnouncementsQuery,
  upcomingEventsQuery,
  upcomingEventsBySectionIdQuery,
  latestEventsQuery,
  latestEventsBySectionIdQuery,
} from '@/sanity/lib/queries';

type HomePageDoc = {
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

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) notFound();

  const lang = locale as Locale;
  const client = await getSanityClient();

  const [home, announcements] = await Promise.all([
    client.fetch<HomePageDoc | null>(homePageQuery, { lang }),
    client.fetch<Announcement[]>(latestAnnouncementsQuery, { lang }),
  ]);

  if (!home) notFound();

  // Section-aware event lists (optional per block)
  const sections = home.sections || [];
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
      const limit =
        typeof s.limit === 'number' && s.limit > 0 ? s.limit : 6;

      if (s.sectionId) {
        const prev = latestSectionIdToLimit.get(String(s.sectionId)) ?? 0;
        latestSectionIdToLimit.set(String(s.sectionId), Math.max(prev, limit));
      } else {
        needsGlobalLatest = true;
        globalLatestLimit = Math.max(globalLatestLimit, limit);
      }
    }
  }

  const [upcomingEvents, latestEvents, upcomingEventsBySectionId, latestEventsBySectionId] =
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
        return Object.fromEntries(entries);
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
        return Object.fromEntries(entries);
      })(),
    ]);

  return (
    <SectionRenderer
      locale={locale}
      sections={sections}
      announcements={announcements}
      upcomingEvents={upcomingEvents}
      upcomingEventsBySectionId={upcomingEventsBySectionId}
      latestEvents={latestEvents}
      latestEventsBySectionId={latestEventsBySectionId}
    />
  );
}
