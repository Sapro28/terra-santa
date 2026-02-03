'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';

type CmsRef = { _type?: string | null; title?: string | null; slug?: string | null };

type CmsLink = {
  linkType?: 'internal' | 'external' | null;
  internalRef?: CmsRef | null;
  routeKey?: string | null;
  internalPath?: string | null;
  externalUrl?: string | null;
  openInNewTab?: boolean | null;
};

type HeaderMenuColumn = {
  title?: string | null;
  links?: CmsLink[] | null;
};

function normalizePath(raw?: string | null) {
  if (!raw) return '';
  const trimmed = raw.trim();
  if (!trimmed) return '';
  return trimmed.startsWith('/') ? trimmed.slice(1) : trimmed;
}

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
      return normalizePath(routeKey);
  }
}

function resolveCmsLink(
  locale: string,
  link?: CmsLink | null,
):
  | { kind: 'internal'; href: string }
  | { kind: 'external'; href: string; newTab: boolean }
  | null {
  if (!link) return null;

  if (link.linkType === 'external') {
    const href = (link.externalUrl ?? '').trim();
    if (!href) return null;
    return { kind: 'external', href, newTab: link.openInNewTab ?? true };
  }

  if (link.linkType === 'internal') {
    const refType = link.internalRef?._type ?? null;
    const refSlug = (link.internalRef as any)?.slug ?? null;
    if (refType && refSlug) {
      const seg =
        refType === 'schoolSectionPage' ? `sections/${refSlug}` : `${refSlug}`;
      return { kind: 'internal', href: seg ? `/${locale}/${seg}` : `/${locale}` };
    }

    const rawPath = (link.internalPath ?? '').trim();
    if (rawPath) {
      const seg = normalizePath(rawPath);
      return { kind: 'internal', href: seg ? `/${locale}/${seg}` : `/${locale}` };
    }

    const seg = routeKeyToPathSegment(link.routeKey);
    return { kind: 'internal', href: seg ? `/${locale}/${seg}` : `/${locale}` };
  }

  return null;
}

export default function MegaMenuDropdownClient({
  locale,
  label,
  columns,
  promoText,
}: {
  locale: string;
  label: string;
  columns: HeaderMenuColumn[];
  promoText?: string;
}) {
  const [open, setOpen] = useState(false);

  const normalized = useMemo(() => {
    return (columns || [])
      .map((col) => ({
        title: (col?.title ?? '').trim(),
        links: (col?.links || []).filter(Boolean),
      }))
      .filter((c) => c.links.length > 0);
  }, [columns]);

  if (normalized.length === 0) {
    // If there's no dropdown content, render a non-interactive label.
    return (
      <span className="text-sm font-semibold text-muted">{label}</span>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className="text-sm font-semibold text-muted hover:text-(--fg)"
        aria-haspopup="true"
        aria-expanded={open}
      >
        {label}
      </button>

      {open ? (
        <div
          className="absolute right-0 top-full z-50 mt-3 w-[min(720px,90vw)] rounded-xl border border-border bg-white p-4 shadow-lg"
          role="menu"
        >
          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2">
              <div className="grid gap-6 md:grid-cols-2">
                {normalized.slice(0, 2).map((col, i) => (
                  <div key={`${col.title}-${i}`}>
                    {col.title ? (
                      <div className="mb-2 text-xs font-semibold text-muted">
                        {col.title}
                      </div>
                    ) : null}
                    <div className="flex flex-col gap-2">
                      {col.links.map((l, idx) => {
                        const resolved = resolveCmsLink(locale, l);
                        if (!resolved) return null;

                        const text =
                          (l.internalRef?.title ?? '').trim() ||
                          l.routeKey ||
                          l.internalPath ||
                          l.externalUrl ||
                          'Link';

                        if (resolved.kind === 'external') {
                          return (
                            <a
                              key={`${text}-${idx}`}
                              href={resolved.href}
                              target={resolved.newTab ? '_blank' : undefined}
                              rel={resolved.newTab ? 'noreferrer noopener' : undefined}
                              className="text-sm text-muted hover:text-(--fg)"
                              role="menuitem"
                            >
                              {text}
                            </a>
                          );
                        }

                        return (
                          <Link
                            key={`${text}-${idx}`}
                            href={resolved.href}
                            className="text-sm text-muted hover:text-(--fg)"
                            role="menuitem"
                          >
                            {text}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {promoText ? (
              <div className="rounded-xl bg-muted/10 p-4">
                <div className="text-sm italic text-(--fg)">{promoText}</div>
              </div>
            ) : (
              <div />
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
