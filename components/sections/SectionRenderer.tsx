import {
  CmsCtaLink,
  resolveCmsLink,
  type CMSLink,
} from '@/components/lib/cmsLink';

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

type Section =
  | SectionVideoHero
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
        <h2 className="text-2xl font-semibold">{title}</h2>
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
                      <h3 className="text-lg font-semibold leading-snug">
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
          <a href={viewAllHref} className="text-sm font-medium underline">
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
  const title = s.title ?? '';
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
    <section className="relative overflow-hidden">
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
          className="absolute inset-0"
          style={{ backgroundColor: `rgba(0,0,0,${overlay})` }}
          aria-hidden
        />

        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-6xl px-4">
            {s.kicker ? (
              <p className="mb-3 text-sm font-semibold tracking-wide text-white/90">
                {s.kicker}
              </p>
            ) : null}

            <h1 className="max-w-2xl text-4xl font-semibold leading-tight text-white md:text-5xl">
              {title}
            </h1>

            {subtitle ? (
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/90 md:text-lg">
                {subtitle}
              </p>
            ) : null}

            <div className="mt-8 flex flex-wrap gap-3">
              {primaryResolved && s.primaryCta?.label ? (
                <CmsCtaLink
                  resolved={primaryResolved}
                  label={s.primaryCta.label}
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:opacity-90"
                />
              ) : null}

              {secondaryResolved && s.secondaryCta?.label ? (
                <CmsCtaLink
                  resolved={secondaryResolved}
                  label={s.secondaryCta.label}
                  className="inline-flex items-center justify-center rounded-full border border-white/70 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15"
                />
              ) : null}
            </div>
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
        <h2 className="text-2xl font-semibold">{title}</h2>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {items.map((t, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-border bg-white p-6 shadow-sm"
            >
              <p className="text-sm leading-relaxed text-muted-foreground">
                “{t.text ?? ''}”
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
  pageTitle,
}: {
  locale: string;
  sections: Section[];
  announcements: Announcement[];
  upcomingEvents: Announcement[];
  upcomingEventsBySectionId: Record<string, Announcement[]>;
  latestEvents: Announcement[];
  latestEventsBySectionId: Record<string, Announcement[]>;
  pageTitle?: string | undefined;
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
