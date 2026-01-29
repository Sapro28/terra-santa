import { getSanityClient } from '@/sanity/lib/getClient';
import {
  homePageBuilderQuery,
  latestAnnouncementsQuery,
  popupAnnouncementQuery,
} from '@/sanity/lib/queries';

import AnnouncementsPopup, {
  type PopupAnnouncement,
} from '@/components/AnnouncementsPopup';

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

function isPopupAnnouncement(a: any): a is PopupAnnouncement {
  return (
    typeof a?._id === 'string' &&
    typeof a?.title === 'string' &&
    a.title.length > 0 &&
    typeof a?.slug === 'string' &&
    a.slug.length > 0
  );
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const lang = locale;
  const client = await getSanityClient();

  const page: BuilderPage | null = await client.fetch(homePageBuilderQuery, {
    id: `homePage-${lang}`,
  });

  const POPUP_LOCALES = ['ar'];
  const shouldShowPopup = POPUP_LOCALES.includes(locale);

  const announcements: Announcement[] = await client.fetch(
    latestAnnouncementsQuery,
    { lang },
  );

  const popupAnnouncement: PopupAnnouncement | null = shouldShowPopup
    ? await client.fetch(popupAnnouncementQuery, { lang })
    : null;

  return (
    <>
      {shouldShowPopup &&
      popupAnnouncement &&
      isPopupAnnouncement(popupAnnouncement) ? (
        <AnnouncementsPopup locale={locale} announcement={popupAnnouncement} />
      ) : null}

      <SectionRenderer
        locale={locale}
        sections={page?.sections || []}
        announcements={announcements}
      />
    </>
  );
}
