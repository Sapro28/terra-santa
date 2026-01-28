import Link from 'next/link';

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
  | SectionStats
  | SectionCards
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
}: {
  locale: string;
  sections?: Section[] | null;
  announcements?: Announcement[];
}) {
  if (!sections?.length) return null;

  return (
    <div className="space-y-16">
      {sections.map((section, idx) => {
        switch (section._type) {
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
