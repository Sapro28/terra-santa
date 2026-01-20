import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { sanityClient } from '@/sanity/lib/client';
import { latestAnnouncementsQuery } from '@/sanity/lib/queries';

type Announcement = {
  _id: string;
  title?: string;
  excerpt?: string;
  publishedAt?: string;
  urgent?: boolean;
  slug?: string;
  mainImageUrl?: string;
  mainImageAlt?: string;
};

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Home' });

  const announcements: Announcement[] = await sanityClient.fetch(
    latestAnnouncementsQuery,
  );

  return (
    <div className="space-y-16">
      <section className="grid items-center gap-10 md:grid-cols-2">
        <div>
          <p className="inline-flex rounded-full border border-(--border) bg-(--paper) px-3 py-1 text-xs font-semibold text-(--muted)">
            {t('badge')}
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
            {t('welcome')}{' '}
            <span className="text-(--fg)">{t('schoolName')}</span>
          </h1>

          <p className="mt-4 text-lg leading-relaxed text-(--muted)">
            {t('subtitle')}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={`/${locale}/about`}
              className="rounded-xl bg-(--accent) px-5 py-3 text-sm font-semibold text-white hover:bg-(--accent-hover)"
            >
              {t('ctaAbout')}
            </Link>

            <Link
              href={`/${locale}/gallery`}
              className="rounded-xl border border-(--border) bg-white px-5 py-3 text-sm font-semibold text-(--fg) hover:bg-(--paper)"
            >
              {t('ctaGallery')}
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-4 rounded-2xl border border-(--border) bg-white p-4">
            <Stat label={t('stats.students')} value="—" />
            <Stat label={t('stats.teachers')} value="—" />
            <Stat label={t('stats.years')} value="—" />
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <InfoCard
          title={t('cards.missionTitle')}
          text={t('cards.missionText')}
        />
        <InfoCard title={t('cards.visionTitle')} text={t('cards.visionText')} />
        <InfoCard title={t('cards.valuesTitle')} text={t('cards.valuesText')} />
      </section>

      <section>
        <div className="mb-6">
          <h2 className="text-2xl font-semibold">
            Announcements &amp; Latest News
          </h2>
          <div className="mt-2 h-0.5 w-full bg-gray-200">
            <div className="h-0.5 w-16 bg-red-800" />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="relative overflow-hidden rounded-2xl border border-(--border) bg-(--paper)">
            <div className="aspect-4/3 w-full bg-gray-200" />
            <div className="absolute bottom-3 left-3 right-3 rounded-xl bg-black/40 p-3 text-white backdrop-blur">
              <p className="text-sm font-semibold">Featured</p>
              <p className="mt-1 text-xs opacity-90"></p>
            </div>
          </div>

          <div className="rounded-2xl border border-(--border) bg-white">
            {announcements?.length ? (
              <ul className="divide-y divide-(--border)">
                {announcements.map((post) => (
                  <li key={post._id} className="p-4">
                    <Link
                      href={`/${locale}/news/${post.slug ?? ''}`}
                      className="flex gap-4 hover:opacity-90"
                    >
                      <div className="h-20 w-28 shrink-0 overflow-hidden rounded-xl bg-(--paper)">
                        {post.mainImageUrl ? (
                          <img
                            src={post.mainImageUrl}
                            alt={
                              post.mainImageAlt || post.title || 'Announcement'
                            }
                            className="h-full w-full object-cover"
                            loading="lazy"
                          />
                        ) : null}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="line-clamp-1 text-base font-semibold">
                            {post.title}
                          </h3>

                          {post.urgent ? (
                            <span className="shrink-0 rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-800">
                              Urgent
                            </span>
                          ) : null}
                        </div>

                        {post.excerpt ? (
                          <p className="mt-1 line-clamp-2 text-sm text-(--muted)">
                            {post.excerpt}
                          </p>
                        ) : null}

                        {post.publishedAt ? (
                          <p className="mt-2 text-sm text-red-800">
                            📅{' '}
                            {new Date(post.publishedAt).toLocaleDateString(
                              locale === 'ar' ? 'ar' : locale,
                            )}
                          </p>
                        ) : null}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-6 text-sm text-(--muted)">
                No announcements yet.
              </div>
            )}

            <div className="flex items-center justify-end p-4">
              <Link
                href={`/${locale}/news`}
                className="text-sm font-semibold text-(--fg) hover:underline"
              >
                View all news →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-(--paper) p-3 text-center">
      <div className="text-xl font-bold">{value}</div>
      <div className="mt-1 text-xs font-semibold text-(--muted)">{label}</div>
    </div>
  );
}

function InfoCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-(--border) bg-white p-5">
      <div className="font-semibold">{title}</div>
      <p className="mt-2 text-sm text-(--muted)">{text}</p>
    </div>
  );
}
