import { notFound } from 'next/navigation';

import { locales, type Locale } from '@/i18n/config';
import { getSanityClient } from '@/sanity/lib/getClient';
import {
  eventsListQuery,
  eventsListBySectionSlugQuery,
  schoolSectionTitleBySlugQuery,
} from '@/sanity/lib/queries';
import EventsList, { type EventListItem } from '@/components/EventsList.client';

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
        <h1 className="text-3xl font-bold">
          {lang === 'ar' ? 'الفعاليات' : lang === 'it' ? 'Eventi' : 'Events'}
        </h1>
        {sectionInfo?.title ? (
          <p className="mt-2 text-sm text-muted">
            {lang === 'ar'
              ? 'تمت التصفية حسب القسم:'
              : lang === 'it'
                ? 'Filtrato per sezione:'
                : 'Filtered by section:'}{' '}
            <span className="font-semibold">{sectionInfo.title}</span>
          </p>
        ) : null}
      </div>

      {events.length === 0 ? (
        <p className="text-muted">
          {lang === 'ar'
            ? 'لا توجد فعاليات بعد.'
            : lang === 'it'
              ? 'Nessun evento ancora.'
              : 'No events yet.'}
        </p>
      ) : (
        <EventsList locale={locale} events={events} />
      )}
    </main>
  );
}
