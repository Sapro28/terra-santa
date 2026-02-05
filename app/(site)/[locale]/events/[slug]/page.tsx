import { notFound } from 'next/navigation';
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
  registrationLink?: string;
  mainImageUrl?: string;
  mainImageAlt?: string;
};

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
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

      {event.registrationLink && (
        <a
          href={event.registrationLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mb-8 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          {lang === 'ar' ? 'سجل الآن' : 'Register Now'}
        </a>
      )}

      {event.content && (
        <div className="prose prose-lg max-w-none">
          <PortableText value={event.content} />
        </div>
      )}

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
