import { notFound } from 'next/navigation';
import { unstable_noStore as noStore } from 'next/cache';
import { locales, type Locale } from '@/i18n/config';
import { getSanityClient } from '@/sanity/lib/getClient';
import { eventBySlugQuery } from '@/sanity/lib/queries';
import { PortableText } from '@portabletext/react';

type EventDetail = {
  title?: string;
  description?: string;
  content?: any;
  eventDate?: string;
  endDate?: string;
  location?: string;
  mainImageUrl?: string;
  mainImageAlt?: string;
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

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<JSX.Element> {
  noStore();

  const { locale, slug } = await params;

  if (!locales.includes(locale as Locale)) notFound();

  const lang = locale as Locale;
  const client = await getSanityClient();

  const event = await client.fetch<EventDetail | null>(eventBySlugQuery, {
    lang,
    slug,
  });

  if (!event) notFound();

  return (
    <article className="container mx-auto px-4 py-12 max-w-4xl">
      {event.mainImageUrl && (
        <img
          src={event.mainImageUrl}
          alt={event.mainImageAlt || event.title || ''}
          className="w-full h-64 md:h-96 object-cover rounded-lg mb-8"
        />
      )}

      <h1 className="text-4xl md:text-5xl font-bold mb-6">{event.title}</h1>

      <div className="flex flex-wrap gap-4 mb-8 text-gray-700">
        {event.eventDate && (
          <div className="flex items-center gap-2">
            <span className="text-2xl">📅</span>
            <div>
              <p className="font-semibold">
                {new Date(event.eventDate).toLocaleDateString(
                  lang === 'ar' ? 'ar-EG' : 'en-US',
                  {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  },
                )}
              </p>
              <p className="text-sm">
                {new Date(event.eventDate).toLocaleTimeString(
                  lang === 'ar' ? 'ar-EG' : 'en-US',
                  {
                    hour: '2-digit',
                    minute: '2-digit',
                  },
                )}
              </p>
            </div>
          </div>
        )}

        {event.location && (
          <div className="flex items-center gap-2">
            <span className="text-2xl">📍</span>
            <p className="font-semibold">{event.location}</p>
          </div>
        )}
      </div>

      {event.description && (
        <p className="text-xl text-gray-700 mb-8 leading-relaxed">
          {event.description}
        </p>
      )}

      {event.content && (
        <div className="prose prose-lg max-w-none">
          <PortableText value={event.content} />
        </div>
      )}

      {event.media?.length ? (
        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-bold">
            {lang === 'ar'
              ? 'الصور والفيديوهات'
              : lang === 'it'
                ? 'Foto e video'
                : 'Photos & Videos'}
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {event.media.map((item, idx) => {
              if (item._type === 'photo') {
                return (
                  <figure
                    key={`photo-${idx}`}
                    className="overflow-hidden rounded-2xl border border-border bg-white"
                  >
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.alt ?? event.title ?? ''}
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
                      {item.title ?? (lang === 'ar' ? 'فيديو' : 'Video')}
                    </div>
                    {item.caption ? (
                      <p className="mt-2 text-xs text-muted">{item.caption}</p>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ) : null}

      <div className="mt-12 pt-8 border-t">
        <a
          href={`/${locale}/events`}
          className="text-blue-600 hover:text-blue-800 font-semibold"
        >
          ← {lang === 'ar' ? 'عودة للفعاليات' : 'Back to Events'}
        </a>
      </div>
    </article>
  );
}
