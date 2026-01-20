import { notFound } from 'next/navigation';
import { sanityClient } from '@/sanity/lib/client';
import { eventBySlugQuery } from '@/sanity/lib/queries';

type EventMedia =
  | {
      _type: 'photo';
      imageUrl?: string;
      alt?: string;
      caption?: string;
      capturedAt?: string;
    }
  | {
      _type: 'video';
      videoUrl?: string;
      title?: string;
      caption?: string;
      capturedAt?: string;
    };

type EventDetail = {
  _id: string;
  title: string;
  eventDate?: string;
  location?: string;
  description?: string;
  slug: string;
  coverImageUrl?: string;
  coverImageAlt?: string;
  media?: EventMedia[];
};

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;

  const event = await sanityClient.fetch<EventDetail | null>(eventBySlugQuery, {
    slug,
  });

  if (!event) notFound();

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-bold">{event.title}</h1>

      <div className="mt-2 text-sm opacity-70">
        {event.eventDate
          ? new Date(event.eventDate).toLocaleDateString()
          : null}
        {event.location
          ? event.eventDate
            ? ` • ${event.location}`
            : event.location
          : null}
      </div>

      {event.coverImageUrl ? (
        <img
          src={event.coverImageUrl}
          alt={event.coverImageAlt || event.title}
          className="mt-6 w-full rounded-2xl object-cover"
        />
      ) : null}

      {event.description ? (
        <p className="mt-6 whitespace-pre-line opacity-80">
          {event.description}
        </p>
      ) : null}

      {event.media?.length ? (
        <section className="mt-10">
          <h2 className="text-xl font-semibold">Media</h2>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {event.media.map((m, idx) => {
              if (m._type === 'photo') {
                return (
                  <figure
                    key={idx}
                    className="overflow-hidden rounded-2xl border"
                  >
                    {m.imageUrl ? (
                      <img
                        src={m.imageUrl}
                        alt={m.alt || event.title}
                        className="h-full w-full object-cover"
                      />
                    ) : null}
                    {m.caption ? (
                      <figcaption className="p-3 text-sm opacity-80">
                        {m.caption}
                      </figcaption>
                    ) : null}
                  </figure>
                );
              }

              return (
                <div
                  key={idx}
                  className="overflow-hidden rounded-2xl border p-3"
                >
                  <div className="font-medium">{m.title || 'Video'}</div>
                  {m.videoUrl ? (
                    <video
                      className="mt-2 w-full rounded-xl"
                      controls
                      src={m.videoUrl}
                    />
                  ) : null}
                  {m.caption ? (
                    <p className="mt-2 text-sm opacity-80">{m.caption}</p>
                  ) : null}
                </div>
              );
            })}
          </div>
        </section>
      ) : null}
    </main>
  );
}
