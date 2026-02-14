import {
  CmsCtaLink,
  resolveCmsLink,
  type CMSLink,
} from '@/components/lib/cmsLink';
import { useId } from 'react';

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

type SectionVideoHero = SectionBase & {
  _type: 'sectionVideoHero';
  titleLine1: string;
  titleLine2: string;
  subtitle?: string;
  overlayOpacity?: number;
  videoUrl?: string;
  posterUrl?: string;
  posterAlt?: string;

  primaryCta?: { label?: string; link?: CMSLink; href?: string };
  secondaryCta?: { label?: string; link?: CMSLink; href?: string };
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

type SectionArrowDivider = SectionBase & {
  _type: 'sectionArrowDivider';
  color?: string;
  size?: number;
  marginTop?: number;
  marginBottom?: number;
  offsetX?: number;
  offsetY?: number;
  direction?: 'left' | 'right' | 'down';
};

type Section =
  | SectionVideoHero
  | SectionArrowDivider
  | SectionParentsTestimonials
  | SectionAnnouncements
  | SectionUpcomingEvents
  | SectionLatestEvents
  | (SectionBase & Record<string, any>);

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
        <h2
          className="text-2xl font-semibold"
          style={{ color: 'var(--foreground)' }}
        >
          {title}
        </h2>
      </div>

      <div className="rounded-2xl border border-border bg-white p-6">
        {posts.length === 0 ? (
          <p className="text-muted-foreground">{emptyText}</p>
        ) : (
          <ul className="grid gap-5 md:grid-cols-2">
            {posts.map((p) => {
              const href = `${itemHrefBase}/${p.slug ?? ''}`;

              return (
                <li
                  key={p._id}
                  className="rounded-xl border border-border bg-muted/20 p-4"
                >
                  <a href={href} className="block">
                    <div className="flex items-start justify-between gap-3">
                      <h3
                        className="text-lg font-semibold leading-snug"
                        style={{ color: 'var(--foreground)' }}
                      >
                        {p.title}
                      </h3>
                      {p.urgent ? (
                        <span className="inline-flex shrink-0 items-center rounded-full bg-red-600 px-2 py-0.5 text-xs font-semibold text-white">
                          !
                        </span>
                      ) : null}
                    </div>

                    {p.excerpt ? (
                      <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
                        {p.excerpt}
                      </p>
                    ) : null}
                  </a>
                </li>
              );
            })}
          </ul>
        )}

        <div className="mt-6">
          <a
            href={viewAllHref}
            className="text-sm font-medium underline"
            style={{ color: 'var(--foreground)' }}
          >
            {viewAllLabel}
          </a>
        </div>
      </div>
    </section>
  );
}

function SectionVideoHeroBlock({
  locale,
  s,
}: {
  locale: string;
  s: SectionVideoHero;
}) {
  const titleLine1 = String(s.titleLine1 ?? '').trim();
  const titleLine2 = String(s.titleLine2 ?? '').trim();
  const subtitle = s.subtitle ?? '';
  const overlay =
    typeof s.overlayOpacity === 'number' ? s.overlayOpacity : 0.45;

  const primaryResolved = s.primaryCta?.label
    ? resolveCmsLink({
        locale,
        link: s.primaryCta.link,
        legacyHref: s.primaryCta.href,
      })
    : null;

  const secondaryResolved = s.secondaryCta?.label
    ? resolveCmsLink({
        locale,
        link: s.secondaryCta.link,
        legacyHref: s.secondaryCta.href,
      })
    : null;

  return (
    <section
      className="relative overflow-hidden"
      data-video-hero
      style={{ marginTop: 'calc(var(--site-header-height) * -1)' }}
    >
      <div className="relative aspect-video min-h-130 w-full">
        {s.videoUrl ? (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src={s.videoUrl} />
          </video>
        ) : null}

        <div
          id="hero-header-sentinel"
          className="pointer-events-none absolute bottom-0 left-0 h-px w-full"
          aria-hidden
        />

        <div
          className="absolute inset-0"
          style={{ backgroundColor: `rgba(0,0,0,${overlay})` }}
          aria-hidden
        />

        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-4 pb-10 text-center md:pb-16">
            <div className="max-w-4xl text-white">
              {titleLine1 ? (
                <div className="font-serif text-lg font-medium leading-tight tracking-wide md:text-2xl">
                  {titleLine1}
                </div>
              ) : null}

              {titleLine2 ? (
                <div className="mt-2 text-3xl font-semibold leading-tight md:text-5xl">
                  {titleLine2.split(/\s+/).map((w, idx, arr) => {
                    const key = `${w}-${idx}`;
                    const isAnd = w.toLowerCase() === 'and';
                    const isLast = idx === arr.length - 1;
                    return (
                      <span
                        key={key}
                        className={
                          isAnd
                            ? `inline-block align-baseline font-serif text-2xl font-normal italic opacity-90 md:text-4xl ${!isLast ? 'mr-2' : ''}`
                            : `inline-block font-semibold ${!isLast ? 'mr-2' : ''}`
                        }
                      >
                        {w}
                      </span>
                    );
                  })}
                </div>
              ) : null}

              {subtitle ? (
                <p className="mt-5 text-base leading-relaxed opacity-95 md:text-lg">
                  {subtitle}
                </p>
              ) : null}

              {(primaryResolved || secondaryResolved) && (
                <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                  {primaryResolved && (
                    <CmsCtaLink
                      resolved={primaryResolved}
                      label={s.primaryCta!.label!}
                      className="rounded-full bg-white px-6 py-3 font-semibold text-black transition-colors hover:bg-gray-100"
                    />
                  )}
                  {secondaryResolved && (
                    <CmsCtaLink
                      resolved={secondaryResolved}
                      label={s.secondaryCta!.label!}
                      className="rounded-full border-2 border-white px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionArrowDividerBlock({
  locale,
  s,
}: {
  locale: string;
  s: SectionArrowDivider;
}) {
  const color = s.color ?? '#800020';
  const size = s.size ?? 2;
  const marginTop = s.marginTop ?? 0;
  const marginBottom = s.marginBottom ?? 0;
  const offsetX = s.offsetX ?? 0;
  const offsetY = s.offsetY ?? 0;

  const rawDirection = (s as any).direction;

  const normalizedDirection = (() => {
    if (typeof rawDirection === 'string') {
      return rawDirection.toLowerCase().trim();
    }

    const normalize = (val: any): string =>
      String(val ?? '')
        .toLowerCase()
        .trim();

    if (Array.isArray(rawDirection) && rawDirection.length > 0) {
      const first = rawDirection[0];
      return normalize(first?.value ?? first?.current ?? first?.title ?? '');
    }

    if (rawDirection && typeof rawDirection === 'object') {
      const wanted = (locale ?? '').split('-')[0].toLowerCase();
      const candidate =
        rawDirection.current ??
        rawDirection.value ??
        (wanted && rawDirection[wanted]) ??
        rawDirection.en ??
        rawDirection.default;
      if (candidate) return normalize(candidate);
      for (const v of Object.values(rawDirection)) {
        if (typeof v === 'string' && v.trim()) return normalize(v);
      }
    }

    return '';
  })();

  const direction: 'left' | 'right' | 'down' =
    normalizedDirection === 'left' ||
    normalizedDirection === 'right' ||
    normalizedDirection === 'down'
      ? (normalizedDirection as any)
      : 'down';

  const markerId = `arrowhead-${useId().replace(/:/g, '')}`;
  const px = size === 1 ? 100 : size === 3 ? 160 : 130;
  const stroke = size === 1 ? 5 : size === 3 ? 8 : 6.5;
  const dash = size === 1 ? '8 14' : size === 3 ? '12 18' : '10 16';
  const leftCurvedPathD =
    'M 62 10 C 70 45, 58 66, 52 76 C 42 94, 32 108, 24 120';
  const rightCurvedPathD =
    'M 38 10 C 30 45, 42 66, 48 76 C 58 94, 68 108, 76 120';
  const centeredDownPathD = 'M 50 10 L 50 112';

  return (
    <section aria-hidden style={{ marginTop, marginBottom }}>
      <div className="mx-auto w-full max-w-6xl px-4">
        <div className="relative h-0">
          <div
            className="pointer-events-none absolute left-1/2 top-0"
            style={{
              transform: `translate(-50%, 0) translate(${offsetX}px, ${offsetY}px)`,
            }}
          >
            <svg
              width={px}
              height={px * 1.3}
              viewBox="0 0 100 130"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ overflow: 'visible' }}
            >
              <defs>
                <marker
                  id={markerId}
                  viewBox="0 0 10 10"
                  refX="0"
                  refY="5"
                  markerWidth="14"
                  markerHeight="14"
                  markerUnits="userSpaceOnUse"
                  orient="auto"
                >
                  <path
                    d="M 2 1.5 L 9 5 L 2 8.5"
                    fill="none"
                    stroke={color}
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </marker>
              </defs>

              {direction === 'down' ? (
                <path
                  d={centeredDownPathD}
                  stroke={color}
                  strokeWidth={stroke}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray={dash}
                  fill="none"
                  markerEnd={`url(#${markerId})`}
                />
              ) : (
                <path
                  d={direction === 'right' ? rightCurvedPathD : leftCurvedPathD}
                  stroke={color}
                  strokeWidth={stroke}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray={dash}
                  fill="none"
                  markerEnd={`url(#${markerId})`}
                />
              )}
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionParentsTestimonialsBlock({
  s,
}: {
  s: SectionParentsTestimonials;
}) {
  const title = s.title ?? '';
  const items = s.testimonials ?? [];

  return (
    <section className="py-14">
      <div className="mx-auto max-w-6xl px-4">
        <h2
          className="text-2xl font-semibold"
          style={{ color: 'var(--foreground)' }}
        >
          {title}
        </h2>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {items.map((t, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-border bg-white p-6 shadow-sm"
            >
              <p className="text-sm leading-relaxed text-muted-foreground">
                "{t.text ?? ''}"
              </p>
            </div>
          ))}
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
}: {
  locale: string;
  sections: Section[];
  announcements: Announcement[];
  upcomingEvents: Announcement[];
  upcomingEventsBySectionId: Record<string, Announcement[]>;
  latestEvents: Announcement[];
  latestEventsBySectionId: Record<string, Announcement[]>;
}) {
  return (
    <div className="flex flex-col gap-14">
      {sections.map((s, i) => {
        if (!s?._type) return null;

        switch (s._type) {
          case 'sectionVideoHero':
            return (
              <SectionVideoHeroBlock key={i} locale={locale} s={s as any} />
            );

          case 'sectionArrowDivider':
            return (
              <SectionArrowDividerBlock key={i} locale={locale} s={s as any} />
            );

          case 'sectionParentsTestimonials':
            return <SectionParentsTestimonialsBlock key={i} s={s as any} />;

          case 'sectionAnnouncements': {
            const title = (s as any).title ?? '';
            const emptyText = (s as any).emptyText ?? '';
            const viewAllLabel = (s as any).viewAllLabel ?? '';
            const viewAllHref = `/${locale}/news`;
            const limit =
              typeof (s as any).limit === 'number' ? (s as any).limit : 6;
            const posts = announcements.slice(0, Math.max(limit, 0));

            return (
              <div key={i} className="mx-auto w-full max-w-6xl px-4">
                <NewsList
                  locale={locale}
                  title={title}
                  emptyText={emptyText}
                  viewAllLabel={viewAllLabel}
                  posts={posts}
                  viewAllHref={viewAllHref}
                  itemHrefBase={`/${locale}/news`}
                />
              </div>
            );
          }

          case 'sectionUpcomingEvents': {
            const title = (s as any).title ?? '';
            const emptyText = (s as any).emptyText ?? '';
            const viewAllLabel = (s as any).viewAllLabel ?? '';
            const viewAllHref = `/${locale}/events`;
            const limit =
              typeof (s as any).limit === 'number' ? (s as any).limit : 6;

            const sectionId = String((s as any).sectionId ?? '').trim();
            const items = sectionId
              ? (upcomingEventsBySectionId[sectionId] ?? [])
              : upcomingEvents;

            return (
              <div key={i} className="mx-auto w-full max-w-6xl px-4">
                <NewsList
                  locale={locale}
                  title={title}
                  emptyText={emptyText}
                  viewAllLabel={viewAllLabel}
                  posts={items.slice(0, Math.max(limit, 0))}
                  viewAllHref={viewAllHref}
                  itemHrefBase={`/${locale}/events`}
                />
              </div>
            );
          }

          case 'sectionLatestEvents': {
            const title = (s as any).title ?? '';
            const emptyText = (s as any).emptyText ?? '';
            const viewAllLabel = (s as any).viewAllLabel ?? '';
            const viewAllHref = `/${locale}/events`;
            const limit =
              typeof (s as any).limit === 'number' ? (s as any).limit : 6;

            const sectionId = String((s as any).sectionId ?? '').trim();
            const items = sectionId
              ? (latestEventsBySectionId[sectionId] ?? [])
              : latestEvents;

            return (
              <div key={i} className="mx-auto w-full max-w-6xl px-4">
                <NewsList
                  locale={locale}
                  title={title}
                  emptyText={emptyText}
                  viewAllLabel={viewAllLabel}
                  posts={items.slice(0, Math.max(limit, 0))}
                  viewAllHref={viewAllHref}
                  itemHrefBase={`/${locale}/events`}
                />
              </div>
            );
          }

          default:
            return null;
        }
      })}
    </div>
  );
}
