'use client';

import Link from 'next/link';
import { useMemo, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

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
  sectionSlugs?: string[];
  sectionTitles?: string[];
};

type SectionOption = { title?: string; slug?: string };

type InitialFilters = {
  section: string | null;
  from: string | null;
  to: string | null;
  page: number;
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
  sections,
  initialFilters,
}: {
  locale: string;
  events: EventListItem[];
  sections: SectionOption[];
  initialFilters: InitialFilters;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [q, setQ] = useState('');
  const [section, setSection] = useState<string>(initialFilters.section ?? '');
  const [from, setFrom] = useState<string>(initialFilters.from ?? '');
  const [to, setTo] = useState<string>(initialFilters.to ?? '');
  const [page, setPage] = useState<number>(
    Math.max(1, initialFilters.page || 1),
  );

  const PAGE_SIZE = 9;

  useEffect(() => {
    const params = new URLSearchParams(searchParams?.toString());

    const normalizedSection = section.trim();
    const normalizedFrom = from.trim();
    const normalizedTo = to.trim();

    if (normalizedSection) params.set('section', normalizedSection);
    else params.delete('section');

    if (normalizedFrom) params.set('from', normalizedFrom);
    else params.delete('from');

    if (normalizedTo) params.set('to', normalizedTo);
    else params.delete('to');

    if (page > 1) params.set('page', String(page));
    else params.delete('page');

    const qs = params.toString();
    router.replace(qs ? `?${qs}` : '', { scroll: false });
  }, [section, from, to, page]);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    const normalizedSection = section.trim();

    const fromDate = from.trim() ? new Date(`${from.trim()}T00:00:00`) : null;
    const toDate = to.trim() ? new Date(`${to.trim()}T23:59:59`) : null;

    return events.filter((e) => {
      const haystack = [e.title, e.description, e.location]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      const matchesQuery = !query ? true : haystack.includes(query);
      const slugs = (e.sectionSlugs ?? []).map((s) => (s || '').trim());
      const matchesSection = normalizedSection
        ? slugs.includes(normalizedSection)
        : true;

      const d = e.eventDate ? new Date(e.eventDate) : null;
      const matchesDate = (() => {
        if (!d || Number.isNaN(d.getTime())) return true;
        if (fromDate && d < fromDate) return false;
        if (toDate && d > toDate) return false;
        return true;
      })();

      return matchesQuery && matchesSection && matchesDate;
    });
  }, [events, q, section, from, to]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(Math.max(1, page), totalPages);

  useEffect(() => {
    if (safePage !== page) setPage(safePage);
  }, [safePage]);

  const paged = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, safePage]);

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-border bg-white p-4">
        <div className="grid gap-4 md:grid-cols-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold">
              {locale === 'ar' ? 'بحث' : locale === 'it' ? 'Cerca' : 'Search'}
            </label>
            <input
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setPage(1);
              }}
              placeholder={
                locale === 'ar'
                  ? 'ابحث بالعنوان أو الوصف أو الموقع...'
                  : locale === 'it'
                    ? 'Cerca per titolo, descrizione o luogo...'
                    : 'Search by title, description, or location...'
              }
              className="mt-2 w-full rounded-xl border border-border px-4 py-3 text-sm outline-none focus:ring-2"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold">
              {locale === 'ar'
                ? 'القسم'
                : locale === 'it'
                  ? 'Sezione'
                  : 'Section'}
            </label>
            <select
              value={section}
              onChange={(e) => {
                setSection(e.target.value);
                setPage(1);
              }}
              className="mt-2 w-full rounded-xl border border-border px-4 py-3 text-sm outline-none focus:ring-2"
            >
              <option value="">
                {locale === 'ar'
                  ? 'كل الأقسام'
                  : locale === 'it'
                    ? 'Tutte le sezioni'
                    : 'All sections'}
              </option>
              {(sections ?? []).map((s) => {
                const slug = (s.slug ?? '').trim();
                if (!slug) return null;
                return (
                  <option key={slug} value={slug}>
                    {s.title ?? slug}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold">
                {locale === 'ar' ? 'من' : locale === 'it' ? 'Da' : 'From'}
              </label>
              <input
                type="date"
                value={from}
                onChange={(e) => {
                  setFrom(e.target.value);
                  setPage(1);
                }}
                className="mt-2 w-full rounded-xl border border-border px-3 py-3 text-sm outline-none focus:ring-2"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold">
                {locale === 'ar' ? 'إلى' : locale === 'it' ? 'A' : 'To'}
              </label>
              <input
                type="date"
                value={to}
                onChange={(e) => {
                  setTo(e.target.value);
                  setPage(1);
                }}
                className="mt-2 w-full rounded-xl border border-border px-3 py-3 text-sm outline-none focus:ring-2"
              />
            </div>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-muted">
            {locale === 'ar'
              ? `النتائج: ${filtered.length}`
              : locale === 'it'
                ? `Risultati: ${filtered.length}`
                : `Results: ${filtered.length}`}
          </p>

          {(q.trim() || section.trim() || from.trim() || to.trim()) && (
            <button
              type="button"
              onClick={() => {
                setQ('');
                setSection('');
                setFrom('');
                setTo('');
                setPage(1);
              }}
              className="rounded-xl border border-border bg-white px-4 py-2 text-sm font-semibold hover:bg-(--paper)"
            >
              {locale === 'ar'
                ? 'مسح الفلاتر'
                : locale === 'it'
                  ? 'Pulisci filtri'
                  : 'Clear filters'}
            </button>
          )}
        </div>
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
        <>
          <ul className="grid gap-4 list-none p-0">
            {paged.map((event) => (
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

          {totalPages > 1 ? (
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={safePage <= 1}
                className="rounded-xl border border-border bg-white px-4 py-2 text-sm font-semibold disabled:opacity-50"
              >
                {locale === 'ar'
                  ? 'السابق'
                  : locale === 'it'
                    ? 'Indietro'
                    : 'Prev'}
              </button>

              <div className="px-2 text-sm text-muted">
                {locale === 'ar'
                  ? `صفحة ${safePage} من ${totalPages}`
                  : locale === 'it'
                    ? `Pagina ${safePage} di ${totalPages}`
                    : `Page ${safePage} of ${totalPages}`}
              </div>

              <button
                type="button"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={safePage >= totalPages}
                className="rounded-xl border border-border bg-white px-4 py-2 text-sm font-semibold disabled:opacity-50"
              >
                {locale === 'ar'
                  ? 'التالي'
                  : locale === 'it'
                    ? 'Avanti'
                    : 'Next'}
              </button>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}
