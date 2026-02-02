import Link from 'next/link';
import { PortableText } from '@portabletext/react';
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
  externalUrl?: string | null;
  openInNewTab?: boolean | null;
};

type SectionHero = SectionBase & {
  _type: 'sectionHero';
  kicker?: string;
  title?: string;
  subtitle?: string;
  imageUrl?: string;
  imageAlt?: string;

  primaryCta?: { label?: string; link?: CMSLink; href?: string };
  secondaryCta?: { label?: string; link?: CMSLink; href?: string };
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

type SectionStats = SectionBase & {
  _type: 'sectionStats';
  title?: string;
  items?: Array<{ label?: string; value?: string }>;
};

type SectionCards = SectionBase & {
  _type: 'sectionCards';
  title?: string;
  cards?: Array<{ title?: string; text?: string }>;
};

type SectionDivisions = SectionBase & {
  _type: 'sectionDivisions';
  title?: string;
  subtitle?: string;
  divisions?: Array<{
    title?: string;
    text?: string;
    sectionSlug?: string;
    imageUrl?: string;
    imageAlt?: string;
    hoverText?: string;
    ctaLabel?: string;
  }>;
};

type SectionColors = SectionBase & {
  _type: 'sectionColors';
  title?: string;
  subtitle?: string;
  colors?: Array<{ name?: string; hex?: string }>;
};

type SectionRichText = SectionBase & {
  _type: 'sectionRichText';
  title?: string;
  content?: any;
};

type SectionList = SectionBase & {
  _type: 'sectionList';
  title?: string;
  subtitle?: string;
  items?: Array<{ title?: string; desc?: string }>;
};

type SectionPeople = SectionBase & {
  _type: 'sectionPeople';
  title?: string;
  subtitle?: string;
  people?: Array<{
    name?: string;
    role?: string;
    bio?: string;
    imageUrl?: string;
    imageAlt?: string;
  }>;
};

type SectionAnnouncements = SectionBase & {
  _type: 'sectionAnnouncements';
  title?: string;
  emptyText?: string;
  viewAllLabel?: string;
  limit?: number;
};

type SectionSpacer = SectionBase & {
  _type: 'sectionSpacer';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
};

type Section =
  | SectionHero
  | SectionVideoHero
  | SectionStats
  | SectionCards
  | SectionDivisions
  | SectionColors
  | SectionRichText
  | SectionList
  | SectionPeople
  | SectionAnnouncements
  | SectionSpacer
  | (SectionBase & Record<string, any>);

function routeKeyToPathSegment(routeKey?: string | null) {
  switch (routeKey) {
    case 'home':
      return '';
    case 'about':
      return 'about';
    case 'sections':
      return 'sections';
    case 'gallery':
      return 'gallery';
    case 'news':
      return 'news';
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
    const seg = routeKeyToPathSegment(link.routeKey);
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

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-(--paper) p-3 text-center">
      <div className="text-xl font-bold">{value}</div>
      <div className="mt-1 text-xs font-semibold text-muted">{label}</div>
    </div>
  );
}

function InfoCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-border bg-white p-5">
      <div className="font-semibold">{title}</div>
      <p className="mt-2 text-sm text-muted">{text}</p>
    </div>
  );
}

function spacerClass(size?: SectionSpacer['size']) {
  switch (size) {
    case 'xs':
      return 'h-2';
    case 'sm':
      return 'h-4';
    case 'md':
      return 'h-8';
    case 'lg':
      return 'h-12';
    case 'xl':
      return 'h-16';
    default:
      return 'h-8';
  }
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

export default function SectionRenderer({
  locale,
  sections,
  announcements,
  pageTitle,
}: {
  locale: string;
  sections?: Section[] | null;
  announcements?: Announcement[];
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

                      <h1 className="mt-3 text-4xl font-bold tracking-tight text-white md:text-6xl">
                        {s.title ?? '—'}
                      </h1>

                      {s.subtitle ? (
                        <p className="mt-4 text-lg leading-relaxed text-white/80">
                          {s.subtitle}
                        </p>
                      ) : null}

                      {primaryResolved || secondaryResolved ? (
                        <div className="mt-6 flex flex-wrap gap-3">
                          {primaryResolved ? (
                            <CtaButton
                              resolved={primaryResolved}
                              label={s.primaryCta?.label ?? '—'}
                              className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black hover:opacity-90"
                            />
                          ) : null}

                          {secondaryResolved ? (
                            <CtaButton
                              resolved={secondaryResolved}
                              label={s.secondaryCta?.label ?? '—'}
                              className="rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white hover:bg-white/15"
                            />
                          ) : null}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </section>
            );
          }

          case 'sectionHero': {
            const s = section as SectionHero;

            const primaryResolved = resolveCmsLink({
              locale,
              link: s.primaryCta?.link,
              legacyHref: s.primaryCta?.href,
            }) ?? { kind: 'internal' as const, href: `/${locale}/about` };

            const secondaryResolved = resolveCmsLink({
              locale,
              link: s.secondaryCta?.link,
              legacyHref: s.secondaryCta?.href,
            }) ?? { kind: 'internal' as const, href: `/${locale}/gallery` };

            return (
              <section
                key={idx}
                className="grid items-center gap-10 md:grid-cols-2"
              >
                <div>
                  {s.kicker ? (
                    <div className="text-sm font-semibold text-muted">
                      {s.kicker}
                    </div>
                  ) : null}

                  <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
                    {s.title ?? '—'}
                  </h1>

                  {s.subtitle ? (
                    <p className="mt-4 text-lg leading-relaxed text-muted">
                      {s.subtitle}
                    </p>
                  ) : null}

                  <div className="mt-6 flex flex-wrap gap-3">
                    <CtaButton
                      resolved={primaryResolved}
                      label={s.primaryCta?.label ?? '—'}
                      className="rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-white hover:bg-(--accent-hover)"
                    />

                    <CtaButton
                      resolved={secondaryResolved}
                      label={s.secondaryCta?.label ?? '—'}
                      className="rounded-xl border border-border bg-white px-5 py-3 text-sm font-semibold text-(--fg) hover:bg-(--paper)"
                    />
                  </div>
                </div>

                {s.imageUrl ? (
                  <div className="overflow-hidden rounded-2xl border border-border bg-white">
                    <img
                      src={s.imageUrl}
                      alt={s.imageAlt || s.title || 'Hero image'}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                ) : null}
              </section>
            );
          }

          case 'sectionDivisions': {
            const s = section as SectionDivisions;
            const divisions = (s.divisions ?? []).slice(0, 12);
            if (!divisions.length) return null;

            return (
              <section key={idx}>
                {s.title ? (
                  <h2 className="text-2xl font-semibold">{s.title}</h2>
                ) : null}
                {s.subtitle ? (
                  <p className="mt-2 max-w-3xl text-sm text-muted">
                    {s.subtitle}
                  </p>
                ) : null}

                <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {divisions.map((d, i) => (
                    <DivisionCard key={i} locale={locale} d={d} />
                  ))}
                </div>
              </section>
            );
          }

          case 'sectionColors': {
            const s = section as SectionColors;
            const colors = (s.colors ?? []).filter((c) => c?.hex);
            if (!colors.length) return null;

            return (
              <section key={idx}>
                {s.title ? (
                  <h2 className="text-2xl font-semibold">{s.title}</h2>
                ) : null}
                {s.subtitle ? (
                  <p className="mt-2 max-w-3xl text-sm text-muted">
                    {s.subtitle}
                  </p>
                ) : null}

                <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {colors.map((c, i) => (
                    <div
                      key={i}
                      className="rounded-2xl border border-border bg-white p-4"
                    >
                      <div
                        className="h-14 w-full rounded-xl border border-border"
                        style={{ backgroundColor: c.hex }}
                      />
                      <div className="mt-3 flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <div className="line-clamp-1 text-sm font-semibold">
                            {c.name ?? '—'}
                          </div>
                          <div className="mt-1 text-xs text-muted">{c.hex}</div>
                        </div>

                        <div
                          className="h-10 w-10 shrink-0 rounded-xl border border-border"
                          style={{ backgroundColor: c.hex }}
                          aria-hidden
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          }

          case 'sectionStats': {
            const s = section as SectionStats;
            const items = (s.items ?? []).slice(0, 3);

            if (!items.length) return null;

            return (
              <section key={idx}>
                {s.title ? (
                  <h2 className="mb-4 text-2xl font-semibold">{s.title}</h2>
                ) : null}
                <div className="grid grid-cols-3 gap-4 rounded-2xl border border-border bg-white p-4">
                  {items.map((it, i) => (
                    <Stat
                      key={i}
                      label={it.label ?? '—'}
                      value={it.value ?? '—'}
                    />
                  ))}
                </div>
              </section>
            );
          }

          case 'sectionCards': {
            const s = section as SectionCards;
            const cards = (s.cards ?? []).slice(0, 3);
            if (!cards.length) return null;

            return (
              <section key={idx}>
                {s.title ? (
                  <h2 className="mb-6 text-2xl font-semibold">{s.title}</h2>
                ) : null}
                <div className="grid gap-4 md:grid-cols-3">
                  {cards.map((c, i) => (
                    <InfoCard
                      key={i}
                      title={c.title ?? '—'}
                      text={c.text ?? ''}
                    />
                  ))}
                </div>
              </section>
            );
          }

          case 'sectionRichText': {
            const s = section as SectionRichText;
            if (!s.content) return null;

            return (
              <section key={idx}>
                {s.title ? (
                  <h2 className="mb-4 text-2xl font-semibold">{s.title}</h2>
                ) : null}
                <div className="prose max-w-none rounded-2xl border border-border bg-white p-6 prose-headings:tracking-tight prose-a:text-accent">
                  <PortableText value={s.content} />
                </div>
              </section>
            );
          }

          case 'sectionList': {
            const s = section as SectionList;
            const items = (s.items ?? []).filter((it) => it?.title || it?.desc);
            if (!items.length) return null;

            return (
              <section key={idx}>
                {s.title ? (
                  <h2 className="text-2xl font-semibold">{s.title}</h2>
                ) : null}
                {s.subtitle ? (
                  <p className="mt-2 max-w-3xl text-sm text-muted">
                    {s.subtitle}
                  </p>
                ) : null}

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {items.map((it, i) => (
                    <div
                      key={i}
                      className="rounded-2xl border border-border bg-white p-5"
                    >
                      {it.title ? (
                        <div className="font-semibold">{it.title}</div>
                      ) : null}
                      {it.desc ? (
                        <p className="mt-2 text-sm text-muted">{it.desc}</p>
                      ) : null}
                    </div>
                  ))}
                </div>
              </section>
            );
          }

          case 'sectionPeople': {
            const s = section as SectionPeople;
            const people = (s.people ?? []).filter((p) => p?.name);
            if (!people.length) return null;

            return (
              <section key={idx}>
                {s.title ? (
                  <h2 className="text-2xl font-semibold">{s.title}</h2>
                ) : null}
                {s.subtitle ? (
                  <p className="mt-2 max-w-3xl text-sm text-muted">
                    {s.subtitle}
                  </p>
                ) : null}

                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {people.map((p, i) => (
                    <div
                      key={i}
                      className="rounded-2xl border border-border bg-white p-5"
                    >
                      <div className="flex items-start gap-4">
                        <div className="h-14 w-14 shrink-0 overflow-hidden rounded-2xl bg-(--paper)">
                          {p.imageUrl ? (
                            <img
                              src={p.imageUrl}
                              alt={p.imageAlt || p.name || 'Person'}
                              className="h-full w-full object-cover"
                              loading="lazy"
                            />
                          ) : null}
                        </div>

                        <div className="min-w-0">
                          <div className="line-clamp-1 font-semibold">
                            {p.name}
                          </div>
                          {p.role ? (
                            <div className="mt-0.5 text-sm text-muted">
                              {p.role}
                            </div>
                          ) : null}
                        </div>
                      </div>

                      {p.bio ? (
                        <p className="mt-4 text-sm text-muted">{p.bio}</p>
                      ) : null}
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
            const list = (announcements ?? []).slice(
              0,
              limit ?? announcements?.length ?? 0,
            );

            return (
              <section key={idx}>
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold">
                    {s.title ?? 'Announcements'}
                  </h2>
                </div>

                <div className="rounded-2xl border border-border bg-white">
                  {list.length ? (
                    <ul className="divide-y divide-border">
                      {list.map((post) => (
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
                                    post.mainImageAlt ||
                                    post.title ||
                                    'Announcement'
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
                                <p className="mt-1 line-clamp-2 text-sm text-muted">
                                  {post.excerpt}
                                </p>
                              ) : null}

                              {post.publishedAt ? (
                                <p className="mt-2 text-sm text-red-800">
                                  📅{' '}
                                  {new Date(
                                    post.publishedAt,
                                  ).toLocaleDateString(
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
                    <div className="p-6 text-sm text-muted">
                      {s.emptyText ?? 'No announcements yet.'}
                    </div>
                  )}

                  <div className="flex items-center justify-end p-4">
                    <Link
                      href={`/${locale}/news`}
                      className="text-sm font-semibold text-(--fg) hover:underline"
                    >
                      {s.viewAllLabel ?? 'View all news →'}
                    </Link>
                  </div>
                </div>
              </section>
            );
          }

          case 'sectionSpacer': {
            const s = section as SectionSpacer;
            return <div key={idx} className={spacerClass(s.size)} />;
          }

          default:
            return null;
        }
      })}
    </div>
  );
}
