import Link from 'next/link';
import { notFound } from 'next/navigation';

import { locales, type Locale } from '@/i18n/config';
import { getSanityClient } from '@/sanity/lib/getClient';
import {
  eventsListQuery,
  eventsListBySectionSlugQuery,
  schoolSectionTitleBySlugQuery,
} from '@/sanity/lib/queries';

type EventListItem = {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  eventDate?: string;
  endDate?: string;
  location?: string;
  mainImageUrl?: string;
  mainImageAlt?: string;
};

function formatDateTime(value?: string, locale?: string) {
  if (!value) return '';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleString(locale === 'ar' ? 'ar-EG' : locale || 'en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default async function EventsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<{ section?: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) notFound();

  const lang = locale as Locale;
  const client = await getSanityClient();

  const sp = (await searchParams) || {};
  const sectionSlug = (sp.section || '').toString().trim();

  const [events, sectionInfo] = await Promise.all([
    sectionSlug
      ? client.fetch<EventListItem[]>(eventsListBySectionSlugQuery, {
          lang,
          sectionSlug,
        })
      : client.fetch<EventListItem[]>(eventsListQuery, { lang }),
    sectionSlug
      ? client.fetch<{ title?: string; slug?: string } | null>(
          schoolSectionTitleBySlugQuery,
          { sectionSlug },
        )
      : Promise.resolve(null),
  ]);

  return (
    <main className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Events</h1>
        {sectionInfo?.title ? (
          <p className="mt-2 text-sm text-muted">
            Filtered by section: <span className="font-semibold">{sectionInfo.title}</span>
          </p>
        ) : null}
      </div>

      {events.length === 0 ? (
        <p className="text-muted">No events yet.</p>
      ) : (
        <ul className="grid gap-4 list-none p-0">
          {events.map((event) => (
            <li
              key={event._id}
              className="overflow-hidden rounded-2xl border border-border bg-white"
            >
              {event.mainImageUrl ? (
                <div className="h-44 w-full overflow-hidden bg-(--paper)">
                  <img
                    src={event.mainImageUrl}
                    alt={event.mainImageAlt ?? event.title}
                    className="h-44 w-full object-cover"
                    loading="lazy"
                  />
                </div>
              ) : null}

              <div className="p-5">
                <Link
                  href={`/${locale}/events/${encodeURIComponent(event.slug)}`}
                  className="text-lg font-semibold hover:underline"
                >
                  {event.title}
                </Link>

                {(event.eventDate || event.location) && (
                  <div className="mt-2 text-sm text-muted">
                    {event.eventDate
                      ? `📅 ${formatDateTime(event.eventDate, locale)}`
                      : null}
                    {event.eventDate && event.location ? ' • ' : null}
                    {event.location ? `📍 ${event.location}` : null}
                  </div>
                )}

                {event.description ? (
                  <p className="mt-3 text-sm text-muted line-clamp-3">
                    {event.description}
                  </p>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
