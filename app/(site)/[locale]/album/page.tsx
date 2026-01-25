import { notFound } from 'next/navigation';
import { getSanityClient } from '@/sanity/lib/getClient';

import { albumBySlugQuery } from '@/sanity/lib/queries';

type Album = {
  title: string;
  description?: string;
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

function localeToLang(locale: string) {
  if (locale === 'ar') return 'ar';
  if (locale === 'it') return 'it';
  return 'en';
}

export default async function AlbumDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const lang = localeToLang(locale);

  const client = await getSanityClient();
  const album = await client.fetch<Album | null>(albumBySlugQuery, {
    lang,
    slug,
  });

  if (!album) notFound();

  return (
    <main className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">{album.title}</h1>
        {album.description ? (
          <p className="text-(--muted)">{album.description}</p>
        ) : null}
      </header>

      {album.media?.length ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {album.media.map((item, idx) => {
            if (item._type === 'photo') {
              return (
                <figure
                  key={`photo-${idx}`}
                  className="overflow-hidden rounded-2xl border border-(--border) bg-white"
                >
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.alt ?? album.title}
                      className="h-56 w-full object-cover"
                    />
                  ) : null}
                  {item.caption ? (
                    <figcaption className="p-3 text-xs text-(--muted)">
                      {item.caption}
                    </figcaption>
                  ) : null}
                </figure>
              );
            }

            return (
              <div
                key={`video-${idx}`}
                className="overflow-hidden rounded-2xl border border-(--border) bg-white"
              >
                <div className="p-4">
                  <div className="text-sm font-semibold">
                    {item.title ?? 'Video'}
                  </div>
                  {item.videoUrl ? (
                    <a
                      className="mt-2 inline-block text-sm underline"
                      href={item.videoUrl}
                      target="_blank"
                    >
                      Open video
                    </a>
                  ) : (
                    <p className="mt-2 text-sm text-(--muted)">No video URL.</p>
                  )}
                  {item.caption ? (
                    <p className="mt-3 text-xs text-(--muted)">
                      {item.caption}
                    </p>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-(--muted)">No media yet.</p>
      )}
    </main>
  );
}
