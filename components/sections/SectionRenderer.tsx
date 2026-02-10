import Link from 'next/link';

import DivisionCard from './DivisionCard.client';

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

type SectionBase = { _type: string };

type CMSLink = {
  linkType?: 'internal' | 'external' | null;
  routeKey?: string | null;
  internalPath?: string | null;
  externalUrl?: string | null;
  openInNewTab?: boolean | null;
};

type SectionVideoHero = SectionBase & {
  _type: 'sectionVideoHero';
  kicker?: string;
  title?: string;
  subtitle?: string;
  overlayOpacity?: number;
  videoUrl?: string;
  posterUrl?: string;
  posterAlt?: string;

  primaryCta?: { label?: string; link?: CMSLink; href?: string };
  secondaryCta?: { label?: string; link?: CMSLink; href?: string };
};

type SectionDivisions = SectionBase & {
  _type: 'sectionDivisions';
  title?: string;
  subtitle?: string;
  divisions?: Array<{
    title?: string;
    text?: string;
    pageSlug?: string;
    pageTitle?: string;
    imageUrl?: string;
    imageAlt?: string;
    hoverText?: string;
    ctaLabel?: string;
  }>;
};

type SectionParentsTestimonials = SectionBase & {
  _type: 'sectionParentsTestimonials';
  title?: string;
  testimonials?: Array<{ text?: string }>;
};

type SectionAnnouncements = SectionBase & {
  _type: 'sectionAnnouncements';
  title?: string;
  emptyText?: string;
  viewAllLabel?: string;
  limit?: number;
};

type SectionUpcomingEvents = SectionBase & {
  _type: 'sectionUpcomingEvents';
  title?: string;
  emptyText?: string;
  viewAllLabel?: string;
  limit?: number;
  sectionId?: string;
  sectionTitle?: string;
  sectionSlug?: string;
};

type SectionLatestEvents = SectionBase & {
  _type: 'sectionLatestEvents';
  title?: string;
  emptyText?: string;
  viewAllLabel?: string;
  limit?: number;
  sectionId?: string;
  sectionTitle?: string;
  sectionSlug?: string;
};

type SectionColors = SectionBase & {
  _type: 'sectionColors';
  title?: string;
  subtitle?: string;
  colors?: Array<{ name?: string; hex?: string }>;
};

type Section =
  | SectionVideoHero
  | SectionDivisions
  | SectionParentsTestimonials
  | SectionAnnouncements
  | SectionUpcomingEvents
  | SectionLatestEvents
  | SectionColors
  | (SectionBase & Record<string, any>);

function routeKeyToPathSegment(routeKey?: string | null) {
  switch (routeKey) {
    case 'home':
      return '';
    case 'about':
      return 'about';
    case 'sections':
      return 'sections';
    case 'news':
      return 'news';
    case 'events':
      return 'events';
    case 'fees':
      return 'fees';
    case 'moodle':
      return 'moodle';
    default:
      return null;
  }
}

function isAbsoluteUrl(url: string) {
  return /^https?:\/\//i.test(url);
}

function normalizeLegacyHref(raw?: string | null) {
  if (!raw) return '';
  const trimmed = raw.trim();
  if (!trimmed) return '';
  return trimmed.startsWith('/') ? trimmed.slice(1) : trimmed;
}

function resolveCmsLink(args: {
  locale: string;
  link?: CMSLink | null;
  legacyHref?: string | null;
}):
  | { kind: 'internal'; href: string }
  | { kind: 'external'; href: string; newTab: boolean }
  | null {
  const { locale, link, legacyHref } = args;

  if (link?.linkType === 'external') {
    const href = (link.externalUrl ?? '').trim();
    if (!href) return null;
    return { kind: 'external', href, newTab: link.openInNewTab ?? true };
  }

  if (link?.linkType === 'internal') {
    const raw = (link.internalPath ?? '').trim();
    const seg = raw
      ? normalizeLegacyHref(raw)
      : routeKeyToPathSegment(link.routeKey);
    if (seg === null) return null;
    return { kind: 'internal', href: seg ? `/${locale}/${seg}` : `/${locale}` };
  }

  if (legacyHref) {
    const raw = legacyHref.trim();
    if (!raw) return { kind: 'internal', href: `/${locale}` };
    if (isAbsoluteUrl(raw))
      return { kind: 'external', href: raw, newTab: true };

    const seg = normalizeLegacyHref(raw);
    return { kind: 'internal', href: seg ? `/${locale}/${seg}` : `/${locale}` };
  }

  return null;
}

function CtaButton({
  resolved,
  label,
  className,
}: {
  resolved:
    | { kind: 'internal'; href: string }
    | { kind: 'external'; href: string; newTab: boolean };
  label: string;
  className: string;
}) {
  if (resolved.kind === 'external') {
    return (
      <a
        href={resolved.href}
        target={resolved.newTab ? '_blank' : undefined}
        rel={resolved.newTab ? 'noreferrer noopener' : undefined}
        className={className}
      >
        {label}
      </a>
    );
  }

  return (
    <Link href={resolved.href} className={className}>
      {label}
    </Link>
  );
}

function NewsList({
  locale,
  title,
  emptyText,
  viewAllLabel,
  posts,
  viewAllHref,
  itemHrefBase,
}: {
  locale: string;
  title: string;
  emptyText: string;
  viewAllLabel: string;
  posts: Announcement[];
  viewAllHref: string;
  itemHrefBase: string;
}) {
  return (
    <section>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">{title}</h2>
      </div>

      <div className="rounded-2xl border border-border bg-white">
        {posts.length ? (
          <ul className="divide-y divide-border">
            {posts.map((post) => (
              <li key={post._id} className="p-4">
                <Link
                  href={`/${locale}/${itemHrefBase}/${post.slug ?? ''}`}
                  className="flex gap-4 hover:opacity-90"
                >
                  <div className="h-20 w-28 shrink-0 overflow-hidden rounded-xl bg-(--paper)">
                    {post.mainImageUrl ? (
                      <img
                        src={post.mainImageUrl}
                        alt={post.mainImageAlt || post.title || 'Post'}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    ) : null}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="line-clamp-1 text-base font-semibold">
                      {post.title}
                    </h3>

                    {post.excerpt ? (
                      <p className="mt-1 line-clamp-2 text-sm text-muted">
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
          <div className="p-6 text-sm text-muted">{emptyText}</div>
        )}

        <div className="flex items-center justify-end p-4">
          <Link
            href={viewAllHref}
            className="text-sm font-semibold text-(--fg) hover:underline"
          >
            {viewAllLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function SectionRenderer({
  locale,
  sections,
  announcements,
  upcomingEvents,
  upcomingEventsBySectionId,
  latestEvents,
  latestEventsBySectionId,
  pageTitle,
}: {
  locale: string;
  sections?: Section[] | null;
  announcements?: Announcement[];
  upcomingEvents?: Announcement[];
  upcomingEventsBySectionId?: Record<string, Announcement[]>;
  latestEvents?: Announcement[];
  latestEventsBySectionId?: Record<string, Announcement[]>;
  pageTitle?: string;
}) {
  if (!sections?.length) return null;

  return (
    <div className="space-y-16">
      {pageTitle ? (
        <div className="mx-auto max-w-6xl px-4">
          <h1 className="text-3xl font-bold">{pageTitle}</h1>
        </div>
      ) : null}

      {sections.map((section, idx) => {
        switch (section._type) {
          case 'sectionVideoHero': {
            const s = section as SectionVideoHero;

            const primaryResolved =
              resolveCmsLink({
                locale,
                link: s.primaryCta?.link,
                legacyHref: s.primaryCta?.href,
              }) ?? null;

            const secondaryResolved =
              resolveCmsLink({
                locale,
                link: s.secondaryCta?.link,
                legacyHref: s.secondaryCta?.href,
              }) ?? null;

            const overlay =
              typeof s.overlayOpacity === 'number' ? s.overlayOpacity : 0.45;

            return (
              <section
                key={idx}
                className="overflow-hidden rounded-3xl border border-border bg-black"
              >
                <div className="relative aspect-video w-full">
                  {s.videoUrl ? (
                    <video
                      className="absolute inset-0 h-full w-full object-cover"
                      src={s.videoUrl}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      poster={s.posterUrl || undefined}
                    />
                  ) : null}

                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(90deg, rgba(0,0,0,${overlay}) 0%, rgba(0,0,0,${Math.min(
                        overlay + 0.15,
                        0.9,
                      )}) 45%, rgba(0,0,0,${Math.max(
                        overlay - 0.15,
                        0,
                      )}) 100%)`,
                    }}
                  />

                  <div className="absolute inset-0 flex items-end p-6 md:items-center md:p-10">
                    <div className="max-w-2xl">
                      {s.kicker ? (
                        <div className="text-sm font-semibold text-white/80">
                          {s.kicker}
                        </div>
                      ) : null}

                      {s.title ? (
                        <h1 className="mt-2 text-3xl font-bold leading-tight text-white md:text-5xl">
                          {s.title}
                        </h1>
                      ) : null}

                      {s.subtitle ? (
                        <p className="mt-4 max-w-xl text-base text-white/85 md:text-lg">
                          {s.subtitle}
                        </p>
                      ) : null}

                      <div className="mt-6 flex flex-wrap gap-3">
                        {primaryResolved && s.primaryCta?.label ? (
                          <CtaButton
                            resolved={primaryResolved}
                            label={s.primaryCta.label}
                            className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-white hover:opacity-90"
                          />
                        ) : null}

                        {secondaryResolved && s.secondaryCta?.label ? (
                          <CtaButton
                            resolved={secondaryResolved}
                            label={s.secondaryCta.label}
                            className="rounded-xl border border-white/60 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
                          />
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            );
          }

          case 'sectionDivisions': {
            const s = section as SectionDivisions;
            const divisions = s.divisions ?? [];
            const firstRow = divisions.slice(0, 4);
            const secondRow = divisions.slice(4);

            return (
              <section key={idx} className="mx-auto max-w-7xl px-4">
                <div className="mb-6">
                  {s.title ? (
                    <h2 className="text-2xl font-semibold">{s.title}</h2>
                  ) : null}
                  {s.subtitle ? (
                    <p className="mt-2 max-w-3xl text-sm text-muted">
                      {s.subtitle}
                    </p>
                  ) : null}
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:hidden">
                  {divisions.map((d, i) => (
                    <div key={i} className="w-full">
                      <DivisionCard locale={locale} d={d} />
                    </div>
                  ))}
                </div>

                <div className="hidden lg:block">
                  <div className="grid grid-cols-4 gap-6">
                    {firstRow.map((d, i) => (
                      <div key={i} className="w-full">
                        <DivisionCard locale={locale} d={d} />
                      </div>
                    ))}
                  </div>

                  {secondRow.length ? (
                    <div className="mt-6 mx-auto max-w-5xl">
                      <div className="grid grid-cols-3 gap-6">
                        {secondRow.map((d, i) => (
                          <div key={i} className="w-full">
                            <DivisionCard locale={locale} d={d} />
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              </section>
            );
          }

          case 'sectionParentsTestimonials': {
            const s = section as SectionParentsTestimonials;
            const items = (s.testimonials ?? []).filter((t) =>
              (t.text ?? '').trim(),
            );

            if (!items.length) return null;

            return (
              <section key={idx} className="mx-auto max-w-6xl px-4">
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold">
                    {s.title ?? 'Parents Testimonials'}
                  </h2>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                  {items.map((t, i) => (
                    <div
                      key={i}
                      className="rounded-2xl border border-border bg-white p-6 text-sm text-(--fg)"
                    >
                      <p className="leading-relaxed text-muted">“{t.text}”</p>
                    </div>
                  ))}
                </div>
              </section>
            );
          }

          case 'sectionAnnouncements': {
            const s = section as SectionAnnouncements;
            const limit =
              typeof s.limit === 'number' && s.limit > 0 ? s.limit : undefined;

            const posts = (announcements ?? []).slice(0, limit ?? 999);

            return (
              <NewsList
                key={idx}
                locale={locale}
                title={s.title ?? 'Latest news'}
                emptyText={s.emptyText ?? 'No announcements yet.'}
                viewAllLabel={s.viewAllLabel ?? 'View all news →'}
                posts={posts}
                viewAllHref={`/${locale}/news`}
                itemHrefBase="news"
              />
            );
          }

          case 'sectionUpcomingEvents': {
            const s = section as SectionUpcomingEvents;
            const limit =
              typeof s.limit === 'number' && s.limit > 0 ? s.limit : 3;

            const baseList = s.sectionId
              ? upcomingEventsBySectionId?.[s.sectionId]
              : upcomingEvents;

            const posts = (baseList ?? []).slice(0, limit);

            const viewAllHref = s.sectionSlug
              ? `/${locale}/events?section=${encodeURIComponent(s.sectionSlug)}`
              : `/${locale}/events`;

            return (
              <NewsList
                key={idx}
                locale={locale}
                title={s.title ?? 'Upcoming events'}
                emptyText={s.emptyText ?? 'No upcoming events.'}
                viewAllLabel={s.viewAllLabel ?? 'View all events →'}
                posts={posts}
                viewAllHref={viewAllHref}
                itemHrefBase="events"
              />
            );
          }

          case 'sectionLatestEvents': {
            const s = section as SectionLatestEvents;
            const limit =
              typeof s.limit === 'number' && s.limit > 0 ? s.limit : 6;

            const baseList = s.sectionId
              ? latestEventsBySectionId?.[s.sectionId]
              : latestEvents;

            const posts = (baseList ?? []).slice(0, limit);

            const viewAllHref = s.sectionSlug
              ? `/${locale}/events?section=${encodeURIComponent(s.sectionSlug)}`
              : `/${locale}/events`;

            return (
              <NewsList
                key={idx}
                locale={locale}
                title={s.title ?? 'Latest events'}
                emptyText={s.emptyText ?? 'No events yet.'}
                viewAllLabel={s.viewAllLabel ?? 'View all events →'}
                posts={posts}
                viewAllHref={viewAllHref}
                itemHrefBase="events"
              />
            );
          }

          case 'sectionColors': {
            const s = section as SectionColors;

            const colors = (s.colors ?? []).filter((c) => (c.hex ?? '').trim());

            if (!colors.length) return null;

            return (
              <section key={idx} className="mx-auto max-w-6xl px-4">
                <div className="mb-6">
                  {s.title ? (
                    <h2 className="text-2xl font-semibold">{s.title}</h2>
                  ) : null}
                  {s.subtitle ? (
                    <p className="mt-2 max-w-3xl text-sm text-muted">
                      {s.subtitle}
                    </p>
                  ) : null}
                </div>

                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {colors.map((c, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between rounded-2xl border border-border bg-white p-5"
                    >
                      <div>
                        <div className="text-sm font-semibold">{c.name}</div>
                        <div className="mt-1 text-xs text-muted">{c.hex}</div>
                      </div>
                      <div
                        className="h-10 w-10 rounded-xl border border-border"
                        style={{ background: c.hex }}
                      />
                    </div>
                  ))}
                </div>
              </section>
            );
          }

          default:
            return null;
        }
      })}
    </div>
  );
}
