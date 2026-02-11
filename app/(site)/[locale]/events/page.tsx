import { notFound } from 'next/navigation';
import { unstable_noStore as noStore } from 'next/cache';

import { locales, type Locale } from '@/i18n/config';
import { getSanityClient } from '@/sanity/lib/getClient';
import {
  eventsListQuery,
  eventsPageByLanguageQuery,
  schoolSectionsListQuery,
} from '@/sanity/lib/queries';
import EventsList, { type EventListItem } from '@/components/EventsList.client';

export default async function EventsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<{
    section?: string;
    from?: string;
    to?: string;
    page?: string;
  }>;
}) {
  noStore();

  const { locale } = await params;

  if (!locales.includes(locale as Locale)) notFound();

  const lang = locale as Locale;
  const client = await getSanityClient();

  const sp = (await searchParams) || {};

  const [events, sections, eventsPage] = await Promise.all([
    client.fetch<EventListItem[]>(eventsListQuery, { lang }),
    client.fetch<Array<{ title?: string; slug?: string }>>(
      schoolSectionsListQuery,
    ),
    client.fetch<{ title?: string; slug?: string } | null>(
      eventsPageByLanguageQuery,
      {
        lang,
      },
    ),
  ]);

  return (
    <main className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          {eventsPage?.title ??
            (lang === 'ar' ? 'الفعاليات' : lang === 'it' ? 'Eventi' : 'Events')}
        </h1>
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
        <EventsList
          locale={locale}
          events={events}
          sections={sections}
          initialFilters={{
            section: (sp.section || '').toString().trim() || null,
            from: (sp.from || '').toString().trim() || null,
            to: (sp.to || '').toString().trim() || null,
            page: Number.parseInt((sp.page || '1').toString(), 10) || 1,
          }}
        />
      )}
    </main>
  );
}
