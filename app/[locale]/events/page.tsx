import Link from 'next/link';
import { createClient } from 'next-sanity';
import { eventsListQuery } from '@/sanity/lib/queries';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  useCdn: true,
});

type EventCard = {
  _id: string;
  title: string;
  eventDate?: string;
  location?: string;
  description?: string;
  slug: string;
  coverImageUrl?: string;
  coverImageAlt?: string;
  photoCount: number;
  videoCount: number;
  thumbnails?: { url: string; alt?: string }[];
};

function localeToLang(locale: string) {
  if (locale === 'ar') return 'ar';
  if (locale === 'it') return 'it';
  return 'en';
}

export default async function EventsPage({
  params,
}: {
  params: { locale: string };
}) {
  const lang = localeToLang(params.locale);

  const events = await client.fetch<EventCard[]>(eventsListQuery, { lang });

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-4xl font-bold text-(--fg)">Events</h1>
      <p className="mt-2 text-(--muted)">
        School events with photos and videos.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((ev) => {
          const href = `/${params.locale}/events/${ev.slug}`;

          return (
            <Link
              key={ev._id}
              href={href}
              className="group overflow-hidden rounded-2xl border border-(--border) bg-white shadow-sm hover:shadow-md"
            >
              {/* Collage / cover */}
              <div className="aspect-[16/10] w-full bg-(--bg)">
                {ev.thumbnails?.length ? (
                  <div className="grid h-full grid-cols-3 grid-rows-2 gap-1 p-1">
                    {ev.thumbnails.slice(0, 6).map((t, idx) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        key={idx}
                        src={t.url}
                        alt={t.alt || ev.coverImageAlt || ev.title}
                        className="h-full w-full rounded-lg object-cover"
                      />
                    ))}
                  </div>
                ) : ev.coverImageUrl ? (
                  <img
                    src={ev.coverImageUrl}
                    alt={ev.coverImageAlt || ev.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-(--muted)">
                    No media
                  </div>
                )}
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-lg font-semibold text-(--fg) group-hover:underline">
                    {ev.title}
                  </h2>
                </div>

                <div className="mt-1 text-sm text-(--muted)">
                  {ev.eventDate
                    ? new Date(ev.eventDate).toLocaleDateString()
                    : null}
                  {ev.location
                    ? ev.eventDate
                      ? ` • ${ev.location}`
                      : ev.location
                    : null}
                </div>

                {ev.description ? (
                  <p className="mt-3 line-clamp-2 text-sm text-(--muted)">
                    {ev.description}
                  </p>
                ) : null}

                <div className="mt-4 flex gap-3 text-xs text-(--muted)">
                  <span>{ev.photoCount} photos</span>
                  <span>{ev.videoCount} videos</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
