'use client';

import * as React from 'react';
import Link from 'next/link';
import { Globe } from '@mynaui/icons-react';

const localeOptions = [
  { code: 'ar', label: 'العربية' },
  { code: 'en', label: 'English' },
  { code: 'it', label: 'Italiano' },
] as const;

function ClientOnly({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <>{children}</>;
}

function stripLeadingLocale(path: string) {
  const pathname = path.startsWith('/') ? path : `/${path}`;
  const parts = pathname.split('/');
  const maybeLocale = parts[1];

  const supported = localeOptions.map((l) => l.code);
  if (
    maybeLocale &&
    supported.includes(maybeLocale as (typeof supported)[number])
  ) {
    parts.splice(1, 1);
  }

  const rest = parts.join('/');
  return rest === '' ? '/' : rest;
}

export default function LocaleSwitcher({
  locale,
  currentPath,
}: {
  locale: string;
  currentPath: string;
}) {
  const pathWithoutLocale = stripLeadingLocale(currentPath);

  const makeTarget = (code: string) =>
    `/${code}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`;

  const [open, setOpen] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const closeTimer = React.useRef<number | null>(null);

  const clearTimer = () => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const openNow = () => {
    clearTimer();
    setOpen(true);
  };

  const closeSoon = () => {
    clearTimer();
    closeTimer.current = window.setTimeout(() => setOpen(false), 160);
  };

  React.useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };

    window.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  React.useEffect(() => () => clearTimer(), []);

  return (
    <ClientOnly>
      <div
        ref={rootRef}
        className="relative"
        onPointerEnter={openNow}
        onPointerLeave={closeSoon}
      >
        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-transparent text-current hover:bg-transparent focus:outline-none"
          aria-label="Change language"
          aria-haspopup="menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <Globe className="h-5 w-5" />
        </button>

        <div
          role="menu"
          aria-hidden={!open}
          className={[
            'absolute right-0 top-full z-50 mt-3 min-w-28',
            'rounded-xl border border-[#23130e] bg-[#f5f0e8] p-2 shadow-lg',
            'transition duration-150 ease-out',
            open
              ? 'pointer-events-auto translate-y-0 opacity-100'
              : 'pointer-events-none -translate-y-1 opacity-0',
          ].join(' ')}
        >
          <div className="grid gap-1">
            {localeOptions.map((opt) => {
              const active = opt.code === locale;
              const href = makeTarget(opt.code);

              return (
                <Link
                  key={opt.code}
                  href={href}
                  role="menuitem"
                  className={[
                    'flex items-center justify-between rounded-lg px-3 py-2 text-sm text-[#2b1b14]',
                    'hover:bg-[#e7d6c3] focus:bg-[#e7d6c3] focus:outline-none',
                    active ? 'font-semibold' : '',
                  ].join(' ')}
                  onClick={() => setOpen(false)}
                >
                  <span>{opt.label}</span>
                  {active ? <span className="text-xs">✓</span> : null}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </ClientOnly>
  );
}
