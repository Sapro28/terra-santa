import Link from 'next/link';
import { getSanityClient } from '@/sanity/lib/getClient';

import { homePageQuery, latestAnnouncementsQuery } from '@/sanity/lib/queries';
import AnnouncementsPopup from '@/components/AnnouncementsPopup';

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

type HomePageContent = {
  title?: string;
  schoolName?: string;
  subtitle?: string;

  ctaAboutLabel?: string;
  ctaAlbumLabel?: string;

  stats?: Array<{ label?: string; value?: string }>;
  cards?: Array<{ title?: string; text?: string }>;

  announcementsHeading?: string;
  announcementsEmpty?: string;
  viewAllNewsLabel?: string;
};

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const lang = locale;
  const client = await getSanityClient();

  const page: HomePageContent | null = await client.fetch(homePageQuery, {
    lang,
  });

  const POPUP_LOCALES = ['ar'];
  const shouldShowPopup = POPUP_LOCALES.includes(locale);

  const announcements: Announcement[] = shouldShowPopup
    ? await client.fetch(latestAnnouncementsQuery, { lang })
    : [];

  const popupAnnouncement =
    announcements.find((a) => a.urgent && a.title && a.slug) ??
    announcements.find((a) => a.title && a.slug) ??
    null;

  return (
    <div className="space-y-16">
      <AnnouncementsPopup
        locale={locale}
        announcement={
          shouldShowPopup && popupAnnouncement
            ? {
                _id: popupAnnouncement._id,
                title: popupAnnouncement.title!,
                slug: popupAnnouncement.slug!,
                excerpt: popupAnnouncement.excerpt,
                publishedAt: popupAnnouncement.publishedAt,
                urgent: popupAnnouncement.urgent,
                mainImageUrl: popupAnnouncement.mainImageUrl,
                mainImageAlt: popupAnnouncement.mainImageAlt,
              }
            : null
        }
      />

      <section className="grid items-center gap-10 md:grid-cols-2">
        <div>
          <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
            {page?.title ?? '—'}{' '}
            <span className="text-(--fg)">{page?.schoolName ?? ''}</span>
          </h1>

          {page?.subtitle ? (
            <p className="mt-4 text-lg leading-relaxed text-(--muted)">
              {page.subtitle}
            </p>
          ) : null}

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={`/${locale}/about`}
              className="rounded-xl bg-(--accent) px-5 py-3 text-sm font-semibold text-white hover:bg-(--accent-hover)"
            >
              {page?.ctaAboutLabel ?? 'About'}
            </Link>

            <Link
              href={`/${locale}/album`}
              className="rounded-xl border border-(--border) bg-white px-5 py-3 text-sm font-semibold text-(--fg) hover:bg-(--paper)"
            >
              {page?.ctaAlbumLabel ?? 'Albums'}
            </Link>
          </div>

          {page?.stats?.length ? (
            <div className="mt-6 grid grid-cols-3 gap-4 rounded-2xl border border-(--border) bg-white p-4">
              {page.stats.slice(0, 3).map((s, idx) => (
                <Stat key={idx} label={s.label ?? '—'} value={s.value ?? '—'} />
              ))}
            </div>
          ) : null}
        </div>
      </section>

      {page?.cards?.length ? (
        <section className="grid gap-4 md:grid-cols-3">
          {page.cards.slice(0, 3).map((c, idx) => (
            <InfoCard key={idx} title={c.title ?? '—'} text={c.text ?? ''} />
          ))}
        </section>
      ) : null}

      <section>
        <div className="mb-6">
          <h2 className="text-2xl font-semibold">
            {page?.announcementsHeading ?? 'Announcements & Latest News'}
          </h2>
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
              {page?.announcementsEmpty ?? 'No announcements yet.'}
            </div>
          )}

          <div className="flex items-center justify-end p-4">
            <Link
              href={`/${locale}/news`}
              className="text-sm font-semibold text-(--fg) hover:underline"
            >
              {page?.viewAllNewsLabel ?? 'View all news →'}
            </Link>
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
