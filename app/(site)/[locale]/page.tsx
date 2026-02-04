import { notFound } from 'next/navigation';

import { locales, type Locale } from '@/i18n/config';

import SectionRenderer from '@/components/sections/SectionRenderer';

import { getSanityClient } from '@/sanity/lib/getClient';
import {
  homePageQuery,
  latestAnnouncementsQuery,
  upcomingEventsQuery,
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

  const [home, announcements, upcomingEvents] = await Promise.all([
    client.fetch<HomePageDoc | null>(homePageQuery, { lang }),
    client.fetch<Announcement[]>(latestAnnouncementsQuery, { lang }),
    client.fetch<Announcement[]>(upcomingEventsQuery, { lang }),
  ]);

  if (!home) notFound();

  return (
    <SectionRenderer
      locale={locale}
      sections={home.sections || []}
      announcements={announcements}
      upcomingEvents={upcomingEvents}
    />
  );
}
