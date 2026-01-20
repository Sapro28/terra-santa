import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { sanityClient } from '@/sanity/lib/client';
import { galleryMediaItemsQuery } from '@/sanity/lib/queries';

type MediaItem = {
  _id: string;
  title?: string;
  mediaType: 'photo' | 'video';
  capturedAt?: string;
  eventTitle?: string;
  eventDate?: string;
  photoUrl?: string;
  photoAlt?: string;
  videoUrl?: string;
};

export default async function GalleryPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<{ type?: string }>;
}) {
  const { locale } = await params;
  const sp = (await searchParams) ?? {};
  const t = await getTranslations({ locale, namespace: 'Gallery' });

  const activeType: 'photo' | 'video' = sp.type === 'video' ? 'video' : 'photo';

  const items = await sanityClient.fetch<MediaItem[]>(galleryMediaItemsQuery, {
    mediaType: activeType,
  });

  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold">{t('title')}</h1>
        <p className="max-w-3xl text-(--muted)">{t('subtitle')}</p>
      </header>

      {/* Toggle */}
      <div className="flex gap-2">
        <Link
          href={`/${locale}/gallery?type=photo`}
          className={`rounded-xl border px-4 py-2 text-sm font-semibold ${
            activeType === 'photo'
              ? 'bg-(--accent) text-white border-(--accent)'
              : 'bg-white border-(--border)'
          }`}
        >
          Photos
        </Link>

        <Link
          href={`/${locale}/gallery?type=video`}
          className={`rounded-xl border px-4 py-2 text-sm font-semibold ${
            activeType === 'video'
              ? 'bg-(--accent) text-white border-(--accent)'
              : 'bg-white border-(--border)'
          }`}
        >
          Videos
        </Link>
      </div>

      {/* Content */}
      {items.length === 0 ? (
        <div className="rounded-2xl border border-(--border) bg-white p-6 text-sm text-(--muted)">
          No {activeType === 'photo' ? 'photos' : 'videos'} yet.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => (
            <div
              key={it._id}
              className="overflow-hidden rounded-2xl border border-(--border) bg-white"
            >
              <div className="aspect-4/3 bg-(--paper)">
                {activeType === 'photo' && it.photoUrl ? (
                  <img
                    src={it.photoUrl}
                    alt={it.photoAlt || it.title || 'Photo'}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                ) : null}

                {activeType === 'video' && it.videoUrl ? (
                  <video
                    src={it.videoUrl}
                    controls
                    className="h-full w-full object-cover"
                  />
                ) : null}
              </div>

              <div className="p-5">
                <div className="font-semibold">
                  {it.title ||
                    it.eventTitle ||
                    (activeType === 'photo' ? 'Photo' : 'Video')}
                </div>

                {it.eventDate ? (
                  <p className="mt-2 text-sm text-(--muted)">
                    📅{' '}
                    {new Date(it.eventDate).toLocaleDateString(
                      locale === 'ar' ? 'ar' : locale,
                    )}
                  </p>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
