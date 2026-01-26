import { getSanityClient } from '@/sanity/lib/getClient';

import {
  homePageBuilderQuery,
  latestAnnouncementsQuery,
} from '@/sanity/lib/queries';

import AnnouncementsPopup from '@/components/AnnouncementsPopup';
import SectionRenderer from '@/components/sections/SectionRenderer';

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

type BuilderPage = {
  sections?: Array<{ _type: string; [key: string]: any }>;
};

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const lang = locale;
  const client = await getSanityClient();

  const page: BuilderPage | null = await client.fetch(homePageBuilderQuery, {
    lang,
  });

  const POPUP_LOCALES = ['ar'];
  const shouldShowPopup = POPUP_LOCALES.includes(locale);

  const announcements: Announcement[] = shouldShowPopup
    ? await client.fetch(latestAnnouncementsQuery, { lang })
    : [];

  const popupAnnouncement =
    announcements.find((a) => a.urgent && a.title && a.slug) ??
    announcements.find((a) => a.title && a.slug) ??
    null;

  return (
    <>
      <AnnouncementsPopup
        locale={locale}
        announcement={
          shouldShowPopup && popupAnnouncement
            ? {
                _id: popupAnnouncement._id,
                title: popupAnnouncement.title!,
                slug: popupAnnouncement.slug!,
                excerpt: popupAnnouncement.excerpt,
                publishedAt: popupAnnouncement.publishedAt,
                urgent: popupAnnouncement.urgent,
                mainImageUrl: popupAnnouncement.mainImageUrl,
                mainImageAlt: popupAnnouncement.mainImageAlt,
              }
            : null
        }
      />

      <SectionRenderer
        locale={locale}
        sections={page?.sections ?? []}
        announcements={announcements}
      />
    </>
  );
}
