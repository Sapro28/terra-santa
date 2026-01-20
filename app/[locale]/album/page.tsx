import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { sanityClient } from '@/sanity/lib/client';
import { albumsListQuery } from '@/sanity/lib/queries';

type AlbumCard = {
  _id: string;
  title: string;
  description?: string;
  slug: string;
  coverImageUrl?: string;
  coverImageAlt?: string;
  photoCount: number;
  videoCount: number;
};

function localeToLang(locale: string) {
  if (locale === 'ar') return 'ar';
  if (locale === 'it') return 'it';
  return 'en';
}

export default async function AlbumPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang = localeToLang(locale);

  const t = await getTranslations({ locale, namespace: 'Album' });

  const albums = await sanityClient.fetch<AlbumCard[]>(albumsListQuery, {
    lang,
  });

  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold">{t('title')}</h1>
        <p className="max-w-3xl text-(--muted)">{t('subtitle')}</p>
      </header>

      {albums.length === 0 ? (
        <div className="rounded-2xl border border-(--border) bg-white p-6 text-sm text-(--muted)">
          {t('empty')}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {albums.map((a) => (
            <Link
              key={a._id}
              href={`/${locale}/album/${a.slug}`}
              className="overflow-hidden rounded-2xl border border-(--border) bg-white hover:shadow-sm"
            >
              <div className="aspect-16/10 bg-(--paper)">
                {a.coverImageUrl ? (
                  <img
                    src={a.coverImageUrl}
                    alt={a.coverImageAlt || a.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-sm text-(--muted)">
                    {t('noCover')}
                  </div>
                )}
              </div>

              <div className="p-5 space-y-2">
                <div className="font-semibold">{a.title}</div>

                {a.description ? (
                  <p className="line-clamp-2 text-sm text-(--muted)">
                    {a.description}
                  </p>
                ) : null}

                <div className="flex gap-3 text-xs text-(--muted)">
                  <span>
                    {a.photoCount} {t('photos')}
                  </span>
                  <span>
                    {a.videoCount} {t('videos')}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
