'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

export type EventListItem = {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  eventDate?: string;
  endDate?: string;
  location?: string;
  mainImageUrl?: string;
  mainImageAlt?: string;
  photoCount?: number;
  videoCount?: number;
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

export default function EventsList({
  locale,
  events,
}: {
  locale: string;
  events: EventListItem[];
}) {
  const [q, setQ] = useState('');

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return events;

    return events.filter((e) => {
      const haystack = [e.title, e.description, e.location]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return haystack.includes(query);
    });
  }, [events, q]);

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-border bg-white p-4">
        <label className="block text-sm font-semibold">
          {locale === 'ar' ? 'بحث' : locale === 'it' ? 'Cerca' : 'Search'}
        </label>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={
            locale === 'ar'
              ? 'ابحث بالعنوان أو الوصف أو الموقع...'
              : locale === 'it'
                ? 'Cerca per titolo, descrizione o luogo...'
                : 'Search by title, description, or location...'
          }
          className="mt-2 w-full rounded-xl border border-border px-4 py-3 text-sm outline-none focus:ring-2"
        />
        {q.trim() ? (
          <p className="mt-2 text-xs text-muted">
            {locale === 'ar'
              ? `النتائج: ${filtered.length}`
              : locale === 'it'
                ? `Risultati: ${filtered.length}`
                : `Results: ${filtered.length}`}
          </p>
        ) : null}
      </div>

      {filtered.length === 0 ? (
        <p className="text-muted">
          {locale === 'ar'
            ? 'لا توجد نتائج.'
            : locale === 'it'
              ? 'Nessun risultato.'
              : 'No results.'}
        </p>
      ) : (
        <ul className="grid gap-4 list-none p-0">
          {filtered.map((event) => (
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

                {typeof event.photoCount === 'number' ||
                typeof event.videoCount === 'number' ? (
                  <div className="mt-2 text-xs text-muted">
                    {(event.photoCount ?? 0).toString()}{' '}
                    {locale === 'ar'
                      ? 'صور'
                      : locale === 'it'
                        ? 'foto'
                        : 'photos'}
                    {' • '}
                    {(event.videoCount ?? 0).toString()}{' '}
                    {locale === 'ar'
                      ? 'فيديو'
                      : locale === 'it'
                        ? 'video'
                        : 'videos'}
                  </div>
                ) : null}

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
    </div>
  );
}
