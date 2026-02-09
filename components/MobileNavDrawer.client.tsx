'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

type Child = {
  name: string;
  href: string | null;
  external?: boolean;
};

export type MobileNavItem = {
  label: string;
  href: string | null;
  external?: boolean;
  children?: Child[];
};

function isExternalHref(href: string) {
  return /^https?:\/\//i.test(href) || /^\/\//.test(href);
}

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M4 6h16" />
      <path d="M4 12h16" />
      <path d="M4 18h16" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M6 6l12 12" />
      <path d="M18 6l-12 12" />
    </svg>
  );
}

export default function MobileNavDrawerClient({
  items,
  localeSwitcher,
}: {
  items: MobileNavItem[];
  localeSwitcher?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const cleanedItems = useMemo(() => {
    return (items ?? [])
      .map((i) => ({
        ...i,
        children: (i.children ?? []).filter((c) => (c.name ?? '').trim()),
      }))
      .filter((i) => (i.label ?? '').trim());
  }, [items]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-white text-(--fg) shadow-sm"
        aria-label="Open menu"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        <MenuIcon className="h-5 w-5" />
      </button>

      {open ? (
        <div className="fixed inset-0 z-[60]">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
          />

          <aside
            className={[
              'absolute inset-y-0 left-0 w-[86%] max-w-xs',
              'bg-white shadow-2xl',
              'flex flex-col',
              'animate-in slide-in-from-left duration-200',
            ].join(' ')}
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-between border-b border-border px-4 py-4">
              <div className="text-sm font-extrabold tracking-widest text-[#5b3a1e]">
                MENU
              </div>
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-white text-(--fg)"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-2 py-2">
              {cleanedItems.map((item) => {
                const key = item.label;
                const hasChildren = (item.children?.length ?? 0) > 0;
                const isExpanded = !!expanded[key];

                const rowClass =
                  'flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm font-semibold text-(--fg) hover:bg-[#f6efe8]';

                const link = item.href?.trim() ? item.href.trim() : null;
                const external = link ? isExternalHref(link) : false;

                return (
                  <div key={key} className="mb-1">
                    <div className="flex items-center gap-2">
                      {link ? (
                        external ? (
                          <a
                            href={link}
                            target="_blank"
                            rel="noreferrer"
                            className={rowClass}
                            onClick={() => setOpen(false)}
                          >
                            <span>{item.label}</span>
                          </a>
                        ) : (
                          <Link
                            href={link}
                            className={rowClass}
                            onClick={() => setOpen(false)}
                          >
                            <span>{item.label}</span>
                          </Link>
                        )
                      ) : (
                        <button
                          type="button"
                          className={rowClass}
                          onClick={() =>
                            setExpanded((s) => ({ ...s, [key]: !s[key] }))
                          }
                        >
                          <span>{item.label}</span>
                        </button>
                      )}

                      {hasChildren ? (
                        <button
                          type="button"
                          className="-ml-2 inline-flex h-10 w-10 items-center justify-center rounded-xl text-[#5b3a1e] hover:bg-[#f6efe8]"
                          aria-label={
                            isExpanded ? 'Collapse section' : 'Expand section'
                          }
                          onClick={() =>
                            setExpanded((s) => ({ ...s, [key]: !s[key] }))
                          }
                        >
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            className={[
                              'h-4 w-4 transition-transform duration-200',
                              isExpanded ? 'rotate-180' : '',
                            ].join(' ')}
                            aria-hidden="true"
                          >
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </button>
                      ) : null}
                    </div>

                    {hasChildren && isExpanded ? (
                      <div className="ml-3 mt-1 space-y-1 border-l border-border pl-2">
                        {item.children!.map((c) => {
                          const href = c.href?.trim() ? c.href.trim() : null;
                          const ext = href ? isExternalHref(href) : false;

                          if (!href) {
                            return (
                              <div
                                key={c.name}
                                className="rounded-lg px-3 py-2 text-sm text-muted"
                              >
                                {c.name}
                              </div>
                            );
                          }

                          return ext ? (
                            <a
                              key={c.name}
                              href={href}
                              target="_blank"
                              rel="noreferrer"
                              className="block rounded-lg px-3 py-2 text-sm font-semibold text-muted hover:bg-[#f6efe8]"
                              onClick={() => setOpen(false)}
                            >
                              {c.name}
                            </a>
                          ) : (
                            <Link
                              key={c.name}
                              href={href}
                              className="block rounded-lg px-3 py-2 text-sm font-semibold text-muted hover:bg-[#f6efe8]"
                              onClick={() => setOpen(false)}
                            >
                              {c.name}
                            </Link>
                          );
                        })}
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </nav>

            {localeSwitcher ? (
              <div className="border-t border-border px-4 py-4">
                {localeSwitcher}
              </div>
            ) : null}
          </aside>
        </div>
      ) : null}
    </div>
  );
}
