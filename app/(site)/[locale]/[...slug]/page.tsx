import { notFound } from 'next/navigation';

import SectionRenderer from '@/components/sections/SectionRenderer';

import { getSanityClient } from '@/sanity/lib/getClient';
import {
  aboutPageBuilderQuery,
  feesPageBuilderQuery,
  latestAnnouncementsQuery,
  moodlePageBuilderQuery,
  schoolSectionPageBuilderBySlugQuery,
  sectionsPageBuilderQuery,
  navHeaderBySlugQuery,
  sitePageByHeaderAndSlugQuery,
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

function localeToLang(locale: string) {
  if (locale === 'ar') return 'ar';
  if (locale === 'it') return 'it';
  return 'en';
}

export default async function CatchAllCmsPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string[] }>;
}) {
  const { locale, slug } = await params;

  if (!['ar', 'en', 'it'].includes(locale)) notFound();

  const lang = localeToLang(locale);
  const client = await getSanityClient();

  const announcements: Announcement[] = await client.fetch(
    latestAnnouncementsQuery,
    { lang },
  );

  const upcomingEvents: Announcement[] = await client.fetch(
    upcomingEventsQuery,
    {
      lang,
    },
  );

  const segments = Array.isArray(slug) ? slug : [];
  const first = segments[0] ?? '';

  // Explicit top-level routes that are driven by dedicated singleton docs
  if (segments.length === 1 && first === 'about') {
    const page = await client.fetch<BuilderPage | null>(aboutPageBuilderQuery, {
      id: `aboutPage-${lang}`,
    });

    return (
      <SectionRenderer
        locale={locale}
        sections={page?.sections || []}
        announcements={announcements}
        upcomingEvents={upcomingEvents}
      />
    );
  }

  if (segments.length === 1 && first === 'fees') {
    const page = await client.fetch<BuilderPage | null>(feesPageBuilderQuery, {
      id: `feesPage-${lang}`,
    });

    return (
      <SectionRenderer
        locale={locale}
        sections={page?.sections || []}
        announcements={announcements}
        upcomingEvents={upcomingEvents}
      />
    );
  }

  if (segments.length === 1 && first === 'moodle') {
    const page = await client.fetch<BuilderPage | null>(
      moodlePageBuilderQuery,
      {
        id: `moodlePage-${lang}`,
      },
    );

    return (
      <SectionRenderer
        locale={locale}
        sections={page?.sections || []}
        announcements={announcements}
        upcomingEvents={upcomingEvents}
      />
    );
  }

  // Sections index + section detail pages
  if (first === 'sections') {
    if (segments.length === 1) {
      const page = await client.fetch<BuilderPage | null>(
        sectionsPageBuilderQuery,
        { id: `sectionsPage-${lang}` },
      );

      return (
        <SectionRenderer
          locale={locale}
          sections={page?.sections || []}
          announcements={announcements}
          upcomingEvents={upcomingEvents}
        />
      );
    }

    if (segments.length === 2) {
      const page = await client.fetch<BuilderPage | null>(
        schoolSectionPageBuilderBySlugQuery,
        { slug: segments[1], lang },
      );

      if (!page) notFound();

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

  // Header pages (landing + child pages)
  if (segments.length === 1) {
    const headerPage = await client.fetch<BuilderPage | null>(
      navHeaderBySlugQuery,
      {
        slug: first,
        lang,
      },
    );

    if (headerPage) {
      return (
        <SectionRenderer
          locale={locale}
          sections={headerPage.sections || []}
          announcements={announcements}
          upcomingEvents={upcomingEvents}
          pageTitle={headerPage.title}
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

  // Legacy fallback (older docs that stored nested paths like "foo/bar" in slug.current)
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
