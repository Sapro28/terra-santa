import Link from 'next/link';
import { getSanityClient } from '@/sanity/lib/getClient';
import type { Locale } from '@/i18n/config';
import { locales } from '@/i18n/config';
import { gallerySectionsWithEntriesQuery } from '@/sanity/lib/queries/gallery';

type GalleryListItem = {
  _id: string;
  title: string;
  slug: string;
  date?: string;
  location?: string;
  coverImageUrl?: string;
  coverImageAlt?: string;
  photoCount?: number;
  videoCount?: number;
};

type GallerySection = {
  _id: string;
  title: string;
  key?: string;
  items: GalleryListItem[];
};

function formatDate(date?: string, locale?: string) {
  if (!date) return '';
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString(locale || 'en');
}

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang = locale as Locale;

  const client = await getSanityClient();
  const sections = await client.fetch<GallerySection[]>(
    gallerySectionsWithEntriesQuery,
    { lang },
  );

  const hasAnyItems = sections?.some((s) => s.items?.length);

  return (
    <main className="space-y-6">
      <h1 className="text-3xl font-bold">Gallery</h1>

      {!sections?.length ? (
        <p className="text-muted">No sections yet.</p>
      ) : !hasAnyItems ? (
        <p className="text-muted">No gallery entries yet.</p>
      ) : (
        <div className="space-y-8">
          {sections.map((section) => {
            if (!section.items?.length) return null;

            return (
              <section key={section._id} className="space-y-4">
                <h2 className="text-xl font-bold">{section.title}</h2>

                <ul className="grid gap-4 p-0 list-none">
                  {section.items.map((item) => (
                    <li
                      key={item._id}
                      className="overflow-hidden rounded-2xl border border-border bg-white"
                    >
                      {item.coverImageUrl ? (
                        <div className="h-44 w-full overflow-hidden">
                          <img
                            src={item.coverImageUrl}
                            alt={item.coverImageAlt ?? item.title}
                            className="h-44 w-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      ) : null}

                      <div className="p-5">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/${locale}/gallery/${item.slug}`}
                            className="font-semibold hover:underline"
                          >
                            {item.title}
                          </Link>
                        </div>

                        <div className="mt-2 text-sm text-muted">
                          {item.photoCount ?? 0} photos • {item.videoCount ?? 0}{' '}
                          videos
                          {item.location ? ` • ${item.location}` : ''}
                        </div>

                        {item.date ? (
                          <p className="mt-3 text-xs text-muted">
                            {formatDate(item.date, locale)}
                          </p>
                        ) : null}
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      )}
    </main>
  );
}
