import { notFound } from 'next/navigation';
import { unstable_noStore as noStore } from 'next/cache';

import { locales, type Locale } from '@/i18n/config';

import HomeDivisionsSection from '@/components/home/HomeDivisionsSection';
import OurCampusSection from '@/components/home/OurCampusSection.client';
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
  divisions?: any;
  ourCampus?: any;
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
  noStore();
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) notFound();

  const lang = locale as Locale;
  const client = await getSanityClient();

  const [home, announcements] = await Promise.all([
    client.fetch<HomePageDoc | null>(homePageQuery, { lang }),
    client.fetch<Announcement[]>(latestAnnouncementsQuery, { lang }),
  ]);

  if (!home) notFound();

  const rawSections = home.sections || [];
  const sections = rawSections.filter(
    (s) => s?._type !== 'sectionColors' && s?._type !== 'sectionDivisions',
  );
  const heroIdx = sections.findIndex((s) => s?._type === 'sectionVideoHero');
  const heroGroup: typeof sections = [];
  const usedIdx = new Set<number>();

  if (heroIdx >= 0) {
    heroGroup.push(sections[heroIdx]);
    usedIdx.add(heroIdx);

    for (let j = heroIdx + 1; j < sections.length; j++) {
      const t = sections[j]?._type;
      if (t === 'sectionArrowDivider') {
        heroGroup.push(sections[j]);
        usedIdx.add(j);
        continue;
      }
      break;
    }
  }

  const restSections =
    heroIdx >= 0 ? sections.filter((_, i) => !usedIdx.has(i)) : sections;

  const upcomingSectionIds = new Set<string>();
  const latestSectionIdToLimit = new Map<string, number>();
  let needsGlobalUpcoming = false;
  let needsGlobalLatest = false;
  let globalLatestLimit = 0;

  for (const s of restSections) {
    if (s?._type === 'sectionUpcomingEvents') {
      if ((s as any).sectionId)
        upcomingSectionIds.add(String((s as any).sectionId));
      else needsGlobalUpcoming = true;
    }

    if (s?._type === 'sectionLatestEvents') {
      const limit =
        typeof (s as any).limit === 'number' && (s as any).limit > 0
          ? (s as any).limit
          : 6;

      if ((s as any).sectionId) {
        const prev =
          latestSectionIdToLimit.get(String((s as any).sectionId)) ?? 0;
        latestSectionIdToLimit.set(
          String((s as any).sectionId),
          Math.max(prev, limit),
        );
      } else {
        needsGlobalLatest = true;
        globalLatestLimit = Math.max(globalLatestLimit, limit);
      }
    }
  }

  const [
    upcomingEvents,
    latestEvents,
    upcomingEventsBySectionId,
    latestEventsBySectionId,
  ] = await Promise.all([
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
        [...latestSectionIdToLimit.entries()].map(
          async ([sectionId, limit]) => {
            const items = await client.fetch<Announcement[]>(
              latestEventsBySectionIdQuery,
              { lang, sectionId, limit },
            );
            return [sectionId, items] as const;
          },
        ),
      );
      return Object.fromEntries(entries);
    })(),
  ]);

  return (
    <>
      <SectionRenderer
        locale={locale}
        sections={heroGroup}
        announcements={announcements}
        upcomingEvents={upcomingEvents}
        upcomingEventsBySectionId={upcomingEventsBySectionId}
        latestEvents={latestEvents}
        latestEventsBySectionId={latestEventsBySectionId}
      />

      <HomeDivisionsSection locale={locale} data={home.divisions} />
      <OurCampusSection locale={locale} data={home.ourCampus} />

      <SectionRenderer
        locale={locale}
        sections={restSections}
        announcements={announcements}
        upcomingEvents={upcomingEvents}
        upcomingEventsBySectionId={upcomingEventsBySectionId}
        latestEvents={latestEvents}
        latestEventsBySectionId={latestEventsBySectionId}
      />
    </>
  );
}
