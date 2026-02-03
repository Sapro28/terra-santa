import { notFound } from 'next/navigation';

import { locales, type Locale } from '@/i18n/config';
import { getSanityClient } from '@/sanity/lib/getClient';
import { galleryEntryBySlugQuery } from '@/sanity/lib/queries/gallery';
import { PortableText } from '@portabletext/react';

type GalleryEntry = {
  title: string;
  date?: string;
  location?: string;
  body?: any;
  coverImageUrl?: string;
  coverImageAlt?: string;
  media?: Array<
    | {
        _type: 'photo';
        imageUrl?: string;
        alt?: string;
        caption?: string;
        capturedAt?: string;
      }
    | {
        _type: 'video';
        title?: string;
        videoUrl?: string;
        caption?: string;
        capturedAt?: string;
      }
  >;
};

function formatDate(date?: string) {
  if (!date) return '';
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString();
}

export default async function GalleryEntryPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const lang = locale as Locale;

  const client = await getSanityClient();
  const entry = await client.fetch<GalleryEntry | null>(
    galleryEntryBySlugQuery,
    { lang, slug },
  );

  if (!entry) notFound();

  return (
    <main className="mx-auto max-w-4xl space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">{entry.title}</h1>

        {entry.location || entry.date ? (
          <p className="text-sm text-muted">
            {entry.location ? entry.location : null}
            {entry.location && entry.date ? ' • ' : null}
            {entry.date ? formatDate(entry.date) : null}
          </p>
        ) : null}
      </header>

      {entry.coverImageUrl ? (
        <figure className="overflow-hidden rounded-2xl border border-border bg-white">
          <img
            src={entry.coverImageUrl}
            alt={entry.coverImageAlt ?? entry.title}
            className="h-64 w-full object-cover"
          />
        </figure>
      ) : null}

      <div className="rounded-2xl border border-border bg-white p-6 prose max-w-none">
        {entry.body ? (
          <PortableText value={entry.body} />
        ) : (
          <p>No description.</p>
        )}
      </div>

      {entry.media?.length ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {entry.media.map((item, idx) => {
            if (item._type === 'photo') {
              return (
                <figure
                  key={`photo-${idx}`}
                  className="overflow-hidden rounded-2xl border border-border bg-white"
                >
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.alt ?? entry.title}
                      className="h-56 w-full object-cover"
                      loading="lazy"
                    />
                  ) : null}
                  {item.caption ? (
                    <figcaption className="p-3 text-xs text-muted">
                      {item.caption}
                    </figcaption>
                  ) : null}
                </figure>
              );
            }

            return (
              <div
                key={`video-${idx}`}
                className="overflow-hidden rounded-2xl border border-border bg-white"
              >
                {item.videoUrl ? (
                  <video
                    controls
                    preload="metadata"
                    className="h-56 w-full object-cover"
                    src={item.videoUrl}
                  />
                ) : null}

                <div className="p-4">
                  <div className="text-sm font-semibold">
                    {item.title ?? 'Video'}
                  </div>
                  {item.caption ? (
                    <p className="mt-2 text-xs text-muted">{item.caption}</p>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-muted">No media yet.</p>
      )}
    </main>
  );
}
